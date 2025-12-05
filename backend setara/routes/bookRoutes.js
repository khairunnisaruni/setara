// backend_setara/routes/bookRoutes.js
import express from "express";
import { createBook, getApprovedBooks } from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/approved", getApprovedBooks);
router.post("/", protect, createBook);

export default router;
