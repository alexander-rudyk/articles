export enum HttpStatus {
  Successful = 200,
  Created = 201,
  NoContent = 204,

  InvalidRequest = 400,
  NotFound = 404,

  ServerError = 500,
}

export class HttpError extends Error {
  constructor(message: string,readonly status: number = HttpStatus.InvalidRequest) {
    super(message);
  }
}
