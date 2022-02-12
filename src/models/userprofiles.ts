import {
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class UserProfiles extends Model<
  InferAttributes<UserProfiles>,
  InferCreationAttributes<UserProfiles>
> {
  declare id: CreationOptional<number>;

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
    // define association here
  }
}

export default function (sequelize: Sequelize, seq: any): typeof UserProfiles {
  UserProfiles.init(
    {
      id: {
        type: seq.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: seq.DATE,
      updatedAt: seq.DATE,
    },
    {
      sequelize,
      // modelName: "UserProfiles"
    }
  );
  return UserProfiles;
}
