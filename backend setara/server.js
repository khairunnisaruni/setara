// backend_setara/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import ceritaRoutes from "./routes/ceritaRoutes.js";
import agendaRoutes from "./routes/agendaRoutes.js";
import programRoutes from "./routes/programRoutes.js"; // ⬅️ route Program
import "./config/db.js";

dotenv.config();

const app = express();

// CORS untuk frontend Vite di port 5173
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// parsing JSON & form-data urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes yang sudah ada
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cerita", ceritaRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/programs", programRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
