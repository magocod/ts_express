import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import { DataSource } from "typeorm";

const entitiesPath =
  process.env.NODE_ENV === "testing" ? "src/entity/**/*.ts" : "dist/entity/**/*.js";

// export const argDataSource = new DataSource({
//   // name: "default",
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "",
//   database: "exp",
//   synchronize: false,
//   logging: false,
//   entities: ["src/entity/**/*.ts"],
//   // entities: ["dist/entity/**/*.js"],
//   migrations: ["dist/migration/**/*.js"],
//   subscribers: [],
// });

export const argDataSource = new DataSource({
  // name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "typeorm_arg",
  synchronize: false,
  logging: false,
  // entities: ["src/entity/**/*.ts"],
  // entities: ["dist/entity/**/*.js"],
  entities: [entitiesPath],
  migrations: ["dist/migration/**/*.js"],
  subscribers: [],
});
