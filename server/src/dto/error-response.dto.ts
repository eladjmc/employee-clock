export class ErrorResponseDto {
    message: string;
    status: number;
    stack?: string;
  
    constructor(message: string, status: number, stack?: string) {
      this.message = message;
      this.status = status;
      this.stack = stack;
    }
  }
  