/**
 * Represents an error response returned by the API.
 */
type ErrorResponseDto = {
  /**
   * HTTP status code indicating the type of error.
   * Common values: 400 (Bad Request), 404 (Not Found), 500 (Internal Server Error).
   *
   * @type {number}
   * @example 404
   * @default 500
   */
  status: number;

  /**
   * A human-readable message explaining the error.
   * This should provide meaningful context about the issue.
   *
   * @type {string}
   * @example "Resource not found"
   */
  message: string;

  /**
   * Optional stack trace for debugging.
   * This is primarily used in development and test environments.
   * In production, it is replaced with a generic placeholder.
   *
   * @type {string}
   * @example "Error: Not Found\n    at /app/src/index.ts:42:13"
   */
  stack?: string;
};

export { ErrorResponseDto };
