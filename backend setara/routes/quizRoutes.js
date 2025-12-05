// backend_setara/routes/quizRoutes.js
import express from "express";
import {
  getAllQuizzes,
  getApprovedQuizzes,
  createQuiz,
  getMyQuizzes, // <- tambahan
} from "../controllers/quizController.js";

import uploadKuis from "../middleware/uploadKuis.js";
import { protect } from "../middleware/authMiddleware.js";

import { 
    getQuiz, 
    createQuizs, 
    updateQuiz, 
    deleteQuiz, 
    updateQuizStatus 
} from "../controllers/kuisController.js";



const router = express.Router();

// daftar semua kuis (misalnya untuk admin / halaman lain)
router.get("/", getAllQuizzes);

// kuis yang sudah approved (misalnya untuk ditampilkan publik)
router.get("/approved", getApprovedQuizzes);


// riwayat kuis milik user yang sedang login (dipakai di halaman Profile -> Riwayat Postingan -> Kuis)
router.get("/me", protect, getMyQuizzes);

// membuat kuis baru
router.post("/", protect, uploadKuis.single("file"), createQuiz);

router.get("/", getQuiz);
router.post("/", createQuizs);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);
router.patch("/:id/status", updateQuizStatus);


// POST /api/kuis -> tambah kuis baru + upload gambar (field "file")
router.post("/", uploadKuis.single("file"), createQuiz);


export default router;
