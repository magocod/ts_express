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
import { ExampleController } from "../controllers/example.controller";

export const exampleRouter = Router();

const exampleController = new ExampleController();

exampleRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  return exampleController.findAll(req, res, next);
});

exampleRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  return exampleController.create(req, res, next);
});

exampleRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  return exampleController.find(req, res, next);
});

exampleRouter.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  return exampleController.update(req, res, next);
});

exampleRouter.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    return exampleController.delete(req, res, next);
  }
);

// export default router;
