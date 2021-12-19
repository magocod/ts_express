import { Transaction as TransactionModel } from "../../src/models/transaction";
import faker from "faker";

import { Transaction } from "../../src/models";
// import { getModel, Transaction } from "../../../src/models";
// const transaction = getModel<Transaction>('Transaction');

export function generate_transaction(): Promise<TransactionModel> {
  const d = {
    title: faker.datatype.uuid(),
  };
  return Transaction.create(d);
}
