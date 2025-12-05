// backend_setara/routes/notificationRoutes.js
import express from "express";
import { getUserNotifications } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/notifications
router.get("/", protect, getUserNotifications);

export default router;
