/* eslint-disable @typescript-eslint/no-empty-interface */
import { Model, Sequelize, Optional } from "sequelize";

interface UserProfilesAttributes {
    // id: number;
}

// interface UserProfilesCreationAttributes
//     extends Optional<UserProfilesAttributes, "id"> {}

export class UserProfiles
    extends Model<UserProfilesAttributes, UserProfilesAttributes>
    implements UserProfilesAttributes
{
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.

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

const initModel = (sequelize: Sequelize, seq: any): typeof UserProfiles => {
    UserProfiles.init(
        {
            // id: {
            //     type: seq.INTEGER.UNSIGNED,
            //     autoIncrement: true,
            //     primaryKey: true,
            // },
        },
        { sequelize, modelName: "UserProfiles" }
    );
    return UserProfiles;
};

export default initModel;
