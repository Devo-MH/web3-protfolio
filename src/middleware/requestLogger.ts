import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log request details
  console.log(`📝 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  
  if (req.wallet) {
    console.log(`👛 Wallet: ${req.wallet}`);
  }
  
  // Log response time
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`⏱️  ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
}; 