import { Router } from "express";
import {
  call,
  simpleEmail,
  emailToQueue,
  divisionToQueue
} from "../controllers/queue.controller";

const router = Router();

router.post("/call", call);
router.post("/simple_email", simpleEmail);
router.post("/email_to_queue", emailToQueue);
router.post("/division_to_queue", divisionToQueue);

export default router;
