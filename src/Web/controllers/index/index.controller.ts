import { Request, Response } from 'express';
import { Inject, Service } from 'typedi';

import { HealthCheckUseCase } from '../../../Application/use-cases/health-check';
import { HttpStatusCodes } from '../../../Shared/http';
import { HealthCheckResponseDto, MessageResponseDto } from '../../DTOs';

@Service()
class IndexController {
  constructor(
    @Inject() private readonly healthCheckUseCase: HealthCheckUseCase,
  ) {}

  public index(_: Request, response: Response<MessageResponseDto>): void {
    response.status(HttpStatusCodes.OK).json({
      status: HttpStatusCodes.OK,
      message: 'api.nexus.dev',
    });
  }

  public healthCheck(
    _: Request,
    response: Response<HealthCheckResponseDto>,
  ): void {
    const healthStatus = this.healthCheckUseCase.execute();
    const statusCode =
      healthStatus.database === 'connected'
        ? HttpStatusCodes.OK
        : HttpStatusCodes.SERVICE_UNAVAILABLE;
    const message =
      healthStatus.database === 'connected' ? 'OK' : 'Service Unavailable';
    response.status(statusCode).json({
      status: statusCode,
      message: message,
      ...healthStatus,
    });
  }
}

export { IndexController };
