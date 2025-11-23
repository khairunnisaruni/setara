import { createQuiz } from "../models/Quiz.js";

export const addQuiz = (req, res) => {
  try {
    const {
      title,
      description,
      platform,
      link,
      subjectCategory,
      classCategory,
    } = req.body;

    if (!title || !platform || !link) {
      return res.status(400).json({
        message: "Title, platform, dan link wajib diisi",
      });
    }

    const mapSubjectToId = (subject) => {
      switch (subject) {
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

    const mapClassToId = (cls) => {
      switch (cls) {
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

    const quizData = {
      title,
      description,
      platform,
      link,
      kategoriId: mapSubjectToId(subjectCategory),
      kategoriKelasId: mapClassToId(classCategory),
      gambar: null,
      addedBy: 1,
      status: "pending",
    };

    createQuiz(quizData, (err, savedQuiz) => {
      if (err) {
        console.error("Error menyimpan kuis:", err);
        return res.status(500).json({ message: "Gagal menyimpan kuis" });
      }

      return res.status(201).json({
        message: "Kuis berhasil disimpan",
        data: savedQuiz,
      });
    });
  } catch (error) {
    console.error("Error di addQuiz:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
