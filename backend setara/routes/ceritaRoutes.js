// backend_setara/routes/ceritaRoutes.js
import express from "express";
import { createCerita, getApprovedCerita } from "../controllers/ceritaController.js";

const router = express.Router();

// GET /api/cerita/approved -> hanya yang sudah approved
router.get("/approved", getApprovedCerita);

// POST /api/cerita
router.post("/", createCerita);

export default router;
