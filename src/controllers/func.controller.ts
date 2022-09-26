import { Request, Response } from "express";
import { GenericResponse } from "../interfaces";

import { ExampleError } from "../error";
import { counterService } from "../services";

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

export async function counterIncrement(
  _req: Request,
  res: Response
): GenericResponse {
  const initCount = counterService.getCount();
  const count = counterService.increment();

  return res.success({ message: "increment", data: { initCount, count } });
}

export async function counterDecrement(
  _req: Request,
  res: Response
): GenericResponse {
  const initCount = counterService.getCount();
  const count = counterService.decrement();

  return res.success({ message: "decrement", data: { initCount, count } });
}
