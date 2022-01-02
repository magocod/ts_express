import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { Transaction } from "../models";

import { callModel } from "../utils"
// import { getModel, Transaction } from "../models";
// const transaction = getModel<typeof Transaction>('Transaction');

type genericResponse = Promise<
  Response<unknown, Record<string, unknown>> | undefined
>;

export default class TransactionController {
  static async create(req: Request, res: Response): genericResponse {
    const errors = validationResult(req);
    // console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const reqData = {
      title: req.body.title
    };

    try {
      console.log(await callModel())
      const data = await Transaction.create(reqData);
      return res.send(data);
    } catch (err) {
      return res.status(500).send({
        message: err.message || "error creando la transaccion",
      });
    }
  }

  static async findAll(req: Request, res: Response): genericResponse {
    // TODO filter and paginate
    try {
      const data = await Transaction.findAll();
      return res.send(data);
    } catch (err) {
      return res.status(500).send({
        message: err.message || "error cargando las transaccion",
      });
    }
  }
}