import React from "react";

const DonasiFilterBar = () => {
  return (
    <div className="bg-white w-full h-[136.8px] shadow-sm rounded-xl flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3 w-full max-w-4xl px-6">
        {/* Search */}
        <div className="flex items-center w-full md:w-[50%] bg-white rounded-lg border border-gray-300 px-4 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Cari sekolah yang ingin kamu bantu..."
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white">
            <option>Semua Jenis</option>
            <option>Edukasi dan Literasi</option>
            <option>Relawan</option>
            <option>Fasilitas Belajar</option>
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white">
            <option>Semua Status</option>
            <option>Sedang Berjalan</option>
            <option>Selesai</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DonasiFilterBar;
