import express from "express";
import { getCategories, getClassCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/class-categories", getClassCategories);

export default router;