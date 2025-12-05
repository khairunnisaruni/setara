// models/Info.js
import db from "../config/db.js";

const Info = {
    getAll: (callback) => {
        const sql = "SELECT * FROM panduan";
        db.query(sql, callback);
    },

    create: (data, callback) => {
        const { judul_panduan, deskripsi_panduan } = data;
        const sql = "INSERT INTO panduan (judul_panduan, deskripsi_panduan) VALUES (?, ?)";
        db.query(sql, [judul_panduan, deskripsi_panduan], callback);
    },

    update: (id, data, callback) => {
        const { judul_panduan, deskripsi_panduan } = data;
        const sql = "UPDATE panduan SET judul_panduan=?, deskripsi_panduan=? WHERE id=?";
        db.query(sql, [judul_panduan, deskripsi_panduan, id], callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM panduan WHERE id = ?";
        db.query(sql, [id], callback);
    }
};

export default Info;