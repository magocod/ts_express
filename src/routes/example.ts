/**
 * // use this syntax, lost class context (this = undefined, error)
 * const controller= new controller();
 * router.get("/", controller.method)
 *
 * // use this temporary syntax, until you fix bug or update express v5
 * // (use this syntax without try catch, you can break instance express)
 *
 * router.get("/", (req: Request, res: Response) => {
 *   return controller.method(req, res);
 * });
 *
 */

import { Request, Response, NextFunction, Router } from "express";
import { ClassController } from "../controllers/class.controller";

export const exampleRouter = Router();

const classController = new ClassController();

exampleRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  return classController.findAll(req, res, next).catch(next);
});

exampleRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  return classController.create(req, res).catch(next);
});

exampleRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  return classController.find(req, res).catch(next);
});

exampleRouter.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  return classController.update(req, res).catch(next);
});

exampleRouter.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    return classController.delete(req, res).catch(next);
  }
);
