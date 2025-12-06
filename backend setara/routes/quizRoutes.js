import express from "express";
import {
  getAllQuizzes,
  getApprovedQuizzes,
  createQuiz,
} from "../controllers/quizController.js";
import uploadKuis from "../middleware/uploadKuis.js";

const router = express.Router();

router.get("/", getAllQuizzes);
router.get("/approved", getApprovedQuizzes);
router.post("/", uploadKuis.single("file"), createQuiz);

export default router;
