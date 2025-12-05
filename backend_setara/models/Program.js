// models/Program.js
import db from "../config/db.js";

const Program = {
    getAll: (callback) => {
        const sql = "SELECT * FROM programs ORDER BY created_at DESC";
        db.query(sql, callback);
    },

    create: (data, posterBanner, callback) => {
        const {
            judul_program, penyelenggara, jenis_program, lokasi_program,
            deskripsi_program, periode_tanggal, deadline_pendaftaran,
            status_program, tautan_sumber_resmi, added_by
        } = data;

        // Default: status='approved', approved_at=NOW()
        const sql = `
            INSERT INTO programs 
            (judul_program, penyelenggara, jenis_program, lokasi_program, deskripsi_program, periode_tanggal, deadline_pendaftaran, status_program, tautan_sumber_resmi, poster_banner, added_by, status, approved_at, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved', NOW(), NOW())
        `;

        const values = [
            judul_program, penyelenggara, jenis_program, lokasi_program, deskripsi_program, periode_tanggal, deadline_pendaftaran, status_program, tautan_sumber_resmi, posterBanner, added_by
        ];

        db.query(sql, values, callback);
    },

    update: (id, data, posterBanner, callback) => {
        const {
            judul_program, penyelenggara, jenis_program, lokasi_program,
            deskripsi_program, periode_tanggal, deadline_pendaftaran,
            status_program, tautan_sumber_resmi
        } = data;

        let sql, values;

        if (posterBanner) {
            // Update dengan gambar baru
            sql = `UPDATE programs SET judul_program=?, penyelenggara=?, jenis_program=?, lokasi_program=?, deskripsi_program=?, periode_tanggal=?, deadline_pendaftaran=?, status_program=?, tautan_sumber_resmi=?, poster_banner=? WHERE id=?`;
            values = [judul_program, penyelenggara, jenis_program, lokasi_program, deskripsi_program, periode_tanggal, deadline_pendaftaran, status_program, tautan_sumber_resmi, posterBanner, id];
        } else {
            // Update tanpa ganti gambar
            sql = `UPDATE programs SET judul_program=?, penyelenggara=?, jenis_program=?, lokasi_program=?, deskripsi_program=?, periode_tanggal=?, deadline_pendaftaran=?, status_program=?, tautan_sumber_resmi=? WHERE id=?`;
            values = [judul_program, penyelenggara, jenis_program, lokasi_program, deskripsi_program, periode_tanggal, deadline_pendaftaran, status_program, tautan_sumber_resmi, id];
        }

        db.query(sql, values, callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM programs WHERE id = ?";
        db.query(sql, [id], callback);
    },

    updateStatus: (id, status, callback) => {
        const sql = "UPDATE programs SET status = ?, approved_at = NOW() WHERE id = ?";
        db.query(sql, [status, id], callback);
    }
};

export default Program;