import { HttpStatusCodes } from '../status-codes';

class UnauthorizedException extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'Unauthorized') {
    super(message);
    this.statusCode = HttpStatusCodes.UNAUTHORIZED;
    this.name = 'UnauthorizedException';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedException);
    }
  }
}

export { UnauthorizedException };
