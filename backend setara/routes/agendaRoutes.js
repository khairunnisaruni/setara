// backend_setara/routes/agendaRoutes.js
import express from "express";
import { createAgenda } from "../controllers/agendaController.js";

const router = express.Router();

// POST /api/agenda
router.post("/", createAgenda);

export default router;
