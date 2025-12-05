// backend setara/routes/historyRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUserQuizHistory,
  getUserBookHistory,
  getUserMateriHistory,
  getUserCeritaHistory,
  getUserProgramHistory,
  getUserDonasiHistory,
} from "../controllers/historyController.js";

const router = express.Router();

// Kuis & Game Interaktif
router.get("/kuis", protect, getUserQuizHistory);

// Rekomendasi Buku
router.get("/buku", protect, getUserBookHistory);

// Materi Multimedia
router.get("/materi", protect, getUserMateriHistory);

// Cerita Lapangan
router.get("/cerita", protect, getUserCeritaHistory);

// Program
router.get("/program", protect, getUserProgramHistory);

// Donasi
router.get("/donasi", protect, getUserDonasiHistory);

export default router;
