import { Request, Response } from "express";

import { GenericResponse } from "../interfaces";
import { resourcePath } from "../constants";

export async function simple(req: Request, res: Response): GenericResponse {
  try {
    // console.log(req.body);
    console.log(req.file);
    return res.status(200).json({ message: "...", data: {} });
  } catch (err) {
    // console.log(err);
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
    // console.log(err);
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

export async function download(req: Request, res: Response) {
  try {
    const { filename } = req.query;
    return res.status(200).download(`${resourcePath}/${filename}`);
  } catch (err) {
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
