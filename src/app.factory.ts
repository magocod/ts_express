/**
 * App express instance initialization
 */

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler, Express } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import helmet from "helmet";
import cors from "cors";

// import middleware from "./middleware";
// import { applyMiddleware } from "./utils";
import {
  // rateLimiterMiddleware,
  isolatedRateLimiterMiddleware,
} from "./middleware";

// with export default
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";

// with export
import { exampleRouter } from "./routes/example";

/**
 * do not call synchronous processes in this function, or with side effects (ej: connection to db)
 */
export function createApp(): Express {
  // express instance
  const app = express();

  // extend express response functions

  app.response.success = function ({ message, data }, status = 200) {
    return this.status(status).json({
      message,
      data,
    });
  };

  app.response.error = function (
    { message, error, exception, code },
    status = 400
  ) {
    return this.status(status).json({
      message,
      error,
      exception,
      code,
    });
  };

  // view engine setup
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'jade');

  // middleware
  // applyMiddleware(middleware, app);

  // config
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use(helmet());
  app.use(cors());
  // app.use(rateLimiterMiddleware);
  const rlm = isolatedRateLimiterMiddleware();
  app.use(rlm);

  // routes
  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/examples", exampleRouter);

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
      msg: err.msg,
      // error: err.message,
      // stack: err.stack
    });
  };

  // error handler
  app.use(errorHandler);

  return app;
}

/**
 * call asynchronous process and do not wait for its result
 */
export function syncCreateApp(): Express.Application {
  // new Promise((resolve) => {
  //   resolve("");
  // })
  //   .then(() => {
  //     console.log("example connect db");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  return createApp();
}

/**
 * call asynchronous processes and wait for results
 */
export async function asyncCreateApp(): Promise<Express.Application> {
  // await new Promise((resolve) => {
  //   resolve("example connect db");
  // });
  return createApp();
}
