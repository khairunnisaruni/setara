// controllers/donasiController.js
import db from "../config/db.js";

// CREATE: simpan donasi baru (sudah ada)
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

// READ: ambil semua donasi (untuk admin, dll)
const getDonasi = (req, res) => {
  const sql = `
    SELECT id, title, kategori, penerima_manfaat, description,
           poster, dampak, link, penanggung_jawab, contact_person,
           status, created_at, approved_at
    FROM donasi
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Gagal ambil donasi:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil data donasi" });
    }
    return res.json(rows);
  });
};

// READ: hanya donasi yang sudah approved
const getApprovedDonasi = (req, res) => {
  const sql = `
    SELECT id, title, kategori, penerima_manfaat, description,
           poster, dampak, link, penanggung_jawab, contact_person,
           status, created_at, approved_at
    FROM donasi
    WHERE status = 'approved'
    ORDER BY approved_at DESC, created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Gagal ambil donasi approved:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil donasi approved" });
    }
    return res.json(rows);
  });
};

export { createDonasi, getDonasi, getApprovedDonasi };
export default createDonasi;
