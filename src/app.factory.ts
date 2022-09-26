/**
 * App express instance initialization
 */

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express, { Express, Response, Request } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import helmet from "helmet";
import cors from "cors";

import {
  // rateLimiterMiddleware,
  isolatedRateLimiterMiddleware,
} from "./middleware";

import { exampleRouter, funcRouter } from "./routes";
import { errorHandler } from "./utils";

// https://expressjs.com/en/guide/overriding-express-api.html
/**
 * @example
 * add methods Express.Response
 *
 * // success
 * res.success({ message: "res.success", data: req.body });
 *
 * // error
 * res.error({ message: "res.error", msg: "error_message" });
 *
 * @param app
 */
export function extendExpressApi(app: Express) {
  app.response.success = function ({ message, data }, status = 200) {
    return this.status(status).json({
      message,
      data,
    });
  };

  app.response.error = function ({ message, msg, code }, status = 500) {
    return this.status(status).json({
      message,
      msg,
      code,
    });
  };
}

/**
 * do not call synchronous processes in this function, or with side effects (ej: connection to db)
 */
export function createApp(): Express {
  // express instance
  const app = express();

  // extend express response functions
  extendExpressApi(app);

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
  app.get("/", (req: Request, res: Response) => {
    res.send(process.env.APP_NAME || "ts_express");
  });

  app.use("/examples", exampleRouter);
  app.use("/functions", funcRouter);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

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
