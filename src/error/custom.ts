// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

export class CustomError extends Error {
  foo: string;
  date: Date;

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  constructor(foo = "bar", ...params: any) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = "CustomError";
    // Custom debugging information
    this.foo = foo;
    this.date = new Date();
  }
}
