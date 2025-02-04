import { Request, Response } from 'express';
import { Service } from 'typedi';

import { HttpStatusCodes } from '../../../Shared/http';
import { MessageResponseDto } from '../DTOs';

@Service()
class IndexController {
  public index(_: Request, response: Response<MessageResponseDto>): void {
    response.status(HttpStatusCodes.OK).json({
      status: HttpStatusCodes.OK,
      message: 'api.nexus.dev',
    });
  }
}

export { IndexController };
