// backend_setara/middleware/uploadKuis.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastikan folder uploads/kuis ada
const uploadDir = path.join(__dirname, "..", "uploads", "kuis");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan file di disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

// Batasi hanya file gambar
const fileFilter = (req, file, cb) => {
  const mime = file.mimetype;
  if (mime.startsWith("image/")) cb(null, true);
  else cb(new Error("Tipe file harus gambar"), false);
};

// Multer dengan diskStorage + fileFilter
const uploadKuis = multer({ storage, fileFilter });

// DEFAULT EXPORT -> supaya bisa: import uploadKuis from "../middleware/uploadKuis.js";
export default uploadKuis;
