import { Request, Response } from "express";
import { GenericResponse } from "../interfaces";
import { successResponse, SuccessResponse, errorResponse } from "../utils";

export async function signup(req: Request, res: Response): Promise<void> {
  res.send("Register User");
}

export async function login(req: Request, res: Response): GenericResponse {
  return res.status(200).json({ message: "string", data: {} });
}

export async function logout(req: Request, res: Response): GenericResponse {
  return res.status(200).json(successResponse("message", {}));
}
