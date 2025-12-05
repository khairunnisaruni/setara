// models/Materi.js
import db from "../config/db.js";

const Materi = {
    getAll: (callback) => {
        const sql = `
            SELECT 
                materi_multimedia.*, 
                kategori.nama AS nama_kategori, 
                kategori_kelas.nama AS nama_kelas,
                users.name AS nama_pengupload
            FROM materi_multimedia
            LEFT JOIN kategori ON materi_multimedia.kategori_id = kategori.id
            LEFT JOIN kategori_kelas ON materi_multimedia.kategori_kelas_id = kategori_kelas.id
            LEFT JOIN users ON materi_multimedia.uploaded_by = users.id
            ORDER BY materi_multimedia.created_at DESC
        `;
        db.query(sql, callback);
    },

    create: (data, filePath, callback) => {
        const { title, description, file_type, kategori_id, kategori_kelas_id, uploaded_by } = data;

        // Default status = 'approved'
        const sql = `
            INSERT INTO materi_multimedia 
            (title, description, file_type, file_path, kategori_id, kategori_kelas_id, uploaded_by, status, approved_at, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', NOW(), NOW())
        `;

        const values = [title, description, file_type, filePath, kategori_id, kategori_kelas_id, uploaded_by];
        db.query(sql, values, callback);
    },

    update: (id, data, filePath, callback) => {
        const { title, description, file_type, kategori_id, kategori_kelas_id } = data;
        let sql, values;

        if (filePath) {
            // Jika ada file baru atau link baru yang dikirim
            sql = `UPDATE materi_multimedia SET title=?, description=?, file_type=?, file_path=?, kategori_id=?, kategori_kelas_id=? WHERE id=?`;
            values = [title, description, file_type, filePath, kategori_id, kategori_kelas_id, id];
        } else {
            // Jika tidak ada perubahan file/link
            sql = `UPDATE materi_multimedia SET title=?, description=?, file_type=?, kategori_id=?, kategori_kelas_id=? WHERE id=?`;
            values = [title, description, file_type, kategori_id, kategori_kelas_id, id];
        }

        db.query(sql, values, callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM materi_multimedia WHERE id = ?";
        db.query(sql, [id], callback);
    },

    updateStatus: (id, status, callback) => {
        const sql = "UPDATE materi_multimedia SET status = ?, approved_at = NOW() WHERE id = ?";
        db.query(sql, [status, id], callback);
    }
};

export default Materi;