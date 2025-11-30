// src/pages/Login.jsx
import Button from "../components/Button";
import Input from "../components/Input";
import gambarLatar from "../../src/assets/bg-login.png";
import RegisterSuccessPopup from "../components/RegisterSuccessPopup"; 
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const navigate = useNavigate();

  // 🔥 CEK APAKAH BARU SELESAI REGISTER
  useEffect(() => {
    const status = localStorage.getItem("registerSuccess");
    if (status === "true") {
      setShowRegisterPopup(true);
      localStorage.removeItem("registerSuccess");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {

        if (data.token) localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        localStorage.setItem("loginSuccess", "true"); // untuk popup di beranda
        navigate("/beranda");

      } else {
        alert(data.message || "Login gagal");
      }

    } catch (error) {
      alert("Gagal koneksi ke server");
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover flex items-center px-52 justify-between"
      style={{ backgroundImage: `url(${gambarLatar})` }}
    >
      {/* 🔥 POPUP REGISTER BERHASIL (KANAN ATAS) */}
      {showRegisterPopup && (
        <RegisterSuccessPopup onClose={() => setShowRegisterPopup(false)} />
      )}

      <div className="text-6xl font-bold text-[#FBF8F4]">
        <div>Masuk</div>
        <div className="bg-linear-to-r from-[#FFB54D] via-[#FBF8F4] to-[#FFB54D] bg-clip-text text-transparent drop-shadow-md">
          SETARA
        </div>
      </div>

      <div className="w-[60%] bg-[#FFFFFF]/40 max-h-[400px] h-full px-12 flex items-center rounded-[40px]">
        <div className="w-full">
          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input
                label="Nama Pengguna"
                type="text"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                label="Kata Sandi"
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Button
                className="cursor-pointer hover:bg-amber-500/70 font-bold"
                text="Masuk"
                type="submit"
              />

              <div className="text-sm font-bold text-white">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-[#FF9500] font-bold cursor-pointer hover:text-[#FF9500]/50"
                >
                  Daftar
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
