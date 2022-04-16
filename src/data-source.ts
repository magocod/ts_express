import "reflect-metadata";
import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//     // name: "default",
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "123",
//     database: "typeorm",
//     synchronize: false,
//     logging: false,
//     entities: [],
//     migrations: ["dist/migration/**/*.js"],
//     subscribers: [],
// })

export const AppDataSource = new DataSource({
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
  migrations: ["dist/migration/**/*.js"],
  subscribers: [],
});
