// routes/dashboardRoutes.js
import express from "express";
import { getDashboardStats, getChartStats, getActivities } from "../controllers/dashboardController.js";

const router = express.Router();

// Ini route khusus dashboard
router.get("/", getDashboardStats);           // akses ke: /admin
router.get("/chart-stats", getChartStats);    // akses ke: /admin/chart-stats
router.get("/activities", getActivities);     // akses ke: /admin/activities

export default router;