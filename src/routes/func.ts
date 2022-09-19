import { Request, Response, NextFunction, Router } from "express";
import { successHandler, errorHandler } from "../controllers/func.controller";

export const funcRouter = Router();

funcRouter.post(
  "/success_handler",
  (req: Request, res: Response, next: NextFunction) => {
    return successHandler(req, res).catch(next);
  }
);

funcRouter.post(
  "/error_handler",
  (req: Request, res: Response, next: NextFunction) => {
    return errorHandler(req, res).catch(next);
  }
);
