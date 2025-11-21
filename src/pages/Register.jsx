// src/pages/Register.jsx
import Button from "../components/Button";
import Input from "../components/Input";
import gambarLatar from "../../src/assets/bg-login.png";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onActiveToLogin }) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profesi, setProfesi] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi dasar
    if (
      !nama ||
      !email ||
      !username ||
      !profesi ||
      !jenisKelamin ||
      !password ||
      !confirmPassword
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Konfirmasi kata sandi tidak sama!");
      return;
    }

    // Mapping nilai dropdown ke enum di DB
    const genderMapping = {
      Pria: "laki-laki",
      Wanita: "perempuan",
    };

    // Profesi di DB: enum('pelajar','umum')
    const profesiLower = profesi.toLowerCase();
    let profesiEnum = "umum";
    if (
      profesiLower.includes("siswa") ||
      profesiLower.includes("mahasiswa") ||
      profesiLower.includes("pelajar")
    ) {
      profesiEnum = "pelajar";
    }

    const registerData = {
      name: nama,
      email,
      username,
      profesi: profesiEnum,
      gender: genderMapping[jenisKelamin],
      password,
    };

    console.log("📤 Mengirim data register:", registerData);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const data = await response.json();
      console.log("📥 Response:", data);

      if (response.ok) {
        alert("Registrasi berhasil!");

        // Tetap di halaman register, tapi kosongkan form
        setNama("");
        setEmail("");
        setUsername("");
        setProfesi("");
        setJenisKelamin("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("Registrasi gagal: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error saat register:", error);
      alert("Gagal koneksi ke server. Pastikan backend jalan di port 5000.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center gap-20 px-40"
      style={{ backgroundImage: `url(${gambarLatar})` }}
    >
      {/* TEXT KIRI */}
      <div className="text-6xl font-bold text-[#FBF8F4]">
        <div>Daftar</div>
        <div className="bg-linear-to-r from-[#FFB54D] via-[#FBF8F4] to-[#FFB54D] bg-clip-text text-transparent drop-shadow-md">
          SETARA
        </div>
      </div>

      {/* CARD REGISTER */}
      <div className="mt-10 mb-10 w-[55%] bg-white/40 backdrop-blur-md py-12 px-12 rounded-[40px] shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <Input
              label="Nama"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Nama Pengguna"
              type="text"
              placeholder="Masukkan nama pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              label="Profesi"
              type="text"
              placeholder="Masukkan profesi"
              value={profesi}
              onChange={(e) => setProfesi(e.target.value)}
            />

            <Input
              label="Jenis Kelamin"
              type="select"
              placeholder="Pilih jenis kelamin"
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value)}
              options={["Pria", "Wanita"]}
            />

            <Input
              label="Kata Sandi"
              type="password"
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              label="Konfirmasi Kata Sandi"
              type="password"
              placeholder="Masukkan ulang kata sandi"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* TOMBOL + LINK */}
          <div className="space-y-2 pt-4">
            <Button
              text="Daftar"
              type="submit"
              className="cursor-pointer hover:bg-amber-500/70 font-bold"
            />

            <div className="text-sm font-semibold text-white">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-[#FF9500] font-bold cursor-pointer hover:text-[#FF9500]/50"
              >
                Masuk
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
