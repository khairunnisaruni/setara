// backend_setara/controllers/donasiController.js
import db from "../config/db.js";

// CREATE: simpan donasi baru
export const createDonasi = (req, res) => {
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
  const added_by = req.user.id; // user yang menambah donasi
  const status = "pending";     // default, menunggu approve admin

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
       added_by,
       status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    added_by,
    status,
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

// READ: ambil semua donasi (misalnya untuk admin)
export const getDonasi = (req, res) => {
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

// READ: hanya donasi yang sudah approved (halaman publik)
export const getApprovedDonasi = (req, res) => {
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

// READ: riwayat donasi milik user login (Profile -> Donasi)
/**
 * GET /api/donasi/me
 * Optional: ?status=approved | pending | rejected | all
 */
export const getMyDonasi = (req, res) => {
  const userId = req.user.id;
  const { status } = req.query;

  let sql = `
    SELECT id, title, kategori, penerima_manfaat, description,
           poster, dampak, link, penanggung_jawab, contact_person,
           status, created_at, approved_at
    FROM donasi
    WHERE added_by = ?
  `;
  const params = [userId];

  if (status && status !== "all" && status !== "semua") {
    sql += " AND status = ?";
    params.push(status);
  }

  sql += " ORDER BY created_at DESC";

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error("Gagal ambil riwayat donasi:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil riwayat donasi" });
    }
    return res.json(rows);
  });
};
