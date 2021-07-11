import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

export default router;
