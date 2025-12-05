import React, { useEffect } from "react";
import successImg from "../assets/login-success.png";

const LoginSuccessPopup = ({ onClose }) => {
  // AUTO CLOSE DALAM 6.5 DETIK
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-6 z-50 animate-slideIn">
      <div className="bg-white rounded-xl shadow-lg px-5 py-4 w-80 border border-gray-200 flex items-start gap-3">

        {/* ICON */}
        <img
          src={successImg}
          alt="Success"
          className="w-15 h-15 object-contain"
        />

        {/* TEXT */}
        <div>
          <h2 className="text-green-600 text-lg font-semibold">
            Login Berhasil
          </h2>
          <p className="text-sm text-gray-600 leading-tight mt-1">
            Selamat datang di Setara!
          </p>
          <p className="text-sm text-gray-600 leading-tight mt-1">
            Jelajahi untuk melihat kegiatan dan peluang volunteer.
          </p>
        </div>
      </div>

      {/* ANIMASI INTERNAL */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginSuccessPopup;
