import { Response } from 'express';
import { ApiResponse } from '../types';
import { HttpStatusCode } from '../constants/httpStatusCodes';

export function sendSuccess<T>(res: Response, statusCode: HttpStatusCode, data: T, message: string): Response {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
}

export function sendError(res: Response, statusCode: HttpStatusCode, message: string): Response {
  const response: ApiResponse = {
    success: false,
    message,
    data: null,
  };
  return res.status(statusCode).json(response);
}
