// backend_setara/routes/bookRoutes.js
import express from "express";
import { createBook } from "../controllers/bookController.js";

const router = express.Router();

// POST /api/books
router.post("/", createBook);

export default router;
