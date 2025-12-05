// routes/ceritaRoutes.js
import express from "express";
import { 
    getStories, 
    createStory, 
    updateStory, 
    deleteStory, 
    updateStoryStatus 
} from "../controllers/ceritaController.js";

const router = express.Router();

router.get("/", getStories);
router.post("/", createStory);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);
router.patch("/:id/status", updateStoryStatus);

export default router;