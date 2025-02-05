import type { MessageResponseDto } from './message-response.dto';

/**
 * Represents the response DTO for health check operations.
 * This DTO includes information about the system's current status,
 * including database connectivity, timestamp, and uptime.
 *
 * @type HealthCheckResponseDto
 */
type HealthCheckResponseDto = MessageResponseDto & {
  /**
   * The database connection status.
   * Possible values:
   * - 'disconnected'
   * - 'connected'
   * - 'connecting'
   * - 'disconnecting'
   * - 'uninitialized'
   *
   * @example "connected"
   */
  database:
    | 'disconnected'
    | 'connected'
    | 'connecting'
    | 'disconnecting'
    | 'uninitialized';

  /**
   * A timestamp representing the current system time.
   *
   * @example "2025-02-05T00:00:00.000Z"
   */
  timestamp: Date;

  /**
   * The uptime of the system in milliseconds since last boot.
   *
   * @example 3000
   * @default 0
   */
  uptime: number;
};

export { HealthCheckResponseDto };
