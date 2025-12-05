// controllers/programController.js
import Program from "../models/Program.js";

export const getPrograms = (req, res) => {
    Program.getAll((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal ambil data program" });
        return res.json(data);
    });
};

export const createProgram = (req, res) => {
    const posterBanner = req.file ? req.file.filename : null;
    const data = { ...req.body, added_by: 1 }; // Default Admin ID = 1

    Program.create(data, posterBanner, (err, result) => {
        if (err) {
            console.error("Error Create Program:", err);
            return res.status(500).json({ error: "Gagal tambah program" });
        }
        return res.json({ message: "Program berhasil ditambahkan", result });
    });
};

export const updateProgram = (req, res) => {
    const id = req.params.id;
    const posterBanner = req.file ? req.file.filename : null;

    Program.update(id, req.body, posterBanner, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update program" });
        return res.json({ message: "Program berhasil diupdate", result });
    });
};

export const deleteProgram = (req, res) => {
    Program.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal hapus program" });
        return res.json({ message: "Program berhasil dihapus", result });
    });
};

export const updateProgramStatus = (req, res) => {
    const { status } = req.body;
    Program.updateStatus(req.params.id, status, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update status" });
        return res.json({ message: "Status program berhasil diubah", result });
    });
};