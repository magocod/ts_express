import { ErrorRequestHandler } from "express";

/* eslint-disable no-alert,  @typescript-eslint/no-unused-vars */
/**
 * if error does not contain msg, it may be an unknown exception
 * @param err
 * @param req
 * @param res
 * @param next
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  res.setHeader("Content-Type", "application/json");

  // TODO improve global error handling

  // res.json({
  //   message: req.app.get("env") === "development" ? err.message : undefined,
  //   msg: err.msg ? err.msg : "general exception message",
  // });
  res.error(
    {
      message: req.app.get("env") === "development" ? err.message : undefined,
      msg: err.msg ? err.msg : "general exception message",
    },
    err.status || 500
  );
};
