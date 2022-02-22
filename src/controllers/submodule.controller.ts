import { Request, Response } from "express";
import { GenericResponse } from "../interfaces";

import { counter } from '../../../ts_module/src'

export async function count(req: Request, res: Response): GenericResponse {
    try {
        return res.status(200).json(counter());
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
