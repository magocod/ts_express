import { Request, Response } from "express";

import { pool } from "../services/queue_pool";
import { sendEmail } from "../services/email";

import { GenericResponse } from "../interfaces";

export async function call(req: Request, res: Response): GenericResponse {
  try {
    // console.log(req.body)
    // console.log(pool.minusQueue())
    const job = await pool.minusQueue().add({
      a: req.body.a,
      b: req.body.b,
      failed: req.body.failed,
    });
    return res.json({ message: "call queue", data: job.toJSON() });
    // return res.status(400).json({ message: "error call queue" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error call queue" });
  }
}

export async function simpleEmail(
  req: Request,
  res: Response
): GenericResponse {
  try {
    // console.log(req.body)
    const info = await sendEmail({
      to: req.body.to,
      subject: req.body.subject,
      text: req.body.text,
      data: req.body.data,
    });

    // console.log(JSON.stringify(info, null, 2));
    return res.json({ message: "simple email", data: info });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error simple email" });
  }
}
