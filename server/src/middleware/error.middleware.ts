import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api-error';
import { ErrorResponseDto } from '../dto/error-response.dto';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  const errorResponse = new ErrorResponseDto(
    message,
    statusCode,
    process.env.NODE_ENV !== 'production' ? err.stack : undefined
  );

  console.error(`[ERROR] ${statusCode} - ${message}`);
  if (errorResponse.stack) {
    console.error(errorResponse.stack);
  }

    res.status(statusCode).json(errorResponse);
}
