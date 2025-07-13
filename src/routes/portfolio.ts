import { Router, Request, Response } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';

const router = Router();
const cache = new NodeCache({ stdTTL: 120 }); // 2 minutes cache

// Types
interface TokenBalance {
  contractAddress: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
}

interface TokenWithPrice extends TokenBalance {
  price: number;
  usdValue: number;
}

interface PortfolioResponse {
  wallet: string;
  totalUsdValue: number;
  tokens: TokenWithPrice[];
  lastUpdated: string;
}

// Alchemy API configuration
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// Coingecko API configuration
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Get token balances from Alchemy
async function getTokenBalances(wallet: string): Promise<TokenBalance[]> {
  try {
    const response = await axios.get(`${ALCHEMY_BASE_URL}/getTokenBalances`, {
      params: {
        owner: wallet,
        withMetadata: true
      }
    });

    return response.data.tokenBalances
      .filter((token: any) => parseFloat(token.balance) > 0)
      .map((token: any) => ({
        contractAddress: token.contractAddress,
        symbol: token.tokenMetadata?.symbol || 'UNKNOWN',
        name: token.tokenMetadata?.name || 'Unknown Token',
        balance: token.balance,
        decimals: token.tokenMetadata?.decimals || 18
      }));
  } catch (error) {
    console.error('Error fetching token balances:', error);
    throw new Error('Failed to fetch token balances');
  }
}

// Get token prices from Coingecko
async function getTokenPrices(contractAddresses: string[]): Promise<Record<string, number>> {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/token_price/ethereum`, {
      params: {
        contract_addresses: contractAddresses.join(','),
        vs_currencies: 'usd'
      }
    });

    const prices: Record<string, number> = {};
    Object.keys(response.data).forEach(address => {
      prices[address.toLowerCase()] = response.data[address].usd || 0;
    });

    return prices;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return {};
  }
}

// Calculate USD value for tokens
function calculateTokenValues(tokens: TokenBalance[], prices: Record<string, number>): TokenWithPrice[] {
  return tokens.map(token => {
    const price = prices[token.contractAddress.toLowerCase()] || 0;
    const balance = parseFloat(token.balance) / Math.pow(10, token.decimals);
    const usdValue = balance * price;

    return {
      ...token,
      price,
      usdValue
    };
  });
}

// GET /api/portfolio/:wallet
router.get('/:wallet', async (req: Request, res: Response) => {
  try {
    const wallet = req.wallet!;
    
    // Check cache first
    const cacheKey = `portfolio_${wallet}`;
    const cached = cache.get<PortfolioResponse>(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    // Fetch token balances
    const tokens = await getTokenBalances(wallet);
    
    if (tokens.length === 0) {
      const emptyResponse: PortfolioResponse = {
        wallet,
        totalUsdValue: 0,
        tokens: [],
        lastUpdated: new Date().toISOString()
      };
      
      cache.set(cacheKey, emptyResponse);
      return res.json(emptyResponse);
    }

    // Get token prices
    const contractAddresses = tokens.map(t => t.contractAddress);
    const prices = await getTokenPrices(contractAddresses);

    // Calculate USD values
    const tokensWithPrices = calculateTokenValues(tokens, prices);
    
    // Sort by USD value descending
    tokensWithPrices.sort((a, b) => b.usdValue - a.usdValue);

    // Calculate total USD value
    const totalUsdValue = tokensWithPrices.reduce((sum, token) => sum + token.usdValue, 0);

    const response: PortfolioResponse = {
      wallet,
      totalUsdValue,
      tokens: tokensWithPrices,
      lastUpdated: new Date().toISOString()
    };

    // Cache the response
    cache.set(cacheKey, response);

    res.json(response);
  } catch (error) {
    console.error('Portfolio error:', error);
    res.status(500).json({
      error: 'Failed to fetch portfolio data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 