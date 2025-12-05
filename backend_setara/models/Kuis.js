// models/Kuis.js
import db from "../config/db.js";

const Kuis = {
    getAll: (callback) => {
        const sql = `
            SELECT 
                kuis.*, 
                kategori.nama AS nama_kategori, 
                kategori_kelas.nama AS nama_kelas,
                users.name AS nama_pengupload  
            FROM kuis 
            LEFT JOIN kategori ON kuis.kategori_id = kategori.id 
            LEFT JOIN kategori_kelas ON kuis.kategori_kelas_id = kategori_kelas.id
            LEFT JOIN users ON kuis.added_by = users.id 
            ORDER BY kuis.created_at DESC
        `;
        db.query(sql, callback);
    },

    create: (data, callback) => {
        const { title, description, platform, link, kategori_id, kategori_kelas_id, added_by } = data;

        // Kita set default status = 'approved' agar langsung muncul
        const sql = `
            INSERT INTO kuis 
            (title, description, platform, link, kategori_id, kategori_kelas_id, added_by, status, approved_at, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', NOW(), NOW())
        `;

        const values = [title, description, platform, link, kategori_id, kategori_kelas_id, added_by];
        db.query(sql, values, callback);
    },

    update: (id, data, callback) => {
        const { title, description, platform, link, kategori_id, kategori_kelas_id } = data;

        const sql = `UPDATE kuis SET 
                     title = ?, 
                     description = ?, 
                     platform = ?, 
                     link = ?, 
                     kategori_id = ?, 
                     kategori_kelas_id = ? 
                     WHERE id = ?`;

        const values = [title, description, platform, link, kategori_id, kategori_kelas_id, id];
        db.query(sql, values, callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM kuis WHERE id = ?";
        db.query(sql, [id], callback);
    },

    updateStatus: (id, status, callback) => {
        const sql = "UPDATE kuis SET status = ?, approved_at = NOW() WHERE id = ?";
        db.query(sql, [status, id], callback);
    }
};

export default Kuis;