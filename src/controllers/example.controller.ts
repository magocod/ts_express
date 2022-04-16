import { Request, Response } from "express";
import { HttpController, GenericResponse } from "../interfaces";

// example class - with errorHandler

export class ExampleController implements HttpController {
  async findAll(req: Request, res: Response): GenericResponse {
    return res.status(500).json({ message: "...", data: {} });
  }

  async create(req: Request, res: Response): GenericResponse {
    return res.status(500).json({ message: "...", data: {} });
  }

  async find(req: Request, res: Response): GenericResponse {
    return res.status(500).json({ message: "...", data: {} });
  }

  async update(req: Request, res: Response): GenericResponse {
    return res.status(500).json({ message: "...", data: {} });
  }

  async delete(req: Request, res: Response): GenericResponse {
    return res.status(500).json({ message: "...", data: {} });
  }
}
