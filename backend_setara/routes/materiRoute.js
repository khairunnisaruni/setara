// routes/materiRoutes.js
import express from "express";
import { 
    getMaterials, 
    createMaterial, 
    updateMaterial, 
    deleteMaterial, 
    updateMaterialStatus 
} from "../controllers/materiController.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();

router.get("/", getMaterials);

// Field di form frontend kamu bernama 'file_material'
router.post("/", upload.single('file_material'), createMaterial);
router.put("/:id", upload.single('file_material'), updateMaterial);

router.delete("/:id", deleteMaterial);
router.patch("/:id/status", updateMaterialStatus);

export default router;