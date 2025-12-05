// backend_setara/routes/bookRoutes.js
import express from "express";

import {
  createBook,
  getApprovedBooks,
  getMyBooks,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";
import uploadBuku from "../middleware/uploadBuku.js";

import { createBook, getApprovedBooks } from "../controllers/bookController.js";
import { 
    getBooks, 
    createBooks, 
    updateBook, 
    deleteBook, 
    updateBookStatus 
} from "../controllers/bukuController.js";



const router = express.Router();

// buku approved (untuk publik)
router.get("/approved", getApprovedBooks);

// riwayat rekomendasi buku milik user login
router.get("/me", protect, getMyBooks);

// buat rekomendasi buku baru (dengan upload sampul buku)
// field file di form: "sampul"
router.post("/", protect, uploadBuku.single("sampul"), createBook);

router.get("/", getBooks);

// POST tambah buku (pakai upload.single 'gambar')
router.post("/", upload.single('gambar'), createBooks);

// PUT update buku
router.put("/:id", upload.single('gambar'), updateBook);

// DELETE hapus buku
router.delete("/:id", deleteBook);

// PATCH update status
router.patch("/:id/status", updateBookStatus);

export default router;
