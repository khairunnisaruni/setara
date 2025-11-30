// backend_setara/routes/materialRoutes.js
import express from "express";
import path from "path";
import db from "../config/db.js";

const router = express.Router();

// GET /api/materials/:id/download
router.get("/:id/download", (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT file_path, title FROM materi_multimedia WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil data materi." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Materi tidak ditemukan." });
    }

    const { file_path, title } = results[0];

    if (!file_path) {
      return res
        .status(404)
        .json({ message: "File untuk materi ini belum tersedia." });
    }

    const absolutePath = path.join(process.cwd(), file_path);

    res.download(absolutePath, title || "materi", (error) => {
      if (error) {
        console.error("Download error:", error);
        if (!res.headersSent) {
          res
            .status(500)
            .json({ message: "Gagal mengunduh file materi." });
        }
      }
    });
  });
});

export default router;
