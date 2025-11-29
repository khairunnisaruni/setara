// backend setara/models/Program.js
import db from "../config/db.js";

const Program = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO programs
          (
            judul_program,
            penyelenggara,
            jenis_program,
            lokasi_program,
            deskripsi_program,
            periode_tanggal,
            deadline_pendaftaran,
            status_program,
            tautan_sumber_resmi,
            poster_banner,
            added_by
          )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.judul_program,
        data.penyelenggara,
        data.jenis_program,
        data.lokasi_program,
        data.deskripsi_program || null,
        data.periode_tanggal,
        data.deadline_pendaftaran || null,
        data.status_program,
        data.tautan_sumber_resmi || null,
        data.poster_banner || null,
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
      db.query(
        "SELECT * FROM programs ORDER BY created_at DESC",
        (err, results) => {
          if (err) {
            console.error("❌ Error getAll program:", err);
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  },
};

export default Program;
