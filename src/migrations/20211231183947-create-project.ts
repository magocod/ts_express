import { QueryInterface, Sequelize } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface, seq: any): Promise<void> => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: seq.INTEGER,
      },
      name: {
        type: seq.STRING,
      },
      createdAt: {
        allowNull: false,
        type: seq.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: seq.DATE,
      },
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
    });
  },
  down: async (
    queryInterface: QueryInterface,
    sequilize: any
  ): Promise<void> => {
    await queryInterface.dropTable("Projects");
  },
};
