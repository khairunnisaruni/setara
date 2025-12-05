import db from "../config/db.js";

export const getCategories = (req, res) => {
    const sql = "SELECT * FROM kategori"; // Pastikan nama tabel benar
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

export const getClassCategories = (req, res) => {
    const sql = "SELECT * FROM kategori_kelas"; // Pastikan nama tabel benar
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};