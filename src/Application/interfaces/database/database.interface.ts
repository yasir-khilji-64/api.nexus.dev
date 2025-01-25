/**
 * Contract for Database Operations.
 */
export interface IDatabase {
  /**
   * Establish a connection to the database.
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database.
   */
  disconnect(): Promise<void>;

  /**
   * Get the current connection status of the database.
   *
   * Possible values:
   * - `disconnected`: The database is not connected.
   * - `connected`: The database is successfully connected.
   * - `connecting`: The database is in the process of connecting.
   * - `disconnecting`: The database is in the process of disconnecting.
   * - `uninitialized`: The database connection has not been initialized.
   * - `unknown`: The connection status is not determined.
   *
   * @returns The current connection status.
   */
  getConnectionStatus():
    | 'disconnected'
    | 'connected'
    | 'connecting'
    | 'disconnecting'
    | 'uninitialized';
}
