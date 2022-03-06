import { Router } from "express";
import {
  call,
  simpleEmail,
  emailToQueue,
} from "../controllers/queue.controller";

const router = Router();

router.post("/call", call);
router.post("/simple_email", simpleEmail);
router.post("/email_to_queue", emailToQueue);

export default router;
