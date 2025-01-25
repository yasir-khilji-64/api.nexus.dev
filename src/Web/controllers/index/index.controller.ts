import { Request, Response } from 'express';
import { Service } from 'typedi';

import { HealthCheckUseCase } from '../../../Application/use-cases/health-check/health-check.use-case.dto';
import { HttpStatusCodes } from '../../../shared/http';
import { Logger } from '../../../shared/utils/logger/logger';
import { HealthCheckResponseDto } from '../../DTOs/index/health-check-response.dto';
import { MessageResponseDto } from '../../DTOs/index/index-response.dto';

@Service()
class IndexController {
  constructor(private readonly healthCheckUseCase: HealthCheckUseCase) {}
  public index(_: Request, response: Response<MessageResponseDto>): void {
    response.status(HttpStatusCodes.OK).json({
      status: HttpStatusCodes.OK,
      message: 'api.nexus.dev',
    });
  }

  public async healthCheck(
    _: Request,
    response: Response<HealthCheckResponseDto>,
  ): Promise<void> {
    try {
      const healthCheckResult = await this.healthCheckUseCase.execute();
      const status =
        healthCheckResult.database === 'connected'
          ? HttpStatusCodes.OK
          : HttpStatusCodes.SERVICE_UNAVAILABLE;
      const message =
        healthCheckResult.database === 'connected'
          ? 'OK'
          : 'Service Unavailable';
      response.status(status).json({
        status,
        message,
        database: healthCheckResult.database,
        timestamp: healthCheckResult.timestamp,
        upTime: healthCheckResult.upTime,
      });
    } catch (error) {
      Logger.error('Error getting connection status', IndexController.name, {
        error,
      });
      throw error;
    }
  }
}

export { IndexController };
