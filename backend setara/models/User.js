// backend_setara/models/User.js
import db from "../config/db.js";

const User = {
  findByEmail: (email) => {
    console.log("🔍 Mencari email:", email);
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) {
            console.error("❌ Error di findByEmail:", err);
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  },

  create: (userData) => {
    console.log("💾 Menyimpan user ke database:", userData);
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO users SET ?", userData, (err, results) => {
        if (err) {
          console.error("❌ Error saat insert ke database:", err);
          return reject(err);
        }
        console.log("✅ Insert berhasil! Insert ID:", results.insertId);
        resolve(results);
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT id, name, username, email, gender, photo, bio, profesi, created_at FROM users",
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  // === TAMBAHAN: cari user berdasarkan username (untuk login) ===
  findByUsername: (username) => {
    console.log("🔍 Mencari username:", username);
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, results) => {
          if (err) {
            console.error("❌ Error di findByUsername:", err);
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  },
};

export default User;
