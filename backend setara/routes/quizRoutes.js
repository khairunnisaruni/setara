// backend_setara/routes/quizRoutes.js
import express from "express";
import {
  getAllQuizzes,
  getApprovedQuizzes,
  createQuiz,
} from "../controllers/quizController.js";
import { 
    getQuiz, 
    createQuizs, 
    updateQuiz, 
    deleteQuiz, 
    updateQuizStatus 
} from "../controllers/kuisController.js";


const router = express.Router();

// GET /api/kuis -> semua kuis (opsional, untuk admin)
router.get("/", getAllQuizzes);

// GET /api/kuis/approved -> hanya kuis berstatus approved
router.get("/approved", getApprovedQuizzes);

router.get("/", getQuiz);
router.post("/", createQuizs);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.patch("/:id/status", updateQuizStatus);


// POST /api/kuis -> tambah kuis baru + upload gambar (field "file")
router.post("/", uploadKuis.single("file"), createQuiz);

export default router;
