
// backend_setara/controllers/materiController.js
import db from "../config/db.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Materi from "../models/Materi.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== HELPER =====
const mapClassCategoryToId = (value) => {
  switch (value) {
    case "kelas-1":
      return 1;
    case "kelas-2":
      return 2;
    case "kelas-3":
      return 3;
    case "kelas-4":
      return 4;
    case "kelas-5":
      return 5;
    case "kelas-6":
      return 6;
    default:
      return null;
  }
};

const mapMaterialCategoryToId = (value) => {
  switch (value) {
    case "materi-utama":
      return 1;
    case "materi-pendukung":
      return 2;
    default:
      return null;
  }
};

const mapFileTypeFromBody = (type) => {
  if (!type) return null;
  const lower = type.toLowerCase();
  if (["pdf", "audio", "video"].includes(lower)) return lower;
  return null;
};

const mapFileTypeFromMime = (mimetype) => {
  if (!mimetype) return null;
  if (mimetype === "application/pdf") return "pdf";
  if (mimetype.startsWith("audio/")) return "audio";
  if (mimetype.startsWith("video/")) return "video";
  return null;
};


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

// ===== CREATE MATERI (UPLOAD) =====
export const createMateri = async (req, res) => {
  try {
    const {
      title,
      description,
      classCategory,
      materialCategory,
      fileType,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message:
          "File tidak terkirim ke server (cek FormData dan field name 'file')",
      });
    }

    const uploadedFile = req.file;
    const safeTitle = title && title.trim() ? title.trim() : "Tanpa Judul";

    let mappedFileType = mapFileTypeFromBody(fileType);
    if (!mappedFileType)
      mappedFileType = mapFileTypeFromMime(uploadedFile.mimetype);
    if (!mappedFileType) mappedFileType = "pdf";

    const kategoriKelasId = mapClassCategoryToId(classCategory);
    const kategoriId = mapMaterialCategoryToId(materialCategory);

    const uploadedBy = req.user.id; // user login
    const filePath = `/uploads/materi/${uploadedFile.filename}`;

    const sql = `
      INSERT INTO materi_multimedia
        (title, description, file_path, file_type,
         kategori_kelas_id, kategori_id, uploaded_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      safeTitle,
      description || null,
      filePath,
      mappedFileType,
      kategoriKelasId,
      kategoriId,
      uploadedBy,
    ];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("MYSQL ERROR insert materi_multimedia:", err);
        return res.status(500).json({
          message: "Gagal menyimpan materi",
          error: err.code || err.message,
        });
      }

      return res.status(201).json({
        message: "Materi berhasil ditambahkan",
        id: result.insertId,
        file_path: filePath,
      });
    });
  } catch (error) {
    console.error("Error createMateri (unexpected):", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// ===== LIST MATERI APPROVED =====
export const getApprovedMateri = (req, res) => {
  const sql = `
    SELECT
      id,
      title,
      description,
      file_path,
      file_type,
      kategori_kelas_id,
      kategori_id,
      status,
      approved_at
    FROM materi_multimedia
    WHERE status = 'approved'
    ORDER BY approved_at DESC, created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR getApprovedMateri:", err);
      return res.status(500).json({
        message: "Gagal mengambil materi",
        error: err.code || err.message,
      });
    }

    return res.json(rows);
  });
};

// ===== RIWAYAT MATERI USER (PROFILE) =====
export const getMyMateri = (req, res) => {
  const userId = req.user.id;
  const { status } = req.query;

  let sql = `
    SELECT
      id,
      title,
      description,
      file_path,
      file_type,
      kategori_kelas_id,
      kategori_id,
      status,
      created_at,
      approved_at
    FROM materi_multimedia
    WHERE uploaded_by = ?
  `;
  const params = [userId];

  if (status && status !== "all" && status !== "semua") {
    sql += " AND status = ?";
    params.push(status);
  }

  sql += " ORDER BY created_at DESC";

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR getMyMateri:", err);
      return res.status(500).json({
        message: "Gagal mengambil riwayat materi multimedia",
        error: err.code || err.message,
      });
    }

    return res.json(rows);
  });
};

// ===== DOWNLOAD FILE MATERI =====
export const downloadMateri = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT file_path, title, file_type, status
    FROM materi_multimedia
    WHERE id = ? AND status = 'approved'
  `;

  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR downloadMateri:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil data materi" });
    }

    if (!rows || rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Materi tidak ditemukan atau belum disetujui" });
    }

    const materi = rows[0];

    const relativePath =
      materi.file_path && materi.file_path.startsWith("/")
        ? materi.file_path.slice(1)
        : materi.file_path;

    const absolutePath = path.join(__dirname, "..", relativePath);

    if (!fs.existsSync(absolutePath)) {
      console.error("File tidak ditemukan di disk:", absolutePath);
      return res
        .status(404)
        .json({ message: "File tidak ditemukan di server" });
    }

    const extFromPath = path.extname(absolutePath);
    const extFromType =
      !extFromPath && materi.file_type
        ? `.${materi.file_type.toLowerCase()}`
        : "";
    const ext = extFromPath || extFromType || "";

    const baseName =
      (materi.title || path.basename(absolutePath, ext))
        .replace(/[\\\/:*?"<>|]/g, "_")
        .trim() || "materi";

    const downloadName = baseName + ext;

    res.download(absolutePath, downloadName, (downloadErr) => {
      if (downloadErr) {
        console.error("Error saat mengirim file:", downloadErr);
        if (!res.headersSent) {
          res.status(500).json({ message: "Gagal mengirim file" });
        }
      }
    });
  });
};
