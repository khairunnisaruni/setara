// backend_setara/routes/donasiRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  createDonasi,
  getDonasi,
  getApprovedDonasi,
  getMyDonasi,
} from "../controllers/donasiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "..", "uploads", "donasi");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// Semua donasi (misalnya untuk admin)
router.get("/", getDonasi);

// Hanya donasi approved (halaman publik)
router.get("/approved", getApprovedDonasi);

// Riwayat donasi milik user login (Profile -> Donasi)
router.get("/me", protect, getMyDonasi);

// Tambah donasi baru
router.post("/", protect, upload.single("banner"), createDonasi);

export default router;
