// backend_setara/controllers/programController.js
import db from "../config/db.js";

/**
 * GET /api/programs/approved
 */
export const getApprovedPrograms = (req, res) => {
  const sql = `
    SELECT
      id,
      judul_program,
      penyelenggara,
      jenis_program,
      lokasi_program,
      deskripsi_program,
      periode_tanggal,
      deadline_pendaftaran,
      status_program,
      tautan_sumber_resmi,
      poster_banner,
      added_by,
      status,
      approved_at,
      created_at
    FROM programs
    WHERE status = 'approved'
    ORDER BY approved_at DESC, created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error mengambil program approved:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil program approved" });
    }

    return res.json(rows);
  });
};

/**
 * GET /api/programs
 */
export const getAllPrograms = (req, res) => {
  const sql = `
    SELECT
      id,
      judul_program,
      penyelenggara,
      jenis_program,
      lokasi_program,
      deskripsi_program,
      periode_tanggal,
      deadline_pendaftaran,
      status_program,
      tautan_sumber_resmi,
      poster_banner,
      added_by,
      status,
      approved_at,
      created_at
    FROM programs
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error mengambil semua program:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil data program" });
    }

    return res.json(rows);
  });
};

/**
 * POST /api/programs
 */
export const createProgram = (req, res) => {
  try {
    const {
      title,
      organizer,
      type,
      location,
      description,
      period,
      deadline,
      statusProgram,
      sourceLink,
    } = req.body;

    if (!title || !organizer || !type || !sourceLink) {
      return res.status(400).json({
        message:
          "Judul, penyelenggara, jenis program, dan link sumber wajib diisi.",
      });
    }

    const poster_banner = null;
    const added_by = req.user.id; // dari token user yang login
    const status = "pending";

    const sql = `
      INSERT INTO programs (
        judul_program,
        penyelenggara,
        jenis_program,
        lokasi_program,
        deskripsi_program,
        periode_tanggal,
        deadline_pendaftaran,
        status_program,
        tautan_sumber_resmi,
        poster_banner,
        added_by,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      title,
      organizer,
      type,
      location || null,
      description || null,
      period || null,
      deadline || null,
      statusProgram || "akan datang",
      sourceLink,
      poster_banner,
      added_by,
      status,
    ];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error insert program:", err);
        return res.status(500).json({ message: "Gagal menyimpan program" });
      }

      return res.status(201).json({
        message: "Program berhasil disimpan (menunggu persetujuan admin).",
        id: result.insertId,
      });
    });
  } catch (error) {
    console.error("createProgram error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
