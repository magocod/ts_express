import { Request, Response } from "express";

export async function signup(req: Request, res: Response): Promise<void> {
  console.log("Register User");
  res.send("Register User");
}

export async function login(req: Request, res: Response): Promise<void> {
  console.log("Login");
  res.send("Login");
}
