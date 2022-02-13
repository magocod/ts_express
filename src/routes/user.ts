import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

const userController = new UserController();

router.get("/", userController.findAll);

router.post("/", userController.create);

router.get("/:id", userController.find);

router.put("/:id", userController.update);

router.delete("/:id", userController.delete);

export default router;
