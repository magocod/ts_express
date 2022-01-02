/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  Sequelize,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  BelongsToManyAddAssociationMixin,
  HasOneCreateAssociationMixin,
  Optional,
} from "sequelize";

import { Address } from "./address";
import { Profile, ProfileAttributes } from "./profile";

interface UserAttributes {
  id: number;
  name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getProjects!: HasManyGetAssociationsMixin<Profile>; // Note the null assertions!
  public addProject!: HasManyAddAssociationMixin<Profile, number>;
  public hasProject!: HasManyHasAssociationMixin<Profile, number>;
  public countProjects!: HasManyCountAssociationsMixin;
  public createProject!: HasManyCreateAssociationMixin<Profile>;

  public addProfile!: BelongsToManyAddAssociationMixin<Profile, ProfileAttributes>;

  public createAddress!: HasOneCreateAssociationMixin<Address>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly projects?: Profile[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    projects: Association<User, Profile>;
  };

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any): void {
    User.hasMany(models.Project, {
      sourceKey: "id",
      foreignKey: "userId",
      // as: "projects", // this determines the name in `associations`!
    });
    User.belongsToMany(models.Profile, {
      foreignKey: "userId",
      otherKey: "profileId",
      through: models.UserProfiles,
    });
    User.hasOne(models.Address, {
      foreignKey: { name: "userId" },
      sourceKey: "id",
    });
  }
}

const initModel = (sequelize: Sequelize, seq: any): typeof User => {
  User.init(
    {
      id: {
        type: seq.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: seq.STRING,
      },
    },
    { sequelize, modelName: "User" }
  );
  return User;
};

export default initModel;
