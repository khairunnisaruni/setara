// models/Buku.js
import db from "../config/db.js";

const Buku = {
    getAll: (callback) => {
        const sql = `
            SELECT 
                rekomendasi_buku.*, 
                kategori.nama AS nama_kategori, 
                users.name AS nama_pengupload
            FROM rekomendasi_buku
            LEFT JOIN kategori ON rekomendasi_buku.kategori_id = kategori.id
            LEFT JOIN users ON rekomendasi_buku.added_by = users.id
            ORDER BY rekomendasi_buku.created_at DESC
        `;
        db.query(sql, callback);
    },

    create: (data, gambar, callback) => {
        const { title, author, description, link, kategori_id, added_by } = data;
        
        // Default Status = 'approved', dan set approved_at = NOW()
        const sql = `
            INSERT INTO rekomendasi_buku 
            (title, author, description, link, kategori_id, gambar, added_by, status, created_at, approved_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', NOW(), NOW())
        `;
        const values = [title, author, description, link, kategori_id, gambar, added_by];
        
        db.query(sql, values, callback);
    },

    update: (id, data, gambar, callback) => {
        const { title, author, description, link, kategori_id } = data;
        let sql, values;

        if (gambar) {
            // Update dengan gambar baru
            sql = `UPDATE rekomendasi_buku SET title=?, author=?, description=?, link=?, kategori_id=?, gambar=? WHERE id=?`;
            values = [title, author, description, link, kategori_id, gambar, id];
        } else {
            // Update tanpa ganti gambar
            sql = `UPDATE rekomendasi_buku SET title=?, author=?, description=?, link=?, kategori_id=? WHERE id=?`;
            values = [title, author, description, link, kategori_id, id];
        }
        db.query(sql, values, callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM rekomendasi_buku WHERE id = ?";
        db.query(sql, [id], callback);
    },

    updateStatus: (id, status, callback) => {
        const sql = "UPDATE rekomendasi_buku SET status = ?, approved_at = NOW() WHERE id = ?";
        db.query(sql, [status, id], callback);
    }
};

export default Buku;