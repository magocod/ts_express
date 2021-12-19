import fs from "fs";
import path from "path";

import {
  Sequelize,
  DataTypes,
  Model,
  BuildOptions,
  ModelCtor,
  Dialect,
} from "sequelize";

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";
console.log(env);

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const config = require(__dirname + "/../config/config.json")[env];
// console.log(config);

import baseConfig, { envDb } from "../config/db.config";
const config = baseConfig[env as envDb];
console.log(config);

// type ImportModel = typeof Model & { associate: (models: any) => void } & {
//   new (values?: Record<string, unknown>, options?: BuildOptions): any;
// };
//
// interface DbInstance {
//   Sequelize: typeof Sequelize;
//   sequelize: Sequelize;
//   models: {
//     [k: string]: ImportModel;
//   };
// }

type ImportModel<A, C> = ModelCtor<Model<A, C>> & {
  associate: (models: any) => void;
};

interface DbInstance {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  models: {
    [k: string]: ImportModel<unknown, unknown>;
  };
}

// let sequelize: Sequelize;
// if (config.use_env_variable) {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect as Dialect,
  }
);

const db: DbInstance = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  models: {},
};

console.log("models fs");
fs.readdirSync(__dirname)
  .filter((file) => {
    const jsExt =
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    const tsExt =
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts";
    return jsExt || tsExt;
  })
  .forEach(async (file) => {
    const route = path.join(__dirname, file);
    console.log(route);
    // const modelInit: unknown = require(route).default;
    const modelInit: { default: unknown } = await import(route);
    console.log(modelInit);
    // if (typeof modelInit === "function") {
    //   const model = modelInit(sequelize, DataTypes);
    //   db.models[model.name] = model;
    // }
    if (typeof modelInit.default === "function") {
      const model = modelInit.default(sequelize, DataTypes);
      db.models[model.name] = model;
    }
  });

Object.keys(db.models).forEach((modelName) => {
  db.models[modelName].associate(db.models);
});

/**
 * @deprecated concept typescript error
 * @param modelName
 */
export function getModel<T>(modelName: string): T {
  if (!db.models[modelName]) {
    throw new Error("model not exist");
  }
  return db.models[modelName] as unknown as T;
}

export * from "./transaction";
export default db;
