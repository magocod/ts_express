import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler, Express } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import middleware from "./middleware";
import routes from "./routes/index";
import { applyMiddleware } from "./utils";

import { Connection, createConnection } from "typeorm";

import { root } from './paths'
console.log(path.join(root, '/folder', 'resource.ext'))

export function createApp(): Express.Application {
  // express instance
  const app = express();

  // app.response.genericError = function ({
  //   message,
  //   exception = undefined,
  //   code = 0,
  // }: {
  //   message: string;
  //   exception?: unknown;
  //   code?: number;
  // }) {
  //   return this.json({
  //     exception,
  //     code,
  //     message,
  //   });
  // };

  // view engine setup
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'jade');

  // middleware
  applyMiddleware(middleware, app);

  // config
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(bodyParser.json());

  // routes
  app.use("/", routes);

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
    // res.send(JSON.stringify({ message: err.message, stack: err.stack }));
    res.json({
      message: err.message,
      // stack: err.stack
    });
  };

  // error handler
  app.use(errorHandler);

  return app;
}

export function syncCreateApp(): Express.Application {
  // create typeorm connection
  createConnection()
    .then((connection) => {
      // connection.getRepository(User);
      console.log("typeorm connect db");
    })
    .catch((error) => {
      console.log(error);
    });
  return createApp();
}

export async function asyncCreateApp(): Promise<{
  app: Express.Application;
  connection: Connection;
}> {
  // create typeorm connection
  const connection = await createConnection();
  // console.log("typeorm connect db");
  return { app: createApp(), connection };
}
