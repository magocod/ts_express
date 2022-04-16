import { Router, Request, Response } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

const categoryController = new CategoryController();

router.get("/", (req: Request, res: Response) => {
    return categoryController.findAll(req, res);
});

router.post("/", (req: Request, res: Response) => {
    return categoryController.create(req, res);
});

router.get("/:id", (req: Request, res: Response) => {
    return categoryController.find(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
    return categoryController.update(req, res);
});

router.delete("/:id", (req: Request, res: Response) => {
    return categoryController.delete(req, res);
});

export default router;
