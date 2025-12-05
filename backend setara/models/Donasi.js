// models/Donasi.js
import db from "../config/db.js";

const Donasi = {
    getAll: (callback) => {
        const sql = "SELECT * FROM donasi";
        db.query(sql, callback);
    },

    create: (data, poster, callback) => {
        const {
            title, kategori, penerima_manfaat, description,
            dampak, link, penanggung_jawab, contact_person, added_by
        } = data;

        const sql = `
            INSERT INTO donasi 
            (
                title, 
                kategori, 
                penerima_manfaat, 
                description, 
                dampak, 
                link, 
                penanggung_jawab, 
                contact_person, 
                poster, 
                added_by, 
                status,   
                approved_at,
                created_at
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved', NOW(), NOW())
        `;

        // Array values tetap sama
        const values = [
            title, kategori, penerima_manfaat, description, dampak, link, penanggung_jawab, contact_person, poster, added_by
        ];

        db.query(sql, values, callback);
    },

    update: (id, data, poster, callback) => {
        const {
            title, kategori, penerima_manfaat, description,
            dampak, link, penanggung_jawab, contact_person
        } = data;

        let sql, values;

        if (poster) {
            // Update dengan gambar baru
            sql = `UPDATE donasi SET title=?, kategori=?, penerima_manfaat=?, description=?, dampak=?, link=?, penanggung_jawab=?, contact_person=?, poster=? WHERE id=?`;
            values = [title, kategori, penerima_manfaat, description, dampak, link, penanggung_jawab, contact_person, poster, id];
        } else {
            // Update tanpa ganti gambar
            sql = `UPDATE donasi SET title=?, kategori=?, penerima_manfaat=?, description=?, dampak=?, link=?, penanggung_jawab=?, contact_person=? WHERE id=?`;
            values = [title, kategori, penerima_manfaat, description, dampak, link, penanggung_jawab, contact_person, id];
        }

        db.query(sql, values, callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM donasi WHERE id = ?";
        db.query(sql, [id], callback);
    },

    updateStatus: (id, status, callback) => {
        const sql = "UPDATE donasi SET status = ?, approved_at = NOW() WHERE id = ?";
        db.query(sql, [status, id], callback);
    }
};

export default Donasi;