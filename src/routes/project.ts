import express from "express";
const router = express.Router();

import { ProjectController } from "../controllers/project.controller";

const projectController = new ProjectController();

router.get("/", projectController.findAll);

router.post("/", projectController.create);

router.get("/:id", projectController.find);

router.put("/:id", projectController.update);

router.delete("/:id", projectController.delete);

export default router;
