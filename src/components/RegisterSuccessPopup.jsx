import React from "react";

const RegisterSuccessPopup = ({ onClose }) => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-white rounded-3xl shadow-xl px-8 py-8 text-center max-w-sm w-full">

        {/* ICON PNG */}
        <div className="flex justify-center mb-4">
          <img 
            src="../assets/images/login-success.png" 
            alt="Success"
            className="w-[151px] h-[75px] object-contain"
          />
        </div>

        <h2 className="text-green-500 text-2xl font-bold mb-3">
          Berhasil Daftar
        </h2>

        <p className="text-gray-600 text-md leading-relaxed">
          Akunmu berhasil dibuat. <br />
          Silahkan Login untuk jelajahi kegiatan dan peluang volunteer.
        </p>

        <button
          onClick={onClose}
          className="mt-5 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccessPopup;
