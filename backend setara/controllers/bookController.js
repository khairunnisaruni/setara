// backend_setara/controllers/bookController.js
import Book from "../models/Book.js";

export const createBook = (req, res) => {
  try {
    const { title, author, category, description, link } = req.body;

    if (!title || !author || !description || !link) {
      return res
        .status(400)
        .json({ message: "Judul, penulis, deskripsi, dan link wajib diisi." });
    }

    // mapping kategori form -> kategori_id di tabel
    // sementara: kalau ada logic tertentu, bisa diubah nanti
    let kategori_id = 1;
    if (category === "fiksi") kategori_id = 1;
    else if (category === "nonfiksi") kategori_id = 2;

    const added_by = 1; // sementara: ID user 1
    const status = "pending"; // bisa 'pending' dulu
    const gambar = null; // belum pakai upload file

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
