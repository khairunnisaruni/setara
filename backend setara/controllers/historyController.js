// backend setara/controllers/historyController.js
import db from "../config/db.js";

/**
 * 1) KUIS & GAME INTERAKTIF
 *    Tabel: kuis
 *    Relasi:
 *      - kategori_kelas_id -> kategori_kelas.nama
 *      - kategori_id -> kategori.nama
 */
export const getUserQuizHistory = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      k.id,
      k.title,
      k.description,
      k.platform,
      k.link,
      kk.nama AS kelas_nama,
      kat.nama AS kategori_nama,
      k.status,
      k.created_at,
      k.approved_at
    FROM kuis k
    LEFT JOIN kategori_kelas kk ON k.kategori_kelas_id = kk.id
    LEFT JOIN kategori kat ON k.kategori_id = kat.id
    WHERE k.added_by = ?
    ORDER BY k.created_at DESC
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR getUserQuizHistory:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil riwayat kuis" });
    }
    res.json(rows);
  });
};

/**
 * 2) REKOMENDASI BUKU
 *    Tabel: rekomendasi_buku
 *    Relasi:
 *      - kategori_id -> kategori.nama
 *
 *    Catatan: pakai subquery sederhana biar minim error.
 */
export const getUserBookHistory = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      rb.id,
      rb.title,
      rb.author,
      rb.description,
      rb.link,
      (
        SELECT nama
        FROM kategori
        WHERE id = rb.kategori_id
      ) AS kategori_nama,
      rb.status,
      rb.created_at,
      rb.approved_at
    FROM rekomendasi_buku rb
    WHERE rb.added_by = ?
    ORDER BY rb.created_at DESC
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR getUserBookHistory:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil riwayat rekomendasi buku" });
    }
    res.json(rows);
  });
};

/**
 * 3) MATERI MULTIMEDIA
 *    Tabel: materi_multimedia
 *    Relasi:
 *      - kategori_kelas_id -> kategori_kelas.nama
 *      - kategori_id -> kategori.nama
 */
export const getUserMateriHistory = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      m.id,
      m.title,
      m.description,
      m.file_type,
      m.file_path,
      kk.nama AS kelas_nama,
      kat.nama AS kategori_nama,
      m.status,
      m.created_at,
      m.approved_at
    FROM materi_multimedia m
    LEFT JOIN kategori_kelas kk ON m.kategori_kelas_id = kk.id
    LEFT JOIN kategori kat ON m.kategori_id = kat.id
    WHERE m.uploaded_by = ?
    ORDER BY m.created_at DESC
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR getUserMateriHistory:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil riwayat materi multimedia" });
    }
    res.json(rows);
  });
};

/**
 * 4) CERITA LAPANGAN
 *    Tabel: cerita
 */
export const getUserCeritaHistory = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      id,
      title,
      content,
      status,
      created_at,
      approved_at
    FROM cerita
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR getUserCeritaHistory:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil riwayat cerita lapangan" });
    }
    res.json(rows);
  });
};

/**
 * 5) PROGRAM
 *    Tabel: programs
 */
export const getUserProgramHistory = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      id,
      judul_program,
      penyelenggara,
      jenis_program,
      lokasi_program,
      deskripsi_program,
      periode_tanggal,
      deadline_pendaftaran,
      status_program,
      tautan_sumber_resmi,
      status,
      created_at,
      approved_at
    FROM programs
    WHERE added_by = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR getUserProgramHistory:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil riwayat program" });
    }
    res.json(rows);
  });
};

/**
 * 6) DONASI
 *    Tabel: donasi
 */
export const getUserDonasiHistory = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      id,
      title,
      kategori,
      penerima_manfaat,
      description,
      dampak,
      link,
      penanggung_jawab,
      contact_person,
      status,
      created_at,
      approved_at
    FROM donasi
    WHERE added_by = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("MYSQL ERROR getUserDonasiHistory:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil riwayat donasi" });
    }
    res.json(rows);
  });
};
