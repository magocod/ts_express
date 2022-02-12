import express from "express";
const router = express.Router();

import { body } from "express-validator";

import { create, findAll } from "../controllers/transaction.controller";

// FIXME validator - reubicar a un lugar mas reutilizable
const transactionValidator = body("title")
  .notEmpty()
  .withMessage("titulo invalido");

router.post("/", transactionValidator, create);

router.get("/", findAll);

export default router;
