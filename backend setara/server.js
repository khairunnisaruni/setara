// backend_setara/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import ceritaRoutes from "./routes/ceritaRoutes.js";
import agendaRoutes from "./routes/agendaRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import materiRoutes from "./routes/materiRoute.js";
import quizRoutes from "./routes/quizRoutes.js";
import kuisRoutes from "./routes/kuisRoute.js";
import donasiRoutes from "./routes/donasiRoutes.js";
import dashboardRoutes from './routes/dashboardRoute.js';
import infoRoutes from './routes/infoRoute.js';
// HAPUS import materialRoutes karena fitur materi sudah dibatalkan
// import materialRoutes from "./routes/materialRoutes.js";

import categoryRoute from "./routes/categoryRoute.js";

import "./config/db.js";

dotenv.config();

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// supaya file poster bisa diakses

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
app.use("/admin/buku", bookRoutes);
app.use("/admin/quiz", kuisRoutes);
app.use("/admin/materials", materiRoutes);
app.use("/admin/stories", ceritaRoutes);
app.use("/admin/programs", programRoutes);
app.use('/admin/info', infoRoutes);
app.use('/admin/users', userRoutes);
app.use('/admin', dashboardRoutes);


app.use("/admin", categoryRoute);


app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cerita", ceritaRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/kuis", quizRoutes);
app.use("/api/donasi", donasiRoutes);
// HAPUS juga mount route materials
// app.use("/api/materials", materialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});