import { BaseError } from "./base";

export class ExampleError extends BaseError {
  constructor() {
    super("example message", "example code error message");
    this.name = "ExampleError";
  }
}
