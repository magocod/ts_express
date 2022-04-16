import "reflect-metadata";
import { DataSource } from "typeorm";

export const mxDataSource = new DataSource({
  // name: "default",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "exp_2",
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  // entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: [],
});
