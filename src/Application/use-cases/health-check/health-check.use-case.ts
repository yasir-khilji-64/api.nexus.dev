import { Inject, Service } from 'typedi';

import { HealthCheckDto } from '../../DTOs/health-check/health-check.dto';
import { IDatabase } from '../../interfaces/database/database.interface';

@Service()
class HealthCheckUseCase {
  constructor(
    @Inject('DatabaseService') private readonly databaseService: IDatabase,
  ) {}

  public async execute(): Promise<HealthCheckDto> {
    const databaseStatus = this.databaseService.getConnectionStatus();
    const timestamp = new Date();
    const upTime = process.uptime();

    return new HealthCheckDto(databaseStatus, timestamp, upTime);
  }
}

export { HealthCheckUseCase };
