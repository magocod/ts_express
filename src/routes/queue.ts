import { Router } from "express";
import { call } from "../controllers/queue.controller";

const router = Router();

router.post("/call", call);

export default router;