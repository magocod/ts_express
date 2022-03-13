import { Request, Response } from "express";
import { GenericResponse } from "./response";

export interface HttpController {
  /**
   *
   * @param req
   * @param res
   */
  findAll(req: Request, res: Response): GenericResponse;

  /**
   *
   * @param req
   * @param res
   */
  create(req: Request, res: Response): GenericResponse;

  /**
   *
   * @param req
   * @param res
   */
  find(req: Request, res: Response): GenericResponse;

  /**
   *
   * @param req
   * @param res
   */
  update(req: Request, res: Response): GenericResponse;

  /**
   *
   * @param req
   * @param res
   */
  delete(req: Request, res: Response): GenericResponse;
}
