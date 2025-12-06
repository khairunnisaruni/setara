// routes/programRoutes.js
import express from "express";
import { 
    getPrograms, 
    createPrograms, 
    updateProgram, 
    deleteProgram, 
    updateProgramStatus 
} from "../controllers/programController.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();

router.get("/", getPrograms);

// Upload field name: 'poster' (sesuai frontend)
router.post("/", upload.single('poster_banner'), createPrograms);
router.put("/:id", upload.single('poster_banner'), updateProgram);

router.delete("/:id", deleteProgram);
router.patch("/:id/status", updateProgramStatus);

export default router;