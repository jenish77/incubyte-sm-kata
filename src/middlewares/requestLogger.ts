import { Request, Response, NextFunction } from 'express';

function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start: number = Date.now();

  res.on('finish', () => {
    const duration: number = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
}

export default requestLogger;
