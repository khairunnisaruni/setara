// backend setara/routes/quizRoutes.js
import express from "express";
import { getAllQuizzes, createQuiz } from "../controllers/quizController.js";

const router = express.Router();

// GET /api/kuis
router.get("/", getAllQuizzes);

// POST /api/kuis
router.post("/", createQuiz);

export default router; 
