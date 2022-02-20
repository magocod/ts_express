import { Router } from "express";
import { TutorialController } from "../controllers/tutorial.controller";

const router = Router();

const tutorialController = new TutorialController();

router.get("/published", tutorialController.findAllPublished);

router.get("/", tutorialController.findAll);

router.post("/", tutorialController.create);

router.get("/:id", tutorialController.find);

router.put("/:id", tutorialController.update);

router.delete("/:id", tutorialController.delete);

export default router;
