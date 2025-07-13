import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

// Types
interface GasEstimate {
  low: number;
  medium: number;
  high: number;
  baseFee: number;
  priorityFee: {
    slow: number;
    standard: number;
    fast: number;
  };
  estimatedTime: {
    slow: string;
    standard: string;
    fast: string;
  };
}

interface GasResponse {
  network: string;
  estimates: GasEstimate;
  lastUpdated: string;
}

// Gas API configuration
const ETHGASSTATION_API_KEY = process.env.ETHGASSTATION_API_KEY;
const ETHGASSTATION_URL = 'https://ethgasstation.info/api/ethgasAPI.json';

// Get gas estimates from EthGasStation
async function getGasEstimates(): Promise<GasEstimate> {
  try {
    const response = await axios.get(ETHGASSTATION_URL);
    const data = response.data;

    return {
      low: data.safeLow,
      medium: data.average,
      high: data.fast,
      baseFee: data.blockNum || 0,
      priorityFee: {
        slow: data.safeLow,
        standard: data.average,
        fast: data.fast
      },
      estimatedTime: {
        slow: `${data.safeLowWait} minutes`,
        standard: `${data.avgWait} minutes`,
        fast: `${data.fastWait} minutes`
      }
    };
  } catch (error) {
    console.error('Error fetching gas estimates:', error);
    
    // Fallback to default values if API fails
    return {
      low: 20,
      medium: 30,
      high: 50,
      baseFee: 0,
      priorityFee: {
        slow: 20,
        standard: 30,
        fast: 50
      },
      estimatedTime: {
        slow: '5-10 minutes',
        standard: '2-5 minutes',
        fast: '1-2 minutes'
      }
    };
  }
}

// GET /api/gas/eth
router.get('/eth', async (req: Request, res: Response) => {
  try {
    const estimates = await getGasEstimates();
    
    const response: GasResponse = {
      network: 'Ethereum Mainnet',
      estimates,
      lastUpdated: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Gas estimation error:', error);
    res.status(500).json({
      error: 'Failed to fetch gas estimates',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/gas/optimize
router.get('/optimize', async (req: Request, res: Response) => {
  try {
    const { urgency = 'standard' } = req.query;
    const estimates = await getGasEstimates();
    
    let recommendedGas: number;
    let recommendation: string;
    
    switch (urgency) {
      case 'slow':
        recommendedGas = estimates.low;
        recommendation = 'Use for non-urgent transactions';
        break;
      case 'fast':
        recommendedGas = estimates.high;
        recommendation = 'Use for urgent transactions';
        break;
      default:
        recommendedGas = estimates.medium;
        recommendation = 'Use for standard transactions';
    }
    
    res.json({
      recommendedGas,
      recommendation,
      allEstimates: estimates,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Gas optimization error:', error);
    res.status(500).json({
      error: 'Failed to optimize gas fees',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 