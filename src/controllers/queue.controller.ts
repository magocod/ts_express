import { Request, Response } from "express";

import { GenericResponse } from "../interfaces";

export async function call(req: Request, res: Response): GenericResponse {
  return res.json({ message: "call queue", data: {} });
}
