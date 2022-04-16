import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";

const router = Router();

// handle sync error, with errorHandler, from the route
router.post("/signup", signup);

// handle async error, with errorHandler, from the route
router.post("/login", (req, res, next) => {
  try {
    return login(req, res);
  } catch (e) {
    next(e);
  }
});

// handle sync|async error, without errorHandler
router.post("/login", logout);

export default router;
