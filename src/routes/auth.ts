import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/AuthController";

const router = Router();
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get(
  "/jwt-test",
  passport.authenticate("jwt", { session: false }),
  AuthController.authenticated
);

export default router;
