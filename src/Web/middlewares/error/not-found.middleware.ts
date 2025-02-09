import type { NextFunction, Request, Response } from 'express';

import { NotFoundException } from '../../../Shared/http/exceptions';

class NotFoundMiddleware {
  public static handle(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): void {
    const error = new NotFoundException(
      `🔍 - Not Found - ${request.originalUrl}`,
    );
    next(error);
  }
}

export { NotFoundMiddleware };
