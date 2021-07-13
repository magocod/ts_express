import { Router } from "express";
import AuthController from "../controllers/AuthController";

import { handleVerify } from "../middleware/auth";

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);

router.get("/jwt-test", handleVerify, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
