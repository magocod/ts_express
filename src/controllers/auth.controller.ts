import { Request, Response } from "express";

import { GenericResponse } from "../interfaces";

// example with functions

export async function signup(req: Request, res: Response): Promise<void> {
  console.log("Register User");
  // sync code ...
  res.send("Register User");
}

export async function login(req: Request, res: Response): GenericResponse {
  console.log("Login");
  console.log(req.body)
  // async code ...
  return res.json({ message: "message" });
}

export async function logout(req: Request, res: Response): GenericResponse {
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
