import React, { useEffect } from "react";
import successImg from "../assets/login-success.png"; // sesuaikan path PNG kamu

const RegisterSuccessPopup = ({ onClose }) => {
  
  // AUTO CLOSE SETELAH 6.5 DETIK
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-10 right-6 z-50 animate-slideIn">
      <div className="bg-white rounded-xl shadow-lg px-5 py-4 w-80 border border-gray-200 flex items-start gap-3">

        {/* ICON */}
        <img
          src={successImg}
          alt="Success"
          className="w-10 h-10 object-contain"
        />

        {/* TEXT */}
        <div>
          <h2 className="text-green-600 text-lg font-semibold">
            Berhasil Daftar
          </h2>
          <p className="text-sm text-gray-600 leading-tight mt-1">
            Akunmu berhasil dibuat.  
          </p>
          <p className="text-sm text-gray-600 leading-tight mt-1">  
            Silakan login untuk mulai menjelajahi kegiatan volunteer.
          </p>
        </div>
      </div>

      {/* ANIMASI */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegisterSuccessPopup;
