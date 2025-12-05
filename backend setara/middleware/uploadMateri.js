// backend_setara/middleware/uploadMateri.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastikan folder uploads/materi ada
const uploadDir = path.join(__dirname, "..", "uploads", "materi");
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

// Batasi ke PDF / audio / video
const fileFilter = (req, file, cb) => {
  const mime = file.mimetype;
  const okPdf = mime === "application/pdf";
  const okAudio = mime.startsWith("audio/");
  const okVideo = mime.startsWith("video/");

  if (okPdf || okAudio || okVideo) cb(null, true);
  else cb(new Error("Tipe file harus PDF, audio, atau video"));
};

// Multer dengan diskStorage + fileFilter
// Pola seperti ini direkomendasikan di dokumentasi Multer untuk single file upload. [web:80][web:81]
const uploadMateri = multer({ storage, fileFilter });

export default uploadMateri;
