import { QueryInterface, Sequelize } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface, seq: any): Promise<void> => {
    await queryInterface.createTable("Users", {
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
    });
  },
  down: async (
    queryInterface: QueryInterface,
    sequilize: any
  ): Promise<void> => {
    await queryInterface.dropTable("Users");
  },
};
