import { Request, Response } from "express";
import { Project, User } from "../models";

import { GenericResponse } from "../utils";
// import { getModel, Transaction } from "../models";
// const transaction = getModel<typeof Transaction>('Transaction');

// example with class

export default class ProjectController {
  static async create(req: Request, res: Response): GenericResponse {
    const reqData = {
      name: req.body.name,
      userId: req.body.userId,
    };

    try {
      const data = await Project.create(reqData, { include: [User] });
      await data.reload();
      return res.send(data);
    } catch (err) {
      let message = "error creando";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
      });
    }
  }

  static async findAll(req: Request, res: Response): GenericResponse {
    // TODO filter and paginate
    try {
      const data = await Project.findAll({ include: [User] });
      return res.send(data);
    } catch (err) {
      let message = "error cargando";
      if (err instanceof Error) {
        message = err.message;
      }
      return res.status(500).send({
        message,
      });
    }
  }
}
