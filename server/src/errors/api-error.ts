export class ApiError extends Error {
    public statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'ApiError';
      Error.captureStackTrace(this, this.constructor);
    }
  }
  