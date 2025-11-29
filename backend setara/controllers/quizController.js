// backend setara/controllers/quizController.js
import db from "../config/db.js";

// GET /api/kuis
export const getAllQuizzes = (req, res) => {
  const sql = "SELECT * FROM kuis ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error mengambil data kuis:", err);
      return res.status(500).json({ message: "Gagal mengambil data kuis" });
    }
    res.json(results);
  });
};

// POST /api/kuis
export const createQuiz = (req, res) => {
  const { title, description, platform, link } = req.body;

  if (!title || !platform || !link) {
    return res
      .status(400)
      .json({ message: "Title, platform, dan link wajib diisi" });
  }

  const sql =
    "INSERT INTO kuis (title, description, platform, link, gambar, kategori_id, kategori_kelas_id, added_by) VALUES (?, ?, ?, ?, NULL, NULL, NULL, NULL)";
  const params = [title, description || null, platform, link];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error menyimpan kuis:", err);
      return res.status(500).send("Gagal menyimpan kuis");
    }

    return res.redirect("http://localhost:5173/edukasi-kuis");
  });
};
