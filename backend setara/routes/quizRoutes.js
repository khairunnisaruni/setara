// backend_setara/routes/quizRoutes.js
import express from "express";
import {
  getAllQuizzes,
  getApprovedQuizzes,
  createQuiz,
} from "../controllers/quizController.js";
import uploadKuis from "../middleware/uploadKuis.js";

const router = express.Router();

// GET /api/kuis -> semua kuis (opsional, untuk admin)
router.get("/", getAllQuizzes);

// GET /api/kuis/approved -> hanya kuis berstatus approved
router.get("/approved", getApprovedQuizzes);

// POST /api/kuis -> tambah kuis baru + upload gambar (field "file")
router.post("/", uploadKuis.single("file"), createQuiz);

export default router;
