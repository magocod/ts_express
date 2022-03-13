import { Request, Response } from "express";

import { GenericResponse } from "../interfaces";

export async function signup(req: Request, res: Response): Promise<void> {
  console.log("Register User");
  res.send("Register User");
}

export async function login(req: Request, res: Response): GenericResponse {
  console.log("Login");
  return res.json({  message: 'message' });
}
