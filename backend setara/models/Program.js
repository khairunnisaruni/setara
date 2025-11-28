// backend_setara/models/Program.js
import db from "../config/db.js";

const Program = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO program
          (title, category, description, tanggal_mulai, tanggal_berakhir, status_program, link, added_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.title,
        data.category,                 // enum('pendidikan','beasiswa','relawan')
        data.description || null,
        data.tanggal_mulai || null,    // date
        data.tanggal_berakhir || null, // date
        data.status_program,           // enum('akan datang','sedang berlangsung','selesai')
        data.link || null,
        data.added_by || null,
      ];

      db.query(sql, values, (err, results) => {
        if (err) {
          console.error("❌ Error insert program:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM program ORDER BY created_at DESC", (err, results) => {
        if (err) {
          console.error("❌ Error getAll program:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};

export default Program; // ⬅️ PENTING: default export
