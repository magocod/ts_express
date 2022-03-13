interface GenericErrorResponse {
  message: string;
  exception?: unknown;
  code?: number;
}

declare namespace Express {
  export interface Response {
    genericError(value: GenericErrorResponse): this;
  }
}
