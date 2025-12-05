// backend_setara/routes/materialRoutes.js
import express from "express";
import uploadMateri from "../middleware/uploadMateri.js";
import {
  createMateri,
  getApprovedMateri,
  downloadMateri,
} from "../controllers/materiController.js";

const router = express.Router();

// Upload materi
router.post("/", uploadMateri.single("file"), createMateri);

// Ambil hanya materi yang sudah approved
router.get("/approved", getApprovedMateri);

// Download file materi by id
router.get("/:id/download", downloadMateri);

export default router;
