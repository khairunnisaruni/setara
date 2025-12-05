// backend_setara/config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "setara",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek database:", err.message);
  } else {
    console.log("✅ Terhubung ke database MySQL");
  }
});


export default db;

