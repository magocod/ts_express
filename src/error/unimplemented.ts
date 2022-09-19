import { BaseError } from "./base";

export class UnImplementedError extends BaseError {
  constructor() {
    super("unimplemented", 400, "unimplemented");
    this.name = "UnImplementedError";
  }
}
