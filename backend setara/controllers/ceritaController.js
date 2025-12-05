
// backend_setara/controllers/ceritaController.js
import Cerita from "../models/Cerita.js";


export const getStories = (req, res) => {
    Cerita.getAlls((err, data) => {
        if (err) return res.status(500).json({ error: "Gagal ambil data cerita" });
        return res.json(data);
    });
};

export const createStory = (req, res) => {
    // Validasi sederhana
    if (!req.body.title || (!req.body.content && !req.body.description)) {
        return res.status(400).json({ error: "Judul dan Isi Cerita wajib diisi" });
    }

    const data = { ...req.body, user_id: 1 }; // Default Admin ID = 1

    Cerita.creates(data, (err, result) => {
        if (err) {
            console.error("Error Create Cerita:", err);
            return res.status(500).json({ error: "Gagal menyimpan cerita" });
        }
        return res.status(201).json({ 
            message: "Cerita berhasil ditambahkan (Langsung Approved)", 
            id: result.insertId 
        });
    });
};

export const updateStory = (req, res) => {
    const id = req.params.id;
    Cerita.updates(id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update cerita" });
        return res.json({ message: "Cerita berhasil diupdate", result });
    });
};

export const deleteStory = (req, res) => {
    const id = req.params.id;
    Cerita.deletes(id, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal menghapus cerita" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Data tidak ditemukan" });
        return res.json({ message: "Cerita berhasil dihapus" });
    });
};

export const updateStoryStatus = (req, res) => {
    const { status } = req.body;
    Cerita.updateStatuss(req.params.id, status, (err, result) => {
        if (err) return res.status(500).json({ error: "Gagal update status" });
        return res.json({ message: "Status cerita diubah", result });
    });
};

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
