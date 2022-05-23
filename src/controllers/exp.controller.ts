import { Request, Response } from "express";
import { GenericResponse } from "../interfaces";

export async function successHandler(req: Request, res: Response): GenericResponse {
  try {
    // sync | async code ...
    return res.status(500).json({ message: "...", data: {} });
  } catch (err) {
    let message = "...";
    if (err instanceof Error) {
      message = err.message;
    }

    return res.status(500).send({
      message,
      error: message,
    });
  }
}

export async function errorHandler(req: Request, res: Response): GenericResponse {
  try {
    // sync | async code ...
    return res.status(500).json({ message: "...", data: {} });
  } catch (err) {
    let message = "...";
    if (err instanceof Error) {
      message = err.message;
    }

    return res.status(500).send({
      message,
      error: message,
    });
  }
}
