// backend_setara/routes/ceritaRoutes.js
import express from "express";

import {
  createCerita,
  getApprovedCerita,
  getMyCerita,
} from "../controllers/ceritaController.js";
import { protect } from "../middleware/authMiddleware.js";

import { 
    getStories, 
    createStory, 
    updateStory, 
    deleteStory, 
    updateStoryStatus 
} from "../controllers/ceritaController.js";


const router = express.Router();

// cerita approved (untuk publik)
router.get("/approved", getApprovedCerita);

// riwayat cerita lapangan milik user login (dipakai di Profile -> Cerita Lapangan)
router.get("/me", protect, getMyCerita);

// buat cerita baru
router.post("/", protect, createCerita);

router.get("/", getStories);
router.post("/", createStory);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);
router.patch("/:id/status", updateStoryStatus);

export default router;
