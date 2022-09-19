// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
// https://github.com/typeorm/typeorm/tree/master/src/error

export class BaseError extends Error {
  msg: string;
  status: number;

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  constructor(msg = "", status = 500, ...params: any) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError);
    }

    this.name = "BaseError";
    // Custom debugging information
    this.msg = msg;
    this.status = status;
  }
}
