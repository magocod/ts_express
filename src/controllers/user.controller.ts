import { Request, Response } from "express";
import { HttpController, GenericResponse } from "../interfaces";

export class UserController implements HttpController {
  async findAll(req: Request, res: Response): GenericResponse {
    return res.status(500).json({});
  }

  async create(req: Request, res: Response): GenericResponse {
    return res.status(500).json({});
  }

  async find(req: Request, res: Response): GenericResponse {
    return res.status(500).json({});
  }

  async update(req: Request, res: Response): GenericResponse {
    return res.status(500).json({});
  }

  async delete(req: Request, res: Response): GenericResponse {
    return res.status(500).json({});
  }
}
