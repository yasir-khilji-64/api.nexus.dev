import { Inject, Service } from 'typedi';

import { HealthCheckDto } from '../../DTOs';
import { IDatabase } from '../../interfaces';

@Service()
class HealthCheckUseCase {
  constructor(
    @Inject('DatabaseService') private readonly databaseService: IDatabase,
  ) {}

  public execute(): HealthCheckDto {
    const database = this.databaseService.getConnectionStatus();
    const timestamp = new Date();
    const uptime = process.uptime();

    return {
      database,
      timestamp,
      uptime,
    };
  }
}

export { HealthCheckUseCase };
