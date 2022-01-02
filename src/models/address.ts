/* eslint-disable @typescript-eslint/no-empty-interface */
import { Model, Sequelize, Optional } from "sequelize";

interface AddressAttributes {
  id: number;
  name: string;
  userId: number;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, "id"> {}

export class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number;
  public name!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any): void {
    // models.Project.belongsTo(models.User, {
    //   foreignKey: "userId",
    // });
    Address.belongsTo(models.User, {
      foreignKey: "userId",
    });
  }
}

const initModel = (sequelize: Sequelize, seq: any): typeof Address => {
  Address.init(
    {
      id: {
        type: seq.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: seq.STRING,
      },
      userId: {
        type: seq.INTEGER.UNSIGNED,
        references: {
          // This is a reference to another model
          model: "User",
          // This is the column name of the referenced model
          key: "id",
        },
        allowNull: false,
      },
    },
    { sequelize, modelName: "Address" }
  );
  return Address;
};

export default initModel;
