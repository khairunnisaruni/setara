// backend_setara/routes/ceritaRoutes.js
import express from "express";
import {
  createCerita,
  getApprovedCerita,
  getMyCerita,
} from "../controllers/ceritaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// cerita approved (untuk publik)
router.get("/approved", getApprovedCerita);

// riwayat cerita lapangan milik user login (dipakai di Profile -> Cerita Lapangan)
router.get("/me", protect, getMyCerita);

// buat cerita baru
router.post("/", protect, createCerita);

export default router;
