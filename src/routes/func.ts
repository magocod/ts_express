import { Request, Response, NextFunction, Router } from "express";
import {
  successHandler,
  errorHandler,
  counterIncrement,
  counterDecrement,
} from "../controllers/func.controller";

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

funcRouter.post("/counter_increment", counterIncrement);

funcRouter.post("/counter_decrement", counterDecrement);
