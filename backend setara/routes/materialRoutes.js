// backend_setara/routes/materialRoutes.js
import express from "express";
import uploadMateri from "../middleware/uploadMateri.js";
import {
  createMateri,
  getApprovedMateri,
  downloadMateri,
} from "../controllers/materiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, uploadMateri.single("file"), createMateri);
router.get("/approved", getApprovedMateri);
router.get("/:id/download", downloadMateri);

export default router;
