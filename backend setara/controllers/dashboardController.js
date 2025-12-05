// controllers/dashboardController.js
import db from "../config/db.js";

// Helper untuk Promise
const dbQuery = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

export const getDashboardStats = async (req, res) => {
    try {
        const [
            userCount, kuisStats, bukuStats, materiStats, 
            ceritaStats, programStats, donasiStats
        ] = await Promise.all([
            dbQuery("SELECT COUNT(*) as total FROM users"), 
            dbQuery("SELECT SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as total, SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending FROM kuis"),
            dbQuery("SELECT SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as total, SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending FROM rekomendasi_buku"),
            dbQuery("SELECT SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as total, SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending FROM materi_multimedia"),
            dbQuery("SELECT SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as total, SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending FROM cerita"),
            dbQuery("SELECT SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as total, SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending FROM programs"),
            dbQuery("SELECT COUNT(*) as total FROM donasi") 
        ]);

        res.json({
            users: userCount[0].total || 0,
            kuis: { total: kuisStats[0].total || 0, pending: kuisStats[0].pending || 0 },
            buku: { total: bukuStats[0].total || 0, pending: bukuStats[0].pending || 0 },
            materi: { total: materiStats[0].total || 0, pending: materiStats[0].pending || 0 },
            cerita: { total: ceritaStats[0].total || 0, pending: ceritaStats[0].pending || 0 },
            program: { total: programStats[0].total || 0, pending: programStats[0].pending || 0 },
            donasi: { total: donasiStats[0].total || 0, pending: 0 } 
        });

    } catch (err) {
        console.error("❌ ERROR DASHBOARD:", err);
        res.status(500).json({ error: "Gagal memuat statistik" });
    }
};

export const getChartStats = (req, res) => {
    const sql = `
        SELECT 
            DATE_FORMAT(created_at, '%b') as name,
            SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as disetujui,
            SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as ditolak
        FROM (
            SELECT created_at, status FROM kuis
            UNION ALL SELECT created_at, status FROM rekomendasi_buku
            UNION ALL SELECT created_at, status FROM materi_multimedia
            UNION ALL SELECT created_at, status FROM cerita
            UNION ALL SELECT created_at, status FROM programs
            UNION ALL SELECT created_at, status FROM donasi 
        ) as gabungan
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m'), name
        ORDER BY DATE_FORMAT(created_at, '%Y-%m') ASC
    `;

    db.query(sql, (err, data) => {
        if (err) return res.json([]); 
        return res.json(data);
    });
};

export const getActivities = (req, res) => {
    const sql = `
        SELECT * FROM (
            SELECT name as user_name, 'mendaftar akun baru' as action, created_at FROM users
            UNION ALL
            SELECT COALESCE(u.name, 'Admin'), CONCAT('menambahkan kuis: ', k.title), k.created_at FROM kuis k LEFT JOIN users u ON k.added_by = u.id
            UNION ALL
            SELECT COALESCE(u.name, 'Admin'), CONCAT('merekomendasikan buku: ', b.title), b.created_at FROM rekomendasi_buku b LEFT JOIN users u ON b.added_by = u.id
            UNION ALL
            SELECT COALESCE(u.name, 'Admin'), CONCAT('mengupload materi: ', m.title), m.created_at FROM materi_multimedia m LEFT JOIN users u ON m.uploaded_by = u.id
            UNION ALL
            SELECT COALESCE(u.name, 'Admin'), CONCAT('membuat program: ', p.judul_program), p.created_at FROM programs p LEFT JOIN users u ON p.added_by = u.id
            UNION ALL
            SELECT COALESCE(u.name, 'Admin'), CONCAT('membuka donasi: ', d.title), d.created_at FROM donasi d LEFT JOIN users u ON d.added_by = u.id
        ) AS all_activities
        ORDER BY created_at DESC LIMIT 5
    `;

    db.query(sql, (err, data) => {
        if (err) return res.json([]); 
        return res.json(data);
    });
};