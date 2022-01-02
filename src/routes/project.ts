import express from "express";
const router = express.Router();

import ProjectController from "../controllers/project.controller";

router.post("/", ProjectController.create);

router.get("/", ProjectController.findAll);

export default router;
