// backend_setara/controllers/agendaController.js
import Agenda from "../models/Agenda.js";

// POST /api/agenda  -> simpan agenda baru
export const createAgenda = (req, res) => {
  try {
    console.log("=== CREATE AGENDA ===");
    console.log("BODY:", req.body);
    console.log("USER DARI TOKEN:", req.user);

    const { title, description, date, waktu, location } = req.body;

    if (!title || !date || !waktu || !location) {
      return res.status(400).json({
        message: "Judul, tanggal, waktu, dan lokasi wajib diisi.",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message:
          "User belum terautentikasi. Pastikan token dikirim dan route memakai middleware protect.",
      });
    }

    const user_id = req.user.id;

    Agenda.create(
      {
        title,
        description: description || "",
        date,
        waktu,
        location,
        user_id,
      },
      (err, newAgenda) => {
        if (err) {
          console.error("Error insert agenda:", err);
          return res
            .status(500)
            .json({ message: "Gagal menyimpan agenda." });
        }

        return res.status(201).json({
          message: "Agenda berhasil disimpan.",
          agenda: newAgenda,
        });
      }
    );
  } catch (error) {
    console.error("createAgenda error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

// GET /api/agenda/all  -> semua agenda global
export const getAllAgenda = (req, res) => {
  try {
    Agenda.getAll((err, rows) => {
      if (err) {
        console.error("Error ambil agenda:", err);
        return res
          .status(500)
          .json({ message: "Gagal mengambil data agenda." });
      }

      return res.json(rows);
    });
  } catch (error) {
    console.error("getAllAgenda error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
