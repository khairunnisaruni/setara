// models/Cerita.js
import db from "../config/db.js";

const Cerita = {
    getAll: (callback) => {
        const sql = `
            SELECT 
                cerita.*, 
                users.name AS nama_penulis 
            FROM cerita
            LEFT JOIN users ON cerita.user_id = users.id
            ORDER BY cerita.created_at DESC
        `;
        db.query(sql, callback);
    },

    create: (data, callback) => {
        // Kita tampung 'content' atau 'deskripsi' (jaga-jaga nama field di frontend beda)
        const title = data.title;
        const content = data.content || data.description; 
        const user_id = data.user_id;

        // Default status = 'approved'
        const sql = `
            INSERT INTO cerita (title, content, user_id, status, approved_at, created_at) 
            VALUES (?, ?, ?, 'approved', NOW(), NOW())
        `;

        db.query(sql, [title, content, user_id], callback);
    },

    update: (id, data, callback) => {
        const title = data.title;
        const content = data.content || data.description; // Handle jika frontend kirim 'description'

        const sql = "UPDATE cerita SET title = ?, content = ? WHERE id = ?";
        db.query(sql, [title, content, id], callback);
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM cerita WHERE id = ?";
        db.query(sql, [id], callback);
    },

    updateStatus: (id, status, callback) => {
        const sql = "UPDATE cerita SET status = ?, approved_at = NOW() WHERE id = ?";
        db.query(sql, [status, id], callback);
    }
};

export default Cerita;