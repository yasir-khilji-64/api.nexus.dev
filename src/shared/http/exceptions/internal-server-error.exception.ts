import { HttpStatusCodes } from '../status-codes';

class InternalServerErrorException extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    this.name = 'InternalServerErrorException';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InternalServerErrorException);
    }
  }
}

export { InternalServerErrorException };
