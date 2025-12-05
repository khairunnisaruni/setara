// routes/quizRoutes.js
import express from "express";
import { 
    getQuiz, 
    createQuiz, 
    updateQuiz, 
    deleteQuiz, 
    updateQuizStatus 
} from "../controllers/kuisController.js";

const router = express.Router();

router.get("/", getQuiz);
router.post("/", createQuiz);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.patch("/:id/status", updateQuizStatus);

export default router;