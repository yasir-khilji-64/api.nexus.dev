import { HttpStatusCodes } from '../status-codes';

class BadRequestException extends Error {
  public readonly statusCode: number;

  constructor(message: string = 'Bad Request') {
    super(message);
    this.statusCode = HttpStatusCodes.BAD_REQUEST;
    this.name = 'BadRequestException';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestException);
    }
  }
}

export { BadRequestException };
