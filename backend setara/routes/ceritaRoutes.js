// backend_setara/routes/ceritaRoutes.js
import express from "express";
import { createCerita, getApprovedCerita } from "../controllers/ceritaController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/approved", getApprovedCerita);
router.post("/", protect, createCerita);

export default router;
