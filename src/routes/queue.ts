import { Router } from "express";
import { call, simpleEmail } from "../controllers/queue.controller";

const router = Router();

router.post("/call", call);
router.post("/simple_email", simpleEmail);

export default router;
