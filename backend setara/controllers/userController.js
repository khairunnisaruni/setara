
// backend_setara/controllers/userController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();



export const getUsers = (req, res) => {
    User.getAlls((err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const deleteUser = (req, res) => {
    User.deletes(req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "User berhasil dihapus", result });
    });
};

// helper buat generate JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });
};

// REGISTER USER
export const registerUser = async (req, res) => {
  console.log("=== REGISTER ENDPOINT DIPANGGIL ===");
  console.log("Data yang diterima:", req.body);

  try {
    const { name, username, gender, email, password, photo, bio, profesi } =
      req.body;

    if (!name || !username || !gender || !email || !password || !profesi) {
      return res.status(400).json({ message: "Semua field wajib diisi!" });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const existingUsername = await User.findByUsername(username);
    if (existingUsername.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    const token = generateToken({ id: createdUser.insertId, profesi });

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
      token,
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

    const users = await User.findByUsername(username);

    if (!users || users.length === 0) {
      return res.status(400).json({ message: "Username atau password salah" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Username atau password salah" });
    }

    const token = generateToken({ id: user.id, profesi: user.profesi });

    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        gender: user.gender,
        profesi: user.profesi,
        photo: user.photo,
        bio: user.bio,
      },
      token,
    });
  } catch (error) {
    console.error("❌ ERROR loginUser:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// PROFIL USER YANG SEDANG LOGIN
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // diisi di middleware

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      gender: user.gender,
      profesi: user.profesi,
      photo: user.photo,
      bio: user.bio,
      created_at: user.created_at,
    });
  } catch (error) {
    console.error("❌ ERROR getProfile:", error);
    res.status(500).json({ message: "Gagal mengambil profil user" });
  }
};

// UPDATE PROFIL USER YANG SEDANG LOGIN
export const updateProfile = async (req, res) => {
  try {
    const user = req.user; // dari middleware protect
    if (!user) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }

    const { name, username, gender, profesi, bio } = req.body;

    if (!name || !username || !gender || !profesi) {
      return res
        .status(400)
        .json({ message: "Field wajib tidak boleh kosong" });
    }

    // cek username baru tidak bentrok dengan user lain
    if (username !== user.username) {
      const existing = await User.findByUsername(username);
      const conflict =
        existing && existing.length > 0 && existing[0].id !== user.id;
      if (conflict) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }
    }

    const updateData = {
      name,
      username,
      gender,
      profesi,
      bio: bio || "",
    };

    await User.updateById(user.id, updateData);

    const updatedUser = await User.findById(user.id);

    res.status(200).json({
      message: "Profil berhasil diperbarui",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        gender: updatedUser.gender,
        profesi: updatedUser.profesi,
        photo: updatedUser.photo,
        bio: updatedUser.bio,
      },
    });
  } catch (error) {
    console.error("❌ ERROR updateProfile:", error);
    res.status(500).json({ message: "Gagal mengupdate profil" });
  }
};

// UPDATE PASSWORD USER YANG SEDANG LOGIN
export const updatePassword = async (req, res) => {
  try {
    const authUser = req.user; // dari middleware protect
    if (!authUser) {
      return res.status(401).json({ message: "Tidak terautentikasi" });
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Semua field password wajib diisi" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password baru minimal 6 karakter" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Konfirmasi password baru tidak sama" });
    }

    // ambil user dari DB untuk dapatkan hash password lama
    const userFromDb = await User.findById(authUser.id);
    if (!userFromDb) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(oldPassword, userFromDb.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password lama salah" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await User.updateById(authUser.id, { password: hashedNewPassword });

    res.status(200).json({ message: "Password berhasil diperbarui" });
  } catch (error) {
    console.error("❌ ERROR updatePassword:", error);
    res.status(500).json({ message: "Gagal mengupdate password" });
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
