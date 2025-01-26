import 'reflect-metadata';
import Container from 'typedi';

import { HealthCheckDto } from '../../../../../Application/DTOs/health-check/health-check.dto';
import type { IDatabase } from '../../../../../Application/interfaces/database/database.interface';
import { HealthCheckUseCase } from '../../../../../Application/use-cases/health-check/health-check.use-case';

describe('HealthCheckUseCase', () => {
  beforeEach(() => {
    Container.reset();
  });

  test('It should return a valid HealthCheckDto when executed', async () => {
    const mockDatabaseService: IDatabase = {
      getConnectionStatus: jest.fn().mockReturnValue('connected'),
      connect: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      disconnect: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
    };
    Container.set('DatabaseService', mockDatabaseService);

    const healthCheckUseCase = Container.get(HealthCheckUseCase);
    const expectedTimestamp = new Date();
    const expectedUptime = process.uptime();

    const result = await healthCheckUseCase.execute();

    expect(result).toBeInstanceOf(HealthCheckDto);
    expect(result.database).toBe('connected');
    expect(result.timestamp.getTime()).toBeCloseTo(
      expectedTimestamp.getTime(),
      -2,
    );
    expect(result.upTime).toBeCloseTo(expectedUptime, 1);
  });
});
