// backend_setara/controllers/userController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  console.log("=== REGISTER ENDPOINT DIPANGGIL ===");
  console.log("Data yang diterima:", req.body);

  try {
    const { name, username, gender, email, password, photo, bio, profesi } =
      req.body;

    // Validasi input
    if (!name || !username || !gender || !email || !password || !profesi) {
      console.log("❌ Validasi gagal - Ada field kosong");
      return res.status(400).json({ message: "Semua field wajib diisi!" });
    }

    // Cek email sudah ada atau belum
    const existingUser = await User.findByEmail(email);
    if (existingUser.length > 0) {
      console.log("❌ Email sudah terdaftar");
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Data user baru (sesuai kolom tabel `users` di setara.sql)
    const newUser = {
      name,          // varchar(100)
      username,      // varchar(100)
      gender,        // enum('laki-laki','perempuan')
      email,         // varchar(100)
      password: hashedPassword, // varchar(255)
      photo: photo || null,
      bio: bio || "",
      profesi,       // enum('pelajar','umum')
    };

    const createdUser = await User.create(newUser);

    console.log("✅ User tersimpan, ID:", createdUser.insertId);

    res.status(201).json({
      message: "Register berhasil!",
      user: {
        id: createdUser.insertId,
        name,
        username,
        email,
        gender,
        photo: newUser.photo,
        bio: newUser.bio,
        profesi,
      },
    });
  } catch (error) {
    console.error("❌ ERROR registerUser:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ ERROR getAllUsers:", error);
    res.status(500).json({ message: "Gagal mengambil users" });
  }
};
