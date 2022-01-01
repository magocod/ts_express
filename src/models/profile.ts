/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  Model,
  Sequelize,
  Optional,
  BelongsToManyAddAssociationMixin,
  ModelCtor,
} from "sequelize";

export interface ProfileAttributes {
  id: number;
  name: string;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id"> {}

export class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public addUser!: BelongsToManyAddAssociationMixin<ModelCtor<Model>, unknown>;

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

const initModel = (sequelize: Sequelize, seq: any): typeof Profile => {
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
    },
    { sequelize, modelName: "Profile" }
  );
  return Profile;
};

export default initModel;
