import { Router, Request, Response } from "express";
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
