// routes/programRoutes.js
import express from "express";
import { 
    getPrograms, 
    createProgram, 
    updateProgram, 
    deleteProgram, 
    updateProgramStatus 
} from "../controllers/programController.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();

router.get("/", getPrograms);

// Upload field name: 'poster' (sesuai frontend)
router.post("/", upload.single('poster'), createProgram);
router.put("/:id", upload.single('poster'), updateProgram);

router.delete("/:id", deleteProgram);
router.patch("/:id/status", updateProgramStatus);

export default router;