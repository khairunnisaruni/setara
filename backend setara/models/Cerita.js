// backend_setara/models/Cerita.js
import db from "../config/db.js";

const Cerita = {
  create: (data, callback) => {
    const { title, content, user_id, status, approved_at } = data;

    const sql = `
      INSERT INTO cerita
      (title, content, user_id, status, approved_at)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [title, content, user_id, status, approved_at],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, { id: results.insertId, ...data });
      }
    );
  },
};

export default Cerita;
