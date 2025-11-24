// backend_setara/routes/ceritaRoutes.js
import express from "express";
import { createCerita } from "../controllers/ceritaController.js";

const router = express.Router();

// POST /api/cerita
router.post("/", createCerita);

export default router;
