export interface ServerErrorResponse {
  readonly code: string;
  readonly message: string;
  readonly status: number;
  readonly trace?: string;
}
export class ServerError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(code: string, message: string, status: number, trace?: string) {
    super(`${code}: ${message}`);
    this.code = code;
    this.status = status;
    this.stack = trace;
  }

  static fromServerResponse(response: ServerErrorResponse): ServerError {
    return new ServerError(response.code, response.message, response.status, response.trace);
  }
}
