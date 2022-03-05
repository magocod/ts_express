import { Request, Response } from "express";

import queuePool from "../services/queue_pool";

import { GenericResponse } from "../interfaces";

export async function call(req: Request, res: Response): GenericResponse {
  try {
    // console.log(req.body)
    // console.log(queuePool.minusQueue())
    const job = await queuePool.minusQueue().add({
      a: req.body.a,
      b: req.body.b,
      failed: req.body.failed
    })
    return res.json({ message: "call queue", data: job.toJSON() });
    // return res.status(400).json({ message: "error call queue" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "error call queue" });
  }
}
