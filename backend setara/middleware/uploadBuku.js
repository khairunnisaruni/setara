// backend_setara/middleware/uploadBuku.js
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/buku";

// pastikan folder upload ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")
      .toLowerCase();
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("File harus berupa gambar"), false);
  }
  cb(null, true);
};

const uploadBuku = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // maks 3MB
});

export default uploadBuku;
