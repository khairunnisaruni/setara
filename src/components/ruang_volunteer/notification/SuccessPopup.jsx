import React from "react";

export default function SuccessPopup({ show, entity }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999]">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center animate-fadeIn">
        {/* ICON CHECK */}
        <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        {/* AUTO TEXT */}
        <p className="text-lg font-semibold">{entity} berhasil dibuat</p>

        <p className="text-sm text-gray-600 mt-1">
          Mohon Menunggu Verifikasi Admin
        </p>
      </div>
    </div>
  );
}
