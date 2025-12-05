// backend_setara/controllers/quizController.js
import db from "../config/db.js";

// ===== Helper mapping kategori =====
const mapSubjectToCategoryId = (subjectCategory) => {
  switch (subjectCategory) {
    case "matematika":
      return 1;
    case "bahasa-indonesia":
      return 2;
    case "ipa":
      return 3;
    case "ips":
      return 4;
    case "bahasa-inggris":
      return 5;
    default:
      return null;
  }
};

const mapClassToKelasId = (classCategory) => {
  switch (classCategory) {
    case "kelas-1":
      return 1;
    case "kelas-2":
      return 2;
    case "kelas-3":
      return 3;
    case "kelas-4":
      return 4;
    case "kelas-5":
      return 5;
    case "kelas-6":
      return 6;
    default:
      return null;
  }
};

// ===== GET /api/kuis -> semua kuis (opsional, untuk admin) =====
export const getAllQuizzes = (req, res) => {
  const sql = "SELECT * FROM kuis ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error mengambil data kuis:", err);
      return res.status(500).json({ message: "Gagal mengambil data kuis" });
    }
    res.json(results);
  });
};

// ===== GET /api/kuis/approved -> hanya kuis yang sudah disetujui admin =====
export const getApprovedQuizzes = (req, res) => {
  const sql = `
    SELECT
      id,
      title,
      description,
      platform,
      link,
      gambar,
      kategori_id,
      kategori_kelas_id,
      created_at,
      status,
      approved_at
    FROM kuis
    WHERE status = 'approved'
    ORDER BY approved_at DESC, created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error mengambil kuis approved:", err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil kuis approved" });
    }
    res.json(results);
  });
};

// ===== POST /api/kuis -> tambah kuis baru =====
export const createQuiz = (req, res) => {
  const {
    title,
    description,
    platform,
    link,
    subjectCategory,
    classCategory,
  } = req.body;

  // Validasi dasar
  if (!title || !platform || !link) {
    return res
      .status(400)
      .json({ message: "Title, platform, dan link wajib diisi" });
  }

    // Path file gambar (kalau ada upload)
    const gambar = req.file ? `/uploads/kuis/${req.file.filename}` : null;

  // Mapping kategori string -> id int
  const kategori_id = mapSubjectToCategoryId(subjectCategory);
  const kategori_kelas_id = mapClassToKelasId(classCategory);

  // TODO: nanti kalau sudah ada auth, isi dari req.user.id
  const added_by = null;

  const sql = `
    INSERT INTO kuis
      (title, description, platform, link, gambar,
       kategori_id, kategori_kelas_id, added_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    title,
    description || null,
    platform,
    link,
    gambar,
    kategori_id,
    kategori_kelas_id,
    added_by,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error menyimpan kuis:", err);
      return res.status(500).json({ message: "Gagal menyimpan kuis" });
    }

    // Frontend pakai fetch, jadi kirim JSON, bukan redirect
    return res.status(201).json({ id: result.insertId });
  });
};
