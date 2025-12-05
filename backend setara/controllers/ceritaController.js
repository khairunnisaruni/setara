// controllers/ceritaController.js
import Cerita from "../models/Cerita.js";

export const getStories = (req, res) => {
    Cerita.getAll((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal ambil data cerita" });
        return res.json(data);
    });
};

export const createStory = (req, res) => {
    // Validasi sederhana
    if (!req.body.title || (!req.body.content && !req.body.description)) {
        return res.status(400).json({ error: "Judul dan Isi Cerita wajib diisi" });
    }

    const data = { ...req.body, user_id: 1 }; // Default Admin ID = 1

    Cerita.create(data, (err, result) => {
        if (err) {
            console.error("Error Create Cerita:", err);
            return res.status(500).json({ error: "Gagal menyimpan cerita" });
        }
        return res.status(201).json({ 
            message: "Cerita berhasil ditambahkan (Langsung Approved)", 
            id: result.insertId 
        });
    });
};

export const updateStory = (req, res) => {
    const id = req.params.id;
    Cerita.update(id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update cerita" });
        return res.json({ message: "Cerita berhasil diupdate", result });
    });
};

export const deleteStory = (req, res) => {
    const id = req.params.id;
    Cerita.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal menghapus cerita" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Data tidak ditemukan" });
        return res.json({ message: "Cerita berhasil dihapus" });
    });
};

export const updateStoryStatus = (req, res) => {
    const { status } = req.body;
    Cerita.updateStatus(req.params.id, status, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update status" });
        return res.json({ message: "Status cerita diubah", result });
    });
};