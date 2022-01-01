import { QueryInterface, Sequelize } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface, seq: any): Promise<void> => {
    await queryInterface.createTable("UserProfiles", {
      userId: {
        type: seq.INTEGER,
        references: {
          model: {
            tableName: "users",
            // schema: 'schema'
          },
          key: "id",
        },
        allowNull: false,
      },
      profileId: {
        type: seq.INTEGER,
        references: {
          model: {
            tableName: "profiles",
            // schema: 'schema'
          },
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: seq.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: seq.DATE,
      },
    });
  },
  down: async (
    queryInterface: QueryInterface,
    sequilize: any
  ): Promise<void> => {
    await queryInterface.dropTable("UserProfiles");
  },
};
