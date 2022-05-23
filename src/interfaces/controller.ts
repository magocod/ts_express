import { Request, Response, NextFunction } from "express";
import { ExpressResponse } from "./response";

export interface HttpController {
  /**
   *
   * @param req
   * @param res
   * @param next
   */
  findAll(req: Request, res: Response, next?: NextFunction): ExpressResponse;

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  create(req: Request, res: Response, next?: NextFunction): ExpressResponse;

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  find(req: Request, res: Response, next?: NextFunction): ExpressResponse;

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  update(req: Request, res: Response, next?: NextFunction): ExpressResponse;

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  delete(req: Request, res: Response, next?: NextFunction): ExpressResponse;
}
