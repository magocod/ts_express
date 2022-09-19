import { Request, Response, NextFunction } from "express";
import { HttpController } from "../interfaces";
import { UnImplementedError } from "../error";

export class ClassController implements HttpController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(req: Request, res: Response, next: NextFunction) {
    throw new UnImplementedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(req: Request, res: Response) {
    throw new UnImplementedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(req: Request, res: Response) {
    throw new UnImplementedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(req: Request, res: Response) {
    throw new UnImplementedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(req: Request, res: Response) {
    throw new UnImplementedError();
  }
}
