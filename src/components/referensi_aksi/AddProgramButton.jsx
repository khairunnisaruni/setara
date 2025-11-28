import React from "react";

export default function AddProgramButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#FF9D01] hover:bg-[#e88a00] text-white px-8 py-3 rounded-xl font-semibold shadow-md transition duration-300"
    >
      + Tambahkan Program Baru
    </button>
  );
}
