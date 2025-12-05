// controllers/bukuController.js
import Buku from "../models/Buku.js";

export const getBooks = (req, res) => {
    Buku.getAll((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal ambil data buku" });
        return res.json(data);
    });
};

export const createBook = (req, res) => {
    // Ambil nama file gambar jika ada upload
    const gambar = req.file ? req.file.filename : null;
    const data = { ...req.body, added_by: 1 }; // Default Admin ID = 1

    Buku.create(data, gambar, (err, result) => {
        if (err) {
            console.error("Error POST Buku:", err);
            return res.status(500).json({ error: "Gagal tambah buku" });
        }
        return res.json({ message: "Buku berhasil ditambahkan", result });
    });
};

export const updateBook = (req, res) => {
    const id = req.params.id;
    const gambar = req.file ? req.file.filename : null;

    Buku.update(id, req.body, gambar, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update buku" });
        return res.json({ message: "Buku berhasil diupdate", result });
    });
};

export const deleteBook = (req, res) => {
    const id = req.params.id;
    Buku.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal hapus buku" });
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Buku tidak ditemukan" });
        }
        return res.json({ message: "Buku berhasil dihapus", result });
    });
};

export const updateBookStatus = (req, res) => {
    const { status } = req.body;
    Buku.updateStatus(req.params.id, status, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update status" });
        return res.json({ message: "Status buku berhasil diubah", result });
    });
};