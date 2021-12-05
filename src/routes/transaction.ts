import express from "express";
import { body } from "express-validator";

const router = express.Router();

// FIXME validator - reubicar a un lugar mas reutilizable
const transactionValidator = body("title")
  .notEmpty()
  .withMessage("titulo invalido");

import TransactionController from "../controllers/transaction.controller";
router.post("/", transactionValidator, TransactionController.create);
router.get("/", TransactionController.findAll);

export default router;
