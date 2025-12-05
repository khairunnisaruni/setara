// controllers/quizController.js
import Kuis from "../models/Kuis.js";

export const getQuiz = (req, res) => {
    Kuis.getAll((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal ambil data kuis" });
        return res.json(data);
    });
};

export const createQuiz = (req, res) => {
    const data = { ...req.body, added_by: 1 }; // Default Admin ID = 1

    Kuis.create(data, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal tambah kuis" });
        return res.json({ message: "Kuis berhasil ditambahkan", result });
    });
};

export const updateQuiz = (req, res) => {
    const id = req.params.id;
    Kuis.update(id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update kuis" });
        return res.json({ message: "Kuis berhasil diupdate", result });
    });
};

export const deleteQuiz = (req, res) => {
    const id = req.params.id;
    Kuis.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal hapus kuis" });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Kuis tidak ditemukan" });
        return res.json({ message: "Quiz berhasil dihapus", result });
    });
};

export const updateQuizStatus = (req, res) => {
    const { status } = req.body;
    Kuis.updateStatus(req.params.id, status, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update status" });
        return res.json({ message: "Status kuis berhasil diubah", result });
    });
};