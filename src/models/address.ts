import {
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class Address extends Model<
  InferAttributes<Address>,
  InferCreationAttributes<Address>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare userId: number;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;

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

export default function (sequelize: Sequelize, seq: any): typeof Address {
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
      createdAt: seq.DATE,
      updatedAt: seq.DATE,
    },
    {
      sequelize,
      // modelName: "Address"
    }
  );
  return Address;
}
