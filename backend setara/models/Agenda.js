// backend_setara/models/Agenda.js
import db from "../config/db.js";

// Helper: format Date JS ke "YYYY-MM-DD" TANPA geser timezone
const formatDateYMD = (value) => {
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // Kalau sudah string "2025-12-06 00:00:00" -> ambil 10 char pertama
  return String(value).slice(0, 10);
};

const Agenda = {
  // CREATE agenda baru
  create: (data, callback) => {
    const { title, description, date, waktu, location, user_id } = data;

    const sql = `
      INSERT INTO agenda
      (title, description, date, waktu, location, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [title, description, date, waktu, location, user_id],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, { id: results.insertId, ...data });
      }
    );
  },

  // 🔹 Versi GLOBAL: semua agenda di DB
  getAll: (callback) => {
    const sql = `
      SELECT id, title, description, date, waktu, location, user_id
      FROM agenda
      ORDER BY date ASC, waktu ASC
    `;

    db.query(sql, (err, results) => {
      if (err) return callback(err, null);

      const normalized = results.map((row) => ({
        ...row,
        date: formatDateYMD(row.date), // <- TIDAK pakai toISOString lagi
      }));

      callback(null, normalized);
    });
  },

  // 🔹 (opsional) kalau mau khusus per user_id
  getByUser: (userId, callback) => {
    const sql = `
      SELECT id, title, description, date, waktu, location, user_id
      FROM agenda
      WHERE user_id = ?
      ORDER BY date ASC, waktu ASC
    `;

    db.query(sql, [userId], (err, results) => {
      if (err) return callback(err, null);

      const normalized = results.map((row) => ({
        ...row,
        date: formatDateYMD(row.date),
      }));

      callback(null, normalized);
    });
  },
};

export default Agenda;
