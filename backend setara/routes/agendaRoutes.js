// backend_setara/routes/agendaRoutes.js
import express from "express";
import { createAgenda, getAllAgenda } from "../controllers/agendaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tambah agenda baru (butuh login, supaya user_id terisi)
router.post("/", protect, createAgenda);

// 🔹 Ambil SEMUA agenda (global, semua user) – titik oranye pakai ini
router.get("/all", getAllAgenda);

export default router;
