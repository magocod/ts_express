import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";

import { validateRequest } from '../utils';
import { body } from "express-validator";

const router = Router();

router.post("/signup", signup);

router.post(
  "/login",
  [
    // username must be an email
    body("username").isEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }),
  ],
  validateRequest,
  login
);

router.post("/logout", logout);

export default router;
