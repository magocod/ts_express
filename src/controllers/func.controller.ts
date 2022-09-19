import { Request, Response } from "express";
import { GenericResponse } from "../interfaces";

import { ExampleError } from "../error";

export async function successHandler(
  req: Request,
  res: Response
): GenericResponse {
  // sync | async code ...
  return res.success({ message: "res.success", data: req.body });
}

export async function errorHandler(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _req: Request,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _res: Response
): GenericResponse {
  throw new ExampleError();
}
