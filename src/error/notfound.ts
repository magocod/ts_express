import { BaseError } from "./base";

export class NotFoundError extends BaseError {
  constructor(msg = "not found error", message = "not found error") {
    super(msg, 404, message);
    this.name = "NotFoundError";
  }
}
