
import Donasi from "../models/Donasi.js";

import db from "../config/db.js";

// CREATE: simpan donasi baru
const createDonasi = (req, res) => {
  const {
    title,
    category,
    recipient,
    description,
    impact,
    link,
    responsible,
    contact,
  } = req.body;

  const posterFile = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO donasi
      (title,
       kategori,
       penerima_manfaat,
       description,
       poster,
       dampak,
       link,
       penanggung_jawab,
       contact_person,
       added_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    category,
    recipient,
    description,
    posterFile,
    impact,
    link,
    responsible,
    contact,
    null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Gagal insert donasi:", err);
      return res.status(500).json({ message: "Gagal menyimpan donasi" });
    }

    return res.status(201).json({
      message: "Donasi berhasil dibuat",
      id: result.insertId,
    });
  });
};

// READ: ambil semua donasi
const getDonasi = (req, res) => {
  const sql = `
    SELECT id, title, kategori, penerima_manfaat, description,
           poster, dampak, link, penanggung_jawab, contact_person,
           status, created_at
    FROM donasi
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Gagal ambil donasi:", err);
      return res.status(500).json({ message: "Gagal mengambil data donasi" });
    }
    return res.json(rows);
  });
};

export const getDonations = (req, res) => {
    Donasi.getAll((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal mengambil data" });
        return res.json(data);
    });
};

export const createDonation = (req, res) => {
    const poster = req.file ? req.file.filename : null;
    // Hardcode added_by = 1 (Admin) sementara
    const data = { ...req.body, added_by: 1 };

    Donasi.create(data, poster, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Gagal menambah data" });
        }
        return res.json({ message: "Donasi berhasil ditambahkan", result });
    });
};

export const updateDonation = (req, res) => {
    const id = req.params.id;
    const poster = req.file ? req.file.filename : null;

    Donasi.update(id, req.body, poster, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update data" });
        return res.json({ message: "Donasi berhasil diupdate", result });
    });
};

export const deleteDonation = (req, res) => {
    const id = req.params.id;
    Donasi.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal menghapus data" });
        return res.json({ message: "Donasi berhasil dihapus", result });
    });
};

export const updateDonationStatus = (req, res) => {
    const { status } = req.body;
    const id = req.params.id;

    Donasi.updateStatus(id, status, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update status" });
        return res.json({ message: "Status donasi diubah" });
    });
};

export { createDonasi, getDonasi };
export default createDonasi;
