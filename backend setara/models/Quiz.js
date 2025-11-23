import db from "../config/db.js";

export const createQuiz = (quizData, callback) => {
  const {
    title,
    description,
    platform,
    link,
    kategoriId,
    kategoriKelasId,
    gambar,
    addedBy,
    status,
  } = quizData;

  const sql = `
    INSERT INTO kuis
      (title, description, platform, link, kategori_id, kategori_kelas_id, gambar, added_by, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(
    sql,
    [
      title,
      description,
      platform,
      link,
      kategoriId,
      kategoriKelasId,
      gambar,
      addedBy,
      status,
    ],
    (err, result) => {
      if (err) return callback(err);
      callback(null, { id: result.insertId, ...quizData });
    }
  );
};
