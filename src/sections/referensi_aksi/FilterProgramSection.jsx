// src/sections/referensi_aksi/FilterProgramSection.jsx
import React from "react";

export default function FilterProgramSection({
  searchText,
  onSearchChange,
  kategori,
  onKategoriChange,
  status,
  onStatusChange,
}) {
  return (
    <section
      className="relative z-10 flex justify-center"
      style={{
        marginTop: "-66.8px", // agar setengah bagian overlap ke header
      }}
    >
      <div
        className=" mt-10 bg-white border border-[#E7E1DA] rounded-xl shadow-sm w-[80%] max-w-6xl"
        style={{
          height: "133.6px",
          padding: "24px 32px",
        }}
      >
        {/* Title Section */}
        <div className="flex items-center gap-2 mb-4">
          {/* SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M18.3334 2.5H1.66675L8.33341 10.3833V15.8333L11.6667 17.5V10.3833L18.3334 2.5Z"
              stroke="#757570"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h2 className="text-[#323230] font-semibold text-lg">
            Filter & Pencarian
          </h2>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Cari program atau penyelenggara..."
            className="flex-1 bg-[#FBF8F4] border border-[#E7E1DA] rounded-lg px-4 py-2 focus:outline-none placeholder-gray-500 text-sm"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          {/* Kategori Dropdown */}
          <select
            className="bg-[#FBF8F4] border border-[#E7E1DA] rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none w-full md:w-60"
            value={kategori}
            onChange={(e) => onKategoriChange(e.target.value)}
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Beasiswa">Beasiswa</option>
            <option value="Pengabdian Masyarakat">Pengabdian Masyarakat</option>
          </select>

          {/* Status Dropdown */}
          <select
            className="bg-[#FBF8F4] border border-[#E7E1DA] rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none w-full md:w-60"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Sedang Dibuka">Sedang Dibuka</option>
            <option value="Akan Datang">Akan Datang</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>
    </section>
  );
}
