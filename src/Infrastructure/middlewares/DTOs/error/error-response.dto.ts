/**
 * Represents the structure of an error response for HTTP endpoints.
 */
export type ErrorResponseDto = {
  /**
   * HTTP status code for the response.
   *
   * @example 404
   * @default 500
   */
  status: number;

  /**
   * Human-readable error message describing the issue.
   *
   * @example "Resource not found"
   */
  message: string;

  /**
   * Optional stack trace for debugging purposes.
   * This is typically available only in non-production environments.
   *
   * @example "Error: Not Found\n    at /app/src/index.ts:42:13"
   */
  stack?: string;
};
