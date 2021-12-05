/* eslint-disable @typescript-eslint/no-empty-interface */
import Seq, { Model, Sequelize, Optional, DataTypes } from "sequelize";
import transaction from "@/routes/transaction";

interface TransactionAttributes {
  id: number;
  title: string;
}

interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, "id"> {}

export class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const initModel = (sequelize: Sequelize) => {
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Seq.STRING,
      },
    },
    { sequelize, modelName: "Transaction" }
  );

  return Transaction;
};

export default initModel;
