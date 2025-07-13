import { Request, Response, NextFunction } from 'express';

// Ethereum address regex pattern
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const validateWallet = (req: Request, res: Response, next: NextFunction) => {
  const wallet = req.params.wallet || req.body.wallet;
  
  if (!wallet) {
    return res.status(400).json({
      error: 'Wallet address is required',
      message: 'Please provide a valid Ethereum wallet address'
    });
  }

  if (!ETH_ADDRESS_REGEX.test(wallet)) {
    return res.status(400).json({
      error: 'Invalid wallet address',
      message: 'Please provide a valid Ethereum wallet address format',
      provided: wallet
    });
  }

  // Add validated wallet to request object for use in routes
  req.wallet = wallet.toLowerCase();
  next();
};

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      wallet?: string;
    }
  }
} 