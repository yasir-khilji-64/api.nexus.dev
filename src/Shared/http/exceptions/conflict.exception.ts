import { HttpStatusCodes } from '../status-codes';

class ConflictException extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'Conflict') {
    super(message);
    this.statusCode = HttpStatusCodes.CONFLICT;
    this.name = 'ConflictException';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConflictException);
    }
  }
}

export { ConflictException };
