// backend_setara/routes/bookRoutes.js
import express from "express";
import { createBook, getApprovedBooks } from "../controllers/bookController.js";
import { 
    getBooks, 
    createBooks, 
    updateBook, 
    deleteBook, 
    updateBookStatus 
} from "../controllers/bukuController.js";


const router = express.Router();

// Ambil buku yang sudah di-approve admin
// GET /api/books/approved
router.get("/approved", getApprovedBooks);

// POST /api/books
router.post("/", createBook);

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
