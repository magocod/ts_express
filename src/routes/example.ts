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

const router = Router();

const exampleController = new ExampleController();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  return exampleController.findAll(req, res, next);
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  return exampleController.create(req, res, next);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  return exampleController.find(req, res, next);
});

router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  return exampleController.update(req, res, next);
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  return exampleController.delete(req, res, next);
});

export default router;
