// routes/quizRoutes.js
import express from "express";
import { 
    getQuiz, 
    createQuiz, 
    updateQuiz, 
    deleteQuiz, 
    updateQuizStatus 
} from "../controllers/kuisController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getQuiz);
router.post("/", upload.single('file'), createQuiz);

router.put("/:id", upload.single('file'), updateQuiz);
router.delete("/:id", deleteQuiz);
router.patch("/:id/status", updateQuizStatus);

export default router;