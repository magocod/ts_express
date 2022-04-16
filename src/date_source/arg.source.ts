import "reflect-metadata";
import { DataSource } from "typeorm";

export const argDataSource = new DataSource({
  // name: "default",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "exp",
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  // entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: [],
});
