import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { Transaction } from "../models";

import { callModel } from "../utils";
import { GenericResponse } from "../interfaces";
// import { getModel, Transaction } from "../models";
// const transaction = getModel<typeof Transaction>('Transaction');

export async function findAll(req: Request, res: Response): GenericResponse {
  // TODO filter and paginate
  try {
    const data = await Transaction.findAll();
    return res.send(data);
  } catch (err) {
    let message = "error cargando las transaccion";
    if (err instanceof Error) {
      message = err.message;
    }
    return res.status(500).send({
      message,
    });
  }
}

export async function create(req: Request, res: Response): GenericResponse {
  const errors = validationResult(req);
  // console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const reqData = {
    title: req.body.title,
  };

  try {
    console.log(await callModel());
    const data = await Transaction.create(reqData);
    return res.send(data);
  } catch (err) {
    let message = "error creando la transaccion";
    if (err instanceof Error) {
      message = err.message;
    }
    return res.status(500).send({
      message,
    });
  }
}
