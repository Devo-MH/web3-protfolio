import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// Types
interface SwapRequest {
  fromToken: string;
  toToken: string;
  amount: string;
  wallet: string;
  slippage?: number;
}

interface SwapRoute {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  gasEstimate: number;
  gasCost: number;
  slippage: number;
  route: string[];
  protocols: string[];
}

interface SwapResponse {
  request: SwapRequest;
  bestRoute: SwapRoute;
  alternativeRoutes: SwapRoute[];
  estimatedGasCost: number;
  priceImpact: number;
  lastUpdated: string;
}

// 1inch API configuration
const ONEINCH_API_KEY = process.env.ONEINCH_API_KEY;
const ONEINCH_BASE_URL = 'https://api.1inch.dev/swap/v6.0';

// Get swap quote from 1inch
async function getSwapQuote(
  fromToken: string,
  toToken: string,
  amount: string,
  wallet: string,
  slippage: number = 1
): Promise<SwapRoute[]> {
  try {
    const response = await axios.get(`${ONEINCH_BASE_URL}/quote`, {
      params: {
        src: fromToken,
        dst: toToken,
        amount,
        from: wallet,
        slippage
      },
      headers: {
        'Authorization': `Bearer ${ONEINCH_API_KEY}`
      }
    });

    const data = response.data;
    
    return [{
      fromToken: data.src,
      toToken: data.dst,
      fromAmount: data.srcAmount,
      toAmount: data.dstAmount,
      gasEstimate: data.gas || 0,
      gasCost: data.gasCost || 0,
      slippage,
      route: data.protocols || [],
      protocols: data.protocols || []
    }];
  } catch (error) {
    console.error('Error fetching swap quote:', error);
    throw new Error('Failed to get swap quote');
  }
}

// POST /api/swap/recommendation
router.post('/recommendation', async (req: Request, res: Response) => {
  try {
    const { fromToken, toToken, amount, wallet, slippage = 1 }: SwapRequest = req.body;
    
    if (!fromToken || !toToken || !amount || !wallet) {
      return res.status(400).json({
        error: 'Missing required parameters',
        required: ['fromToken', 'toToken', 'amount', 'wallet']
      });
    }

    const routes = await getSwapQuote(fromToken, toToken, amount, wallet, slippage);
    
    if (routes.length === 0) {
      return res.status(404).json({
        error: 'No swap routes found',
        message: 'Unable to find a valid swap route for the specified tokens'
      });
    }

    const bestRoute = routes[0];
    const estimatedGasCost = bestRoute.gasCost;
    const priceImpact = 0; // Would need additional calculation

    const response: SwapResponse = {
      request: { fromToken, toToken, amount, wallet, slippage },
      bestRoute,
      alternativeRoutes: routes.slice(1),
      estimatedGasCost,
      priceImpact,
      lastUpdated: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Swap recommendation error:', error);
    res.status(500).json({
      error: 'Failed to get swap recommendation',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/swap/tokens
router.get('/tokens', async (req: Request, res: Response) => {
  try {
    // Return common token list
    const commonTokens = [
      {
        address: '0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8',
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6
      },
      {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        symbol: 'USDT',
        name: 'Tether USD',
        decimals: 6
      },
      {
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin',
        decimals: 8
      },
      {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        symbol: 'WETH',
        name: 'Wrapped Ether',
        decimals: 18
      }
    ];

    res.json({
      tokens: commonTokens,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Token list error:', error);
    res.status(500).json({
      error: 'Failed to fetch token list',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 