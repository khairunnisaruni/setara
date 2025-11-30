// backend_setara/models/Book.js
import db from "../config/db.js";

const Book = {
  create: (data, callback) => {
    const {
      title,
      author,
      description,
      link,
      kategori_id,
      added_by,
      status,
      gambar,
    } = data;

    const sql = `
      INSERT INTO rekomendasi_buku
      (title, author, description, link, kategori_id, added_by, status, gambar)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [title, author, description, link, kategori_id, added_by, status, gambar],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, { id: results.insertId, ...data });
      }
    );
  },
};

export default Book;
