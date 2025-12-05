// backend_setara/routes/agendaRoutes.js
import express from "express";
import { createAgenda } from "../controllers/agendaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/agenda
// Wajib pakai protect supaya req.user terisi dari JWT
router.post("/", protect, createAgenda);

export default router;
