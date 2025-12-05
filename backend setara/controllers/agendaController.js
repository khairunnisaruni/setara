// backend_setara/controllers/agendaController.js
import Agenda from "../models/Agenda.js";

export const createAgenda = (req, res) => {
  try {
    const { title, description, date, waktu, location } = req.body;

    if (!title || !description || !date || !waktu || !location) {
      return res.status(400).json({
        message: "Judul, deskripsi, tanggal, waktu, dan lokasi wajib diisi.",
      });
    }

    const user_id = 1;

    Agenda.create(
      { title, description, date, waktu, location, user_id },
      (err, newAgenda) => {
        if (err) {
          console.error("Error insert agenda:", err);
          return res.status(500).json({ message: "Gagal menyimpan agenda." });
        }

        return res
          .status(201)
          .json({ message: "Agenda berhasil disimpan.", agenda: newAgenda });
      }
    );
  } catch (error) {
    console.error("createAgenda error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
