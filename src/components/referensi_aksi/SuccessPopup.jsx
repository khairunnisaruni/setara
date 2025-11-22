import React from "react";

export default function SuccessPopup({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[380px] p-6 text-center animate-fade-in">
        <h2 className="text-2xl font-semibold text-green-600 mb-3">
          Berhasil!
        </h2>
        <p className="text-gray-600 mb-5">
          Program berhasil ditambahkan.
        </p>
        <button
          onClick={onClose}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
