// backend_setara/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// koneksi database (hanya perlu di-import sekali)
import "./config/db.js";

// import routes
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import ceritaRoutes from "./routes/ceritaRoutes.js";
import agendaRoutes from "./routes/agendaRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import donasiRoutes from "./routes/donasiRoutes.js";
import materialRoutes from "./routes/materialRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

// ========== APP INIT ==========
const app = express();

// ========== MIDDLEWARE GLOBAL ==========

// CORS: izinkan Vite frontend di port 5173
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// parser body JSON & urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static untuk file upload (gambar, dsb)
// akses: http://localhost:5000/uploads/...
app.use("/uploads", express.static("uploads"));

// =============== ROUTES ===============================
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cerita", ceritaRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/kuis", quizRoutes);
app.use("/api/donasi", donasiRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/materials", materialRoutes);

// riwayat postingan
app.use("/api/history", historyRoutes);
// ======================================================

// =============== ERROR HANDLER ========================
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Terjadi kesalahan pada server" });
});
// ======================================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
