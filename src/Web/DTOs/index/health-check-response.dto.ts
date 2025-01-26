import type { MessageResponseDto } from './index-response.dto';

/**
 * Represents the structure of the health-check status
 */
export type HealthCheckResponseDto = MessageResponseDto & {
  /**
   * Status of the database connection
   * Possible values:
   * - `disconnected`: The database is not connected.
   * - `connected`: The database is successfully connected.
   * - `connecting`: The database is in the process of connecting.
   * - `disconnecting`: The database is in the process of disconnecting.
   * - `uninitialized`: The database connection has not been initialized.
   * - `unknown`: The database connection status is not determined.
   *
   * @example "connected"
   * @default "connected"
   */
  database:
    | 'disconnected'
    | 'connected'
    | 'connecting'
    | 'disconnecting'
    | 'uninitialized';

  /**
   * The timestamp when the health check was performed.
   *
   * @example "2025-01-01T12:00:00Z"
   */
  timestamp: Date;

  /**
   * The uptime of the process in seconds.
   *
   * @example 3000
   * @default 0
   */
  upTime: number;
};
