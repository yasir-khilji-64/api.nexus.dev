/**
 * Message Response DTO
 */
type MessageResponseDto = {
  /**
   * HTTP status code indicating the result of the API request.
   * This follows standard HTTP status codes.
   *
   * @type {number}
   * @example 200
   */
  status: number;

  /**
   * A human-readable message providing context about the API response.
   * This can be used to display success messages, error descriptions, or other relevant feedback.
   *
   * @type {string}
   * @example "Request processed successfully."
   */
  message: string;
};

export { MessageResponseDto };
