import { HttpStatusCodes } from '../status-codes';

class UnprocessableEntityException extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'Unprocessable Entity') {
    super(message);
    this.statusCode = HttpStatusCodes.UNPROCESSABLE_ENTITY;
    this.name = 'UnprocessableEntityException';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnprocessableEntityException);
    }
  }
}

export { UnprocessableEntityException };
