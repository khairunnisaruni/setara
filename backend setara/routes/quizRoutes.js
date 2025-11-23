// backend setara/routes/quizRoutes.js
import express from "express";
import { addQuiz } from "../controllers/quizController.js";

const router = express.Router();

// endpoint: POST http://localhost:5000/api/quizzes
router.post("/", addQuiz);

export default router;
