import type { NextFunction, Request, Response } from 'express';

import { HttpStatusCodes } from '../../../shared/http';
import { Config } from '../../../shared/utils/config/config';
import type { ErrorResponseDto } from '../DTOs/error/error-response.dto';

class ErrorHandlerMiddleware {
  private static env = Config.GetInstance().env;

  public static handle(
    error: Error & { statusCode?: number },
    _request: Request,
    response: Response<ErrorResponseDto>,
    _next: NextFunction,
  ): void {
    const statusCode =
      error.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    response.status(statusCode);
    response.json({
      status: statusCode,
      message: error.message,
      stack:
        ErrorHandlerMiddleware.env.NODE_ENV === 'production'
          ? '🥞'
          : error.stack,
    });
  }
}

export { ErrorHandlerMiddleware };
