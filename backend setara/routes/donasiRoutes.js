// routes/donasiRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import createDonasi, {
  getDonasi,
  getApprovedDonasi,
} from "../controllers/donasiController.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// folder simpan poster
const uploadDir = path.join(__dirname, "..", "uploads", "donasi");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // nama file unik
  },
});

const upload = multer({ storage });

// GET /api/donasi -> ambil semua donasi (admin)
router.get("/", getDonasi);

// GET /api/donasi/approved -> hanya donasi yang sudah disetujui admin
router.get("/approved", getApprovedDonasi);

// POST /api/donasi -> tambah donasi baru
router.post("/", upload.single("banner"), createDonasi);

export default router;
