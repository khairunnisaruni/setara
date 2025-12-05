// controllers/materiController.js
import Materi from "../models/Materi.js";

export const getMaterials = (req, res) => {
    Materi.getAll((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal ambil data materi" });
        return res.json(data);
    });
};

export const createMaterial = (req, res) => {
    const { file_type, youtube_link } = req.body;
    let file_path = null;

    // LOGIKA PENTING:
    // Jika tipe Video -> Ambil link youtube
    // Jika tipe Lain -> Ambil nama file dari upload multer
    if (file_type === 'video') {
        file_path = youtube_link;
    } else {
        file_path = req.file ? req.file.filename : null;
    }

    const data = { ...req.body, uploaded_by: 1 }; // Default Admin ID = 1

    Materi.create(data, file_path, (err, result) => {
        if (err) {
            console.error("Error Create Materi:", err);
            return res.status(500).json({ error: "Gagal tambah materi" });
        }
        return res.json({ message: "Materi berhasil ditambahkan", result });
    });
};

export const updateMaterial = (req, res) => {
    const id = req.params.id;
    const { file_type, youtube_link } = req.body;
    let file_path = null;

    // Cek apakah ada update file/link
    if (file_type === 'video') {
        file_path = youtube_link;
    } else if (req.file) {
        file_path = req.file.filename;
    }

    Materi.update(id, req.body, file_path, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update materi" });
        return res.json({ message: "Materi berhasil diupdate", result });
    });
};

export const deleteMaterial = (req, res) => {
    Materi.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal hapus materi" });
        return res.json({ message: "Materi berhasil dihapus" });
    });
};

export const updateMaterialStatus = (req, res) => {
    const { status } = req.body;
    Materi.updateStatus(req.params.id, status, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update status" });
        return res.json({ message: "Status materi berhasil diubah", result });
    });
};