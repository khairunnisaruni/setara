// backend_setara/controllers/bookController.js
import Book from "../models/Book.js";
import db from "../config/db.js";

// CREATE
export const createBook = (req, res) => {
  try {
    const { title, author, category, description, link } = req.body;

    if (!title || !author || !description || !link) {
      return res
        .status(400)
        .json({ message: "Judul, penulis, deskripsi, dan link wajib diisi." });
    }

    let kategori_id = 1;
    if (category === "fiksi") kategori_id = 1;
    else if (category === "nonfiksi") kategori_id = 2;

    const added_by = req.user.id; // user yang menambah rekomendasi buku
    const status = "pending";
    const gambar = null;

    Book.create(
      { title, author, description, link, kategori_id, added_by, status, gambar },
      (err, newBook) => {
        if (err) {
          console.error("Error insert book:", err);
          return res
            .status(500)
            .json({ message: "Gagal menyimpan buku." });
        }

        return res
          .status(201)
          .json({ message: "Buku berhasil disimpan.", book: newBook });
      }
    );
  } catch (error) {
    console.error("createBook error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

/**
 * GET /api/books/approved
 */
export const getApprovedBooks = (req, res) => {
  const sql = `
    SELECT
      id,
      title,
      author,
      gambar,
      description,
      link,
      kategori_id,
      status,
      approved_at
    FROM rekomendasi_buku
    WHERE status = 'approved'
    ORDER BY approved_at DESC, created_at DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error mengambil buku approved:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil buku approved" });
    }

    return res.json(rows);
  });
};
