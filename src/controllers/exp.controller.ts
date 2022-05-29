import { Request, Response } from "express";
import { GenericResponse } from "../interfaces";

import { ExampleError } from "../error";

export async function successHandler(
  req: Request,
  res: Response
): GenericResponse {
  try {
    // sync | async code ...
    return res.success({ message: "res.success", data: {} });
  } catch (err) {
    let message = "...";
    if (err instanceof Error) {
      message = err.message;
    }

    return res.error({ message: "res.error", error: message });
  }
}

export async function errorHandler(
  req: Request,
  res: Response
): GenericResponse {
  try {
    throw new ExampleError();
  } catch (err) {
    let message = "...";
    if (err instanceof Error) {
      message = err.message;
    }

    return res.error({ message: "res.error", error: message });
  }
}
