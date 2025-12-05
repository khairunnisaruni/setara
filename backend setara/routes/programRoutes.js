// backend_setara/routes/programRoutes.js
import express from "express";
import {
  getApprovedPrograms,
  getAllPrograms,
  createProgram,
} from "../controllers/programController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Hanya program yang sudah di-approve admin
router.get("/approved", getApprovedPrograms);

// Semua program (opsional, untuk admin)
router.get("/", getAllPrograms);

// Tambah program baru
router.post("/", protect, createProgram);

export default router;
