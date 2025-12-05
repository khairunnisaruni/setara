// controllers/infoController.js
import Info from "../models/Info.js";

export const getInfo = (req, res) => {
    Info.getAll((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal ambil data panduan" });
        return res.json(data);
    });
};

export const createInfo = (req, res) => {
    Info.create(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal tambah panduan" });
        return res.json({ message: "Panduan berhasil ditambahkan", result });
    });
};

export const updateInfo = (req, res) => {
    Info.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update panduan" });
        return res.json({ message: "Panduan berhasil diupdate", result });
    });
};

export const deleteInfo = (req, res) => {
    Info.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal hapus panduan" });
        return res.json({ message: "Panduan berhasil dihapus", result });
    });
};