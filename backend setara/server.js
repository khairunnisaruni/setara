// backend_setara/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import ceritaRoutes from "./routes/ceritaRoutes.js";
import agendaRoutes from "./routes/agendaRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import donasiRoutes from "./routes/donasiRoutes.js"; // <-- tambahkan
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

// supaya file poster bisa diakses (opsional, berguna untuk tampil gambar)
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cerita", ceritaRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/kuis", quizRoutes);
app.use("/api/donasi", donasiRoutes); // <-- mount route baru

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
