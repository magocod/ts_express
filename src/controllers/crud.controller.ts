import { Request, Response } from "express";
import { Result, ValidationError } from "express-validator";

import { ModelDefined } from "sequelize";

type genericResponse = Promise<
  Response<unknown, Record<string, unknown>> | undefined
>;

export interface ResultValidation {
  ok: boolean;
  data: unknown
  errors: Result<ValidationError>;
}

export default class CrudController<T extends ModelDefined<unknown, unknown>> {
  private model: T;

  constructor(modelClass: T) {
    this.model = modelClass;
  }

  validateCreate(req: Request): ResultValidation {
    throw new Error("not implemented");
  }

  async create(req: Request, res: Response): genericResponse {
    const resultValidation = this.validateCreate(req);
    // console.log(errors)
    if (!resultValidation.ok) {
      return res.status(400).json({ errors: resultValidation.errors.array() });
    }

    try {
      const data = await this.model.create(resultValidation.data);
      return res.send(data);
    } catch (err) {
      return res.status(500).send({
        message: err.message || "error creando la transaccion",
      });
    }
  }

  async findAll(req: Request, res: Response): genericResponse {
    // TODO filter and paginate
    try {
      const data = await this.model.findAll();
      return res.send(data);
    } catch (err) {
      return res.status(500).send({
        message: err.message || "error cargando las transaccion",
      });
    }
  }
}
