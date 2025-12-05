// backend_setara/routes/bookRoutes.js
import express from "express";
import {
  createBook,
  getApprovedBooks,
  getMyBooks,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";
import uploadBuku from "../middleware/uploadBuku.js";

const router = express.Router();

// buku approved (untuk publik)
router.get("/approved", getApprovedBooks);

// riwayat rekomendasi buku milik user login
router.get("/me", protect, getMyBooks);

// buat rekomendasi buku baru (dengan upload sampul buku)
// field file di form: "sampul"
router.post("/", protect, uploadBuku.single("sampul"), createBook);

export default router;
