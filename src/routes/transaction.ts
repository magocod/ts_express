import express from "express";
const router = express.Router();

import { body } from "express-validator";

import TransactionController from "../controllers/transaction.controller";

// FIXME validator - reubicar a un lugar mas reutilizable
const transactionValidator = body("title")
  .notEmpty()
  .withMessage("titulo invalido");

router.post("/", transactionValidator, TransactionController.create);

router.get("/", TransactionController.findAll);

export default router;
