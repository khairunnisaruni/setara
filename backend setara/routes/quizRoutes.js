// backend_setara/routes/quizRoutes.js
import express from "express";
import {
  getAllQuizzes,
  getApprovedQuizzes,
  createQuiz,
} from "../controllers/quizController.js";
import uploadKuis from "../middleware/uploadKuis.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllQuizzes);
router.get("/approved", getApprovedQuizzes);
router.post("/", protect, uploadKuis.single("file"), createQuiz);

export default router;
