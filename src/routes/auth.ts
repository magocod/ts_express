import { Router } from "express";
import { signup, login, currentUser } from "../controllers/auth.controller";

import { isAuthenticated } from '../services/auth'

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/current_user", isAuthenticated, currentUser);

export default router;
