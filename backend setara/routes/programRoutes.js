// backend_setara/routes/programRoutes.js
import express from "express";
import { createProgram, getAllPrograms } from "../controllers/programController.js";

const router = express.Router();

router.post("/", createProgram);
router.get("/", getAllPrograms);

export default router;
