// backend_setara/config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// OPSIONAL: test koneksi
db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek database:", err.message);
  } else {
    console.log("✅ Terhubung ke database MySQL");
  }
});

export default db;
