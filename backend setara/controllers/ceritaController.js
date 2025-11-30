// backend_setara/controllers/ceritaController.js
import Cerita from "../models/Cerita.js";

export const createCerita = (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Judul dan isi cerita wajib diisi." });
    }

    const user_id = 1;      
    const status = "pending";
    const approved_at = null; 

    Cerita.create(
      { title, content, user_id, status, approved_at },
      (err, newCerita) => {
        if (err) {
          console.error("Error insert cerita:", err);
          return res
            .status(500)
            .json({ message: "Gagal menyimpan cerita." });
        }

        return res.status(201).json({
          message: "Cerita berhasil disimpan.",
          cerita: newCerita,
        });
      }
    );
  } catch (error) {
    console.error("createCerita error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
