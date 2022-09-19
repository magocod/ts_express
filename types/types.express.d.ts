declare namespace Express {
  interface BaseResponseData {
    message: string;
  }

  interface SuccessResponseData extends BaseResponseData {
    data?: unknown;
  }

  interface ErrorResponseData {
    msg: string;
    message?: string;
    code?: number;
  }

  interface Response {
    success(value: SuccessResponseData, status?: number): this;
  }

  interface Response {
    error(value: ErrorResponseData, status?: number): this;
  }
}
