import {
  Model,
  Sequelize,
  BelongsToManyAddAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class Profile extends Model<
  InferAttributes<Profile>,
  InferCreationAttributes<Profile>
> {
  declare id: CreationOptional<number>;
  declare name: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;

  public addUser!: BelongsToManyAddAssociationMixin<Model, unknown>;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any): void {
    Profile.belongsToMany(models.User, {
      foreignKey: "profileId",
      otherKey: "userId",
      through: models.UserProfiles,
    });
  }
}

export default function (sequelize: Sequelize, seq: any): typeof Profile {
  Profile.init(
    {
      id: {
        type: seq.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: seq.STRING,
      },
      createdAt: seq.DATE,
      updatedAt: seq.DATE,
    },
    {
      sequelize,
      modelName: "Profile"
    }
  );
  return Profile;
}
