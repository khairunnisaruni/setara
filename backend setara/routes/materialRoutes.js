// backend_setara/routes/materialRoutes.js
import express from "express";
import uploadMateri from "../middleware/uploadMateri.js";
import {
  createMateri,
  getApprovedMateri,
  downloadMateri,
  getMyMateri,
} from "../controllers/materiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// upload materi baru
router.post("/", protect, uploadMateri.single("file"), createMateri);

// materi approved (untuk publik)
router.get("/approved", getApprovedMateri);

// riwayat materi multimedia milik user login
router.get("/me", protect, getMyMateri);

// download file materi approved
router.get("/:id/download", downloadMateri);

export default router;
