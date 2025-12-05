// src/sections/referensi_aksi/DonasiFilterBar.jsx
import React from "react";

const DonasiFilterBar = ({
  searchText,
  onSearchChange,
  jenis,
  onJenisChange,
  status,
  onStatusChange,
}) => {
  return (
    <div className="bg-white w-full h-[110px] flex items-center justify-center border border-gray-300">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3 w-full max-w-4xl px-6">
        {/* Search */}
        <div className="flex items-center w-full md:w-[50%] bg-white rounded-lg border border-gray-300 px-4 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Cari sekolah yang ingin kamu bantu..."
            className="w-full outline-none text-gray-700"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white"
            value={jenis}
            onChange={(e) => onJenisChange(e.target.value)}
          >
            <option value="Semua">Semua Jenis</option>
            <option value="Edukasi dan Literasi">Edukasi dan Literasi</option>
            <option value="Kegiatan Relawan & Volunteer">
              Kegiatan Relawan & Volunteer
            </option>
            <option value="Fasilitas Belajar & Infrastruktur">
              Fasilitas Belajar & Infrastruktur
            </option>
            <option value="Beasiswa & Bantuan Pendidikan">
              Beasiswa & Bantuan Pendidikan
            </option>
          </select>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="Semua">Semua Status</option>
            <option value="Sedang Berjalan">Sedang Berjalan</option>
            <option value="Akan Datang">Akan Datang</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DonasiFilterBar;