import { dbConfig } from "../config/db.config";

import { Sequelize, Dialect } from "sequelize";

import initTransaction, { Transaction } from "./transaction.model";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  logging: false,
});

interface DbInstance {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  Transaction: typeof Transaction;
}

const db: DbInstance = {
  Sequelize,
  sequelize,
  // models
  Transaction: initTransaction(sequelize)
};

export default db;
