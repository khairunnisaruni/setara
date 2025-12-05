// backend_setara/routes/programRoutes.js
import express from "express";
import {
  getApprovedPrograms,
  getAllPrograms,
  createProgram,
  getMyPrograms,
} from "../controllers/programController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Program yang sudah di-approve admin (untuk publik)
router.get("/approved", getApprovedPrograms);

// Riwayat program milik user login (tab Profile -> Program)
router.get("/me", protect, getMyPrograms);

// Semua program (misal untuk admin)
router.get("/", getAllPrograms);

// Tambah program baru (butuh login)
router.post("/", protect, createProgram);

export default router;
