/**
 * App express instance initialization
 */

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import helmet from "helmet";

import middleware from "./middleware";
import routes from "./routes/index";
import { applyMiddleware } from "./utils";

// express instance
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// middleware
applyMiddleware(middleware, app);

// routes
app.use("/", routes);

// config
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

/* eslint-disable no-alert,  @typescript-eslint/no-unused-vars */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.setHeader("Content-Type", "application/json");
  // res.send(
  //   JSON.stringify({
  //     message: err.message,
  //     // stack: err.stack
  //   })
  // );
  res.json({
    message: err.message,
    // stack: err.stack
  });
};

// error handler
app.use(errorHandler);

// db sync (example)
// import "./config/db.config";

// db
import db from "./models"

if (db.sequelize) {
  db.sequelize.sync({ force: false, alter: false });
}

// export default app;
module.exports = app;
