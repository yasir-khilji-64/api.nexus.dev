/**
 * Represents the structure of a generic message response.
 */
export type MessageResponseDto = {
  /**
   * HTTP status code for the response.
   *
   * @example 200
   * @default 200
   */
  status: number;

  /**
   * Human-readable message for the response.
   *
   * @example "Welcome to the Nexus API"
   * @default "api.nexus.dev"
   */
  message: string;
};
