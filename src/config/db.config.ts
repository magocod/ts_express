// TODO config db

// console.log(process.env.NODE_ENV)
// console.log(process.env.DB_USER)
export const dbConfig = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASS || "",
  DB: process.env.DB_NAME || "t_app",
  dialect: process.env.DB || "mysql",
};

export const baseConfig = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB || "mysql",
  },
  test: {
    username: "root",
    password: undefined,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: undefined,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export type envDb = keyof typeof baseConfig;

export default baseConfig;
// FIXME error to transpile to js
module.exports = baseConfig;
