// backend_setara/routes/ceritaRoutes.js
import express from "express";
import { createCerita, getApprovedCerita } from "../controllers/ceritaController.js";
import { 
    getStories, 
    createStory, 
    updateStory, 
    deleteStory, 
    updateStoryStatus 
} from "../controllers/ceritaController.js";

const router = express.Router();

// GET /api/cerita/approved -> hanya yang sudah approved
router.get("/approved", getApprovedCerita);

// POST /api/cerita
router.post("/", createCerita);

router.get("/", getStories);
router.post("/", createStory);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);
router.patch("/:id/status", updateStoryStatus);

export default router;
