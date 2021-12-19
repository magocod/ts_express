/* eslint-disable @typescript-eslint/no-empty-interface */
import { Model, Sequelize, Optional } from "sequelize";

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

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any): void {
    // define association here
  }
}

const initModel = (sequelize: Sequelize, seq: any): typeof Transaction => {
  Transaction.init(
    {
      id: {
        type: seq.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: seq.STRING,
      },
    },
    { sequelize, modelName: "Transaction" }
  );
  return Transaction;
};

export default initModel;
