import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import multer from 'multer';

import donasiRoutes from "./routes/donasiRoute.js";
import bukuRoutes from "./routes/bukuRoute.js";
import quizRoutes from "./routes/kuisRoute.js";

import "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Folder (Karena pakai Type Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: "http://localhost:5173", // Sesuaikan dengan port Frontend Reactmu
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use("/admin/donations", donasiRoutes);
app.use("/admin/buku", bukuRoutes);
app.use("/admin/quiz", quizRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});