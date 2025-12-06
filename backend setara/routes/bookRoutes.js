// backend_setara/routes/bookRoutes.js
import express from "express";
import { createBook, getApprovedBooks } from "../controllers/bookController.js";

const router = express.Router();

// Ambil buku yang sudah di-approve admin
// GET /api/books/approved
router.get("/approved", getApprovedBooks);

// POST /api/books
router.post("/", createBook);

export default router;