import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// Types
interface NFTMetadata {
  name: string;
  image: string;
  contractAddress: string;
  tokenId: string;
  tokenType: string;
  collectionName?: string;
}

interface NFTResponse {
  wallet: string;
  nfts: NFTMetadata[];
  totalCount: number;
  lastUpdated: string;
}

// Alchemy API configuration
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const ALCHEMY_BASE_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// Get NFTs from Alchemy
async function getNFTs(wallet: string): Promise<NFTMetadata[]> {
  try {
    const response = await axios.get(`${ALCHEMY_BASE_URL}/getNFTs`, {
      params: {
        owner: wallet,
        withMetadata: true,
        pageSize: 100
      }
    });

    return response.data.ownedNfts.map((nft: any) => ({
      name: nft.title || nft.contractMetadata?.name || 'Unknown NFT',
      image: nft.media?.[0]?.gateway || nft.media?.[0]?.raw || '',
      contractAddress: nft.contract.address,
      tokenId: nft.id.tokenId,
      tokenType: nft.id.tokenMetadata?.tokenType || 'ERC721',
      collectionName: nft.contractMetadata?.name
    }));
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Failed to fetch NFT data');
  }
}

// GET /api/nfts/:wallet
router.get('/:wallet', async (req: Request, res: Response) => {
  try {
    const wallet = req.wallet!;
    
    const nfts = await getNFTs(wallet);
    
    const response: NFTResponse = {
      wallet,
      nfts,
      totalCount: nfts.length,
      lastUpdated: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('NFT error:', error);
    res.status(500).json({
      error: 'Failed to fetch NFT data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 