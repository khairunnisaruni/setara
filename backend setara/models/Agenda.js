// backend_setara/models/Agenda.js
import db from "../config/db.js";

const Agenda = {
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
};

export default Agenda;
