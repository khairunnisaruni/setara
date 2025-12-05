// backend_setara/controllers/materiController.js
import db from "../config/db.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

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

// ===== CREATE MATERI (UPLOAD) =====
export const createMateri = async (req, res) => {
  try {
    console.log("==== REQUEST MATERI ====");
    console.log("HEADERS content-type:", req.headers["content-type"]);
    console.log("BODY:", req.body);
    console.log("FILE (req.file):", req.file);

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
    const uploadedBy = req.user.id; // user yang upload materi

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

    console.log("SQL:", sql);
    console.log("PARAMS:", params);

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error("MYSQL ERROR insert materi_multimedia:", err);
        return res.status(500).json({
          message: "Gagal menyimpan materi",
          error: err.code || err.message,
        });
      }

      console.log("INSERT OK, ID:", result.insertId);

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
      return res
        .status(500)
        .json({ message: "Gagal mengambil materi", error: err.code || err.message });
    }

    return res.json(rows);
  });
};

// ===== DOWNLOAD FILE MATERI =====
export const downloadMateri = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT file_path, title, status
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

    const downloadName = materi.title || path.basename(absolutePath);

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
