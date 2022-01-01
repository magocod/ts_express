declare namespace Express {
  export interface GenericErrorResponse {
    message: string;
    exception?: unknown;
    code?: number;
  }
  export interface Response {
    genericError(value: GenericErrorResponse): this;
  }
}
