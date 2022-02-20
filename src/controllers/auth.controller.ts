import { Request, Response } from "express";

import { GenericResponse } from "../interfaces";

export async function signup(req: Request, res: Response): Promise<void> {
  console.log("Register User");
  res.send("Register User");
}

export async function login(req: Request, res: Response): Promise<void> {
  console.log("Login");
  res.send("Login");
}

export async function logout(req: Request, res: Response): GenericResponse {
  console.log("logout");
  return res.status(500).json({});
}
