import { Transaction } from "../models";

export function callModel(): Promise<number> {
  // verify model
  return Transaction.count();
}
