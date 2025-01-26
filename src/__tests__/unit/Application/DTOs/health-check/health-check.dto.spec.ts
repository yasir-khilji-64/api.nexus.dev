import { HealthCheckDto } from '../../../../../Application/DTOs/health-check/health-check.dto';

describe('HealthCheckDto', () => {
  describe('Given the HealthCheckDto is defined', () => {
    describe('When the HealthCheckDto is instantiated with valid inputs', () => {
      test('Then it should create a valid instance with the provided database status, timestamp, and uptime', () => {
        const databaseStatus = 'connected';
        const timestamp = new Date('2025-01-25T00:00:00Z');
        const upTime = 3000;

        const dto = new HealthCheckDto(databaseStatus, timestamp, upTime);
        expect(dto.database).toBe(databaseStatus);
        expect(dto.timestamp).toBe(timestamp);
        expect(dto.upTime).toBe(upTime);
      });
    });
    describe('When the HealthCheckDto is instantiated with all the valid database statuses', () => {
      test('Then it should correctly assign the respective database status', () => {
        const validStatuses = [
          'disconnected',
          'connected',
          'disconnecting',
          'connecting',
          'uninitialized',
        ];
        const timestamp = new Date();
        const upTime = 1000;

        validStatuses.forEach((status) => {
          const dto = new HealthCheckDto(
            status as
              | 'disconnected'
              | 'connected'
              | 'disconnecting'
              | 'connecting'
              | 'uninitialized',
            timestamp,
            upTime,
          );
          expect(dto.database).toBe(status);
        });
      });
    });
    describe('When the HealthCheckDto is instantiated with a large uptime value', () => {
      test('Then it should handle the value without issues', () => {
        const databaseStatus = 'connected';
        const timestamp = new Date();
        const upTime = Number.MAX_SAFE_INTEGER;
        const dto = new HealthCheckDto(databaseStatus, timestamp, upTime);
        expect(dto.upTime).toBe(upTime);
      });
    });
    describe('When the HealthCheckDto is instantiated with a invalid timestamp', () => {
      test('Then it should throw an error indicating the timestamp is invalid', () => {
        const databaseStatus = 'connected';
        const timestamp = 'invalid-timestamp';
        const upTime = 1000;
        expect(() => {
          return new HealthCheckDto(databaseStatus, timestamp as any, upTime);
        }).toThrow('Invalid timestamp');
      });
    });
    describe('When the HealthCheckDto is instantiated with a negative uptime', () => {
      test('Then it should throw an error indicating that uptime cannot be negative', () => {
        const databaseStatus = 'connected';
        const timestamp = new Date();
        const upTime = -1000;
        expect(() => {
          return new HealthCheckDto(databaseStatus, timestamp, upTime);
        }).toThrow('Uptime cannot be negative');
      });
    });
  });
});
