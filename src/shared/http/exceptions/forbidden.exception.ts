import { HttpStatusCodes } from '../status-codes';

class ForbiddenException extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'Forbidden') {
    super(message);
    this.statusCode = HttpStatusCodes.FORBIDDEN;
    this.name = 'ForbiddenException';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenException);
    }
  }
}

export { ForbiddenException };
