/**
 * App express instance initialization
 */

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler, Express, Request } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";

import helmet from "helmet";
import cors from "cors";

import multer, { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp/uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ".jpg");
  },
});

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  // console.log(file);

  // To accept the file pass `true`, like so:
  cb(null, true);

  // To reject this file pass `false`, like so:
  // cb(null, false)

  // // // You can always pass an error if something goes wrong:
  // cb(new Error("example error"))
}

export const upload = multer(
  // { dest: "/tmp/uploads/" }
  // { dest: path.resolve(__dirname, "../tmp/uploads/") }
  {
    storage: storage,
    fileFilter,
    // limits: { fileSize: 1000000 }
  }
);

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
import uploadRouter from "./routes/upload";

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

  app.use("/uploads", uploadRouter);

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

    res.json({
      message: err.message,
      msg: err.msg,
      // error: err.message,
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
