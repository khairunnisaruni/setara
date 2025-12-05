// backend setara/routes/quizRoutes.js
import express from "express";
import { getAllQuizzes, createQuiz } from "../controllers/quizController.js";
import { 
    getQuiz, 
    updateQuiz, 
    deleteQuiz, 
    updateQuizStatus 
} from "../controllers/kuisController.js";

const router = express.Router();

// GET /api/kuis
router.get("/", getAllQuizzes);

// POST /api/kuis
router.post("/", createQuiz);

// router.get("/", getQuiz);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.patch("/:id/status", updateQuizStatus);

export default router;