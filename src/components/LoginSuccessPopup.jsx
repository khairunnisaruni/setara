import React from "react";
import successImg from "../assets/login-success.png"; // <-- arahkan sesuai lokasi PNG kamu

const LoginSuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed top-20 right-6 z-50">
      <div className="bg-white rounded-3xl shadow-xl px-10 py-12 text-center max-w-lg w-full">

        {/* ICON PNG */}
        <div className="flex justify-center mb-4">
          <img
            src={successImg}
            alt="Login Success Icon"
            width={151}
            height={75}
            className="object-contain"
          />
        </div>

        <h2 className="text-green-500 text-2xl font-bold mb-3">
          Login Berhasil
        </h2>

        <p className="text-gray-600 text-md">
          Selamat datang di Setara! <br />
          Jelajahi untuk melihat kegiatan dan peluang volunteer.
        </p>

        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
        >
          Tutup
        </button>

      </div>
    </div>
  );
};

export default LoginSuccessPopup;
