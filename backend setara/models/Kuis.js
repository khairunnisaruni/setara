import db from "../config/db.js";

const Kuis = {
    // ================== GET ALL ==================
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

        db.query(sql, (err, results) => {
            if (err) {
                console.error("Database Error:", err);
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // ================== CREATE ==================
    create: (data, callback) => {
        const {
            title,
            description,
            platform,
            link,
            kategori_id,
            kategori_kelas_id,
            added_by,
            gambar
        } = data;

        const sql = `
            INSERT INTO kuis 
                (title, description, platform, link, kategori_id, kategori_kelas_id, added_by, gambar, status, approved_at, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'approved', NOW(), NOW())
        `;

        const values = [
            title,
            description,
            platform,
            link,
            kategori_id,
            kategori_kelas_id,
            added_by,
            gambar
        ];

        db.query(sql, values, callback);
    },

    // ================== UPDATE ==================
    update: (id, data, callback) => {
        const {
            title,
            description,
            platform,
            link,
            kategori_id,
            kategori_kelas_id,
            gambar
        } = data;

        // Jika upload gambar baru
        if (gambar) {
            const sql = `
                UPDATE kuis 
                SET title = ?, description = ?, platform = ?, link = ?, 
                    kategori_id = ?, kategori_kelas_id = ?, gambar = ?
                WHERE id = ?
            `;
            const values = [
                title,
                description,
                platform,
                link,
                kategori_id,
                kategori_kelas_id,
                gambar,
                id
            ];

            db.query(sql, values, callback);
        } else {
            // Jika TIDAK ganti gambar
            const sql = `
                UPDATE kuis 
                SET title = ?, description = ?, platform = ?, link = ?, 
                    kategori_id = ?, kategori_kelas_id = ?
                WHERE id = ?
            `;
            const values = [
                title,
                description,
                platform,
                link,
                kategori_id,
                kategori_kelas_id,
                id
            ];

            db.query(sql, values, callback);
        }
    },

    // ================== DELETE ==================
    delete: (id, callback) => {
        const sql = "DELETE FROM kuis WHERE id = ?";
        db.query(sql, [id], callback);
    },

    // ================== UPDATE STATUS ==================
    updateStatus: (id, status, callback) => {
        const sql = `
            UPDATE kuis 
            SET status = ?, approved_at = NOW() 
            WHERE id = ?
        `;
        db.query(sql, [status, id], callback);
    }
};

export default Kuis;
