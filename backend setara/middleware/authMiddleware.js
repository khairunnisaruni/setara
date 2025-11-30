// backend_setara/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Tidak ada token, akses ditolak" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ ERROR authMiddleware:", error);
    res.status(401).json({ message: "Token tidak valid atau sudah kedaluwarsa" });
  }
};
