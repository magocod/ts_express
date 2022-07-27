import { Request, Response } from "express";

import { GenericResponse } from "../interfaces";

export async function simple(req: Request, res: Response): GenericResponse {
  try {
    // console.log(req.body);
    console.log(req.file);
    return res.status(200).json({ message: "...", data: {} });
  } catch (err) {
    console.log(err)
    let message = "...";
    if (err instanceof Error) {
      message = err.message;
    }

    return res.status(400).send({
      message,
      error: message,
    });
  }
}

export async function multiple(req: Request, res: Response): GenericResponse {
  try {
    // console.log(req.body);
    console.log(req.files);
    return res.status(200).json({ message: "...", data: {} });
  } catch (err) {
    console.log(err)
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
