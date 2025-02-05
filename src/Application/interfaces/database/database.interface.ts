/**
 * Interface defining the contract for database operations.
 * This ensures a consistent structure for database connectivity across implementations.
 */
interface IDatabase {
  /**
   * Establishes a connection to the database.
   * Implementations should handle connection pooling and error handling.
   *
   * @returns {Promise<void>} Resolves when the connection is successfully established.
   * @throws {Error} If the connection fails.
   */
  connect(): Promise<void>;

  /**
   * Disconnects from the database.
   * This should ensure proper cleanup of resources and active connections.
   *
   * @returns {Promise<void>} Resolves when the disconnection is successful.
   * @throws {Error} If disconnection fails.
   */
  disconnect(): Promise<void>;

  /**
   * Retrieves the current status of the database connection.
   *
   * @returns {'disconnected' | 'connected' | 'connecting' | 'disconnecting' | 'uninitialized'}
   * The current connection status.
   */
  getConnectionStatus():
    | 'disconnected'
    | 'connected'
    | 'connecting'
    | 'disconnecting'
    | 'uninitialized';
}

export { IDatabase };
