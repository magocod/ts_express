import { Router, Request, Response } from "express";

import passport from "passport";
import { JwtController } from "../controllers/jwt.controller";

const jwtController = new JwtController();

const router = Router();

router.post("/signup", (req: Request, res: Response) => {
  return jwtController.signup(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  return jwtController.login(req, res);
});

router.post(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req: Request, res: Response) => {
        return jwtController.logout(req, res);
    }
);

router.get(
  "/current_user",
  passport.authenticate("jwt", { session: false }),
  (req: Request, res: Response) => {
    return jwtController.authenticated(req, res);
  }
);

export default router;
