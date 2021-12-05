import db from "../../src/models";
import { Transaction as TransactionModel } from "../../src/models/transaction.model";
import faker from "faker";

const Transaction = db.Transaction;

export function generate_transaction(): Promise<TransactionModel> {
  const d = {
    title: faker.datatype.uuid(),
  };
  return Transaction.create(d);
}
