import { Request, Response } from "express";
import { HttpController } from "../interfaces";

// example class - without errorHandler

export class UserController implements HttpController {
  async findAll(req: Request, res: Response) {
    try {
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

  async create(req: Request, res: Response) {
    try {
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

  async find(req: Request, res: Response) {
    try {
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

  async update(req: Request, res: Response) {
    try {
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

  async delete(req: Request, res: Response) {
    try {
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
}
