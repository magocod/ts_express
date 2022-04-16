/**
 * // use this syntax, lost class context (this = undefined, error)
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

import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

const userController = new UserController();

router.get("/", (req: Request, res: Response) => {
  return userController.findAll(req, res);
});

router.post("/", (req: Request, res: Response) => {
  return userController.create(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
  return userController.find(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  return userController.update(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
  return userController.delete(req, res);
});

export default router;
