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

    // Data user baru
    const newUser = {
      name,
      username,
      gender,
      email,
      password: hashedPassword,
      photo: photo || null,
      bio: bio || "",
      profesi,
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

// LOGIN USER
export const loginUser = async (req, res) => {
  console.log("=== LOGIN ENDPOINT DIPANGGIL ===");
  console.log("Data yang diterima:", req.body);

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan password wajib diisi" });
    }

    // Cari user berdasarkan username
    const users = await User.findByUsername(username);

    if (!users || users.length === 0) {
      console.log("❌ User tidak ditemukan");
      return res.status(400).json({ message: "Username atau password salah" });
    }

    const user = users[0];

    // Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password salah");
      return res.status(400).json({ message: "Username atau password salah" });
    }

    console.log("✅ Login berhasil untuk user:", user.username);

    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        gender: user.gender,
        profesi: user.profesi,
      },
    });
  } catch (error) {
    console.error("❌ ERROR loginUser:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
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
