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
