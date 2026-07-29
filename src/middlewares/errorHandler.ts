import { Request, Response, NextFunction } from 'express';
import HTTP_STATUS from '../constants/httpStatusCodes';
import MESSAGES from '../constants/messages';
import { ApiResponse } from '../types';

interface AppError extends Error {
  statusCode?: number;
}

function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction): void {
  const statusCode: number = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message: string = err.message || MESSAGES.INTERNAL_ERROR;

  const response: ApiResponse = {
    success: false,
    message,
    data: process.env.NODE_ENV === 'development' ? { stack: err.stack } : null,
  };

  res.status(statusCode).json(response);
}

export default errorHandler;
