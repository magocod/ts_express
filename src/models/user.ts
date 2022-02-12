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
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";

import { Address } from "./address";
import { Profile } from "./profile";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getProjects: HasManyGetAssociationsMixin<Profile>; // Note the null assertions!
  declare addProject: HasManyAddAssociationMixin<Profile, number>;
  declare hasProject: HasManyHasAssociationMixin<Profile, number>;
  declare countProjects: HasManyCountAssociationsMixin;
  declare createProject: HasManyCreateAssociationMixin<Profile>;

  declare addProfile: BelongsToManyAddAssociationMixin<Profile, number>;

  declare createAddress: HasOneCreateAssociationMixin<Address>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare profiles?: NonAttribute<Profile[]>; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    profiles: Association<User, Profile>;
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

export default function (sequelize: Sequelize, seq: any): typeof User {
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
      createdAt: seq.DATE,
      updatedAt: seq.DATE,
    },
    {
      sequelize,
      // modelName: "User"
    }
  );
  return User;
}
