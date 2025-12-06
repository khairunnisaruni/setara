
// backend setara/models/Program.js
import db from "../config/db.js";

const Program = {

  getAlls: (callback) => {
    const sql = "SELECT * FROM programs ORDER BY created_at DESC";
    db.query(sql, callback);
  },

  creates: (data, posterBanner, callback) => {
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

  updates: (id, data, posterBanner, callback) => {
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

  deletes: (id, callback) => {
    const sql = "DELETE FROM programs WHERE id = ?";
    db.query(sql, [id], callback);
  },

  updateStatuss: (id, status, callback) => {
    const sql = "UPDATE programs SET status = ?, approved_at = NOW() WHERE id = ?";
    db.query(sql, [status, id], callback);
  },

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
