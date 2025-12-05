
// backend_setara/controllers/programController.js
import db from "../config/db.js";


export const getPrograms = (req, res) => {
    Program.getAlls((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal ambil data program" });
        return res.json(data);
    });
};

export const createPrograms = (req, res) => {
    const posterBanner = req.file ? req.file.filename : null;
    const data = { ...req.body, added_by: 1 }; // Default Admin ID = 1

    Program.creates(data, posterBanner, (err, result) => {
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

    Program.updates(id, req.body, posterBanner, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update program" });
        return res.json({ message: "Program berhasil diupdate", result });
    });
};

export const deleteProgram = (req, res) => {
    Program.deletes(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal hapus program" });
        return res.json({ message: "Program berhasil dihapus", result });
    });
};

export const updateProgramStatus = (req, res) => {
    const { status } = req.body;
    Program.updateStatuss(req.params.id, status, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update status" });
        return res.json({ message: "Status program berhasil diubah", result });
    });
};

const mapProgramTypeToJenis = (programType) => {
  switch (programType) {
    case "volunteer":
      return "Volunteer";
    case "pengabdian":
      return "Pengabdian Masyarakat";
    case "beasiswa":
      return "Beasiswa";
    default:
      return "Volunteer";
  }
/**
 * GET /api/programs/approved
 * Ambil semua program yang sudah disetujui admin (status = 'approved')
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
 * Ambil semua program (misalnya untuk admin)
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
 * Tambah program baru (dari form di HeaderProgramSection)
 */
export const createProgram = (req, res) => {
  try {
    const {
      title,          // judul program
      organizer,      // penyelenggara
      type,           // jenis program (Volunteer / Beasiswa / dll)
      location,       // lokasi_program
      description,    // deskripsi_program
      period,         // periode_tanggal
      deadline,       // deadline_pendaftaran
      statusProgram,  // status_program (akan datang / sedang dibuka / selesai)
      sourceLink,     // tautan_sumber_resmi
    } = req.body;

    // Validasi sederhana
    if (!title || !organizer || !type || !sourceLink) {
      return res.status(400).json({
        message:
          "Judul, penyelenggara, jenis program, dan link sumber wajib diisi.",
      });
    }

    const poster_banner = null; // bisa diisi upload nanti
    const added_by = 1;         // sementara hardcode
    const status = "pending";   // butuh persetujuan admin

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
        return res
          .status(500)
          .json({ message: "Gagal menyimpan program" });
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
