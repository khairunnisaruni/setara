// routes/bukuRoutes.js
import express from "express";
import { 
    getBooks, 
    createBook, 
    updateBook, 
    deleteBook, 
    updateBookStatus 
} from "../controllers/bukuController.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();

// GET semua buku
router.get("/", getBooks);

// POST tambah buku (pakai upload.single 'gambar')
router.post("/", upload.single('gambar'), createBook);

// PUT update buku
router.put("/:id", upload.single('gambar'), updateBook);

// DELETE hapus buku
router.delete("/:id", deleteBook);

// PATCH update status
router.patch("/:id/status", updateBookStatus);

export default router;