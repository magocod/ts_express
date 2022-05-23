import { Request, Response, NextFunction } from "express";
import { HttpController } from "../interfaces";

// example class - with errorHandler

export class ExampleController implements HttpController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(500).json({ message: "...", data: {} });
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(500).json({ message: "...", data: {} });
    } catch (e) {
      next(e);
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(500).json({ message: "...", data: {} });
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(500).json({ message: "...", data: {} });
    } catch (e) {
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(500).json({ message: "...", data: {} });
    } catch (e) {
      next(e);
    }
  }
}
