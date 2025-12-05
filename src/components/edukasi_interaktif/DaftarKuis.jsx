
// src/sections/edukasi/DaftarKuis.jsx
import React, { useState } from "react";
import CardDaftarKuis from "./CardDaftarKuis";

const DATA_KUIS = [
  {
    id: 1,
    gambar: "src/assets/bxs_school.png",
    kelas: "6 SD",
    mapel: "Bahasa Inggris",
    judul: "Past Tense",
    deskripsi: "Materi Past Tense yang sesuai untuk kelas 6 Sekolah Dasar",
    platform: "Kahoot",
    gambarplatform: "src/assets/kahoot.png",
  },
  // kalau nanti ada kuis lain, tambah objek baru di sini
];

const DaftarKuis = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // filter berdasarkan kata kunci
  const filteredKuis = DATA_KUIS.filter((kuis) => {
    if (!searchTerm.trim()) return true; // kalau search kosong, tampilkan semua

    const term = searchTerm.toLowerCase();

    return (
      kuis.judul.toLowerCase().includes(term) ||
      kuis.mapel.toLowerCase().includes(term) ||
      kuis.kelas.toLowerCase().includes(term) ||
      kuis.deskripsi.toLowerCase().includes(term) ||
      kuis.platform.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-6xl mx-auto mt-16 mb-20">
      <h2 className="text-2xl text-center items-center justify-center font-bold mb-5">
        Daftar Kuis & Game Interaktif
      </h2>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="bg-white relative w-full md:w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5">
            <img src="src/assets/SVG (5).png" alt="" />
          </span>
          <input
            type="text"
            placeholder="Cari Kuis & Game..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-[#6B7280]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Dropdown Kelas */}
        <select className="bg-white w-full md:w-40 py-2 px-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500">
          <option
            className="text-[#B0AA9C]"
            value=""
            disabled
            selected
            hidden
          >
            Semua Kelas
          </option>
          <option>Kelas 1</option>
          <option>Kelas 2</option>
          <option>Kelas 3</option>
        </select>

        {/* Dropdown Mapel */}
        <select className="bg-white w-full md:w-48 py-2 px-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500">
          <option
            className="text-[#B0AA9C]"
            value=""
            disabled
            selected
            hidden
          >
            Semua Mata Pelajaran
          </option>
          <option>Matematika</option>
          <option>IPA</option>
          <option>IPS</option>
        </select>

        {/* Dropdown Platform */}
        <select className="bg-white w-full md:w-44 py-2 px-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500">
          <option
            className="text-[#B0AA9C]"
            value=""
            disabled
            selected
            hidden
          >
            Semua Platform
          </option>
          <option>Kahoot</option>
          <option>Wayground</option>
        </select>

        {/* Tombol Tambah Kuis */}
        <button
          onClick={() => setShowForm(true)}
          className="cursor-pointer w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full shadow"
        >
          + Tambah Kuis
        </button>
      </div>

      {/* Grid Kuis */}
      <div className="grid md:grid-cols-4 gap-6 mt-10">
        {filteredKuis.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500">
            Kuis tidak ditemukan untuk kata kunci tersebut.
          </div>
        ) : (
          filteredKuis.map((kuis) => (
            <CardDaftarKuis
              key={kuis.id}
              gambar={kuis.gambar}
              kelas={kuis.kelas}
              mapel={kuis.mapel}
              judul={kuis.judul}
              deskripsi={kuis.deskripsi}
              gambarplatform={kuis.gambarplatform}
            />
          ))
        )}
      </div>

      {/* Pop Up Form */}
      {showForm && (
        <form method="POST" action="http://localhost:5000/api/kuis">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-96 max-h-[90vh] overflow-y-auto animate-[fadeIn_.2s_ease]">
              <h2 className="text-xl font-bold mb-4 text-center">
                Tambah Kuis & Game
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">
                    Judul Kuis & Game
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 placeholder-[#B0AA9C]"
                    placeholder="Masukkan judul Kuis & Game"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Deskripsi (15 Kata)
                  </label>
                  <textarea
                    name="description"
                    className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 placeholder-[#B0AA9C]"
                    placeholder="Deskripsi singkat tentang kuis & game"
                  ></textarea>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Platform (Kahoot atau Wayground)
                  </label>
                  <select
                    name="platform"
                    className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400"
                  >
                    <option
                      className="text-[#B0AA9C]"
                      value=""
                      disabled
                      selected
                      hidden
                    >
                      Pilih Platform
                    </option>
                    <option value="kahoot">Kahoot</option>
                    <option value="wayground">Wayground</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Link Kuis</label>
                  <input
                    type="url"
                    name="link"
                    className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] placeholder-[#B0AA9C] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    placeholder="Masukkan Link Kahoot atau Wayground"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Kategori Mata Pelajaran
                  </label>
                  <select className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400">
                    <option
                      className="text-[#B0AA9C]"
                      value=""
                      disabled
                      selected
                      hidden
                    >
                      Pilih Mapel
                    </option>
                    <option>Bahasa Inggris</option>
                    <option>Matematika</option>
                    <option>IPA</option>
                    <option>IPS</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Kategori Kelas
                  </label>
                  <select className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400">
                    <option
                      className="text-[#B0AA9C]"
                      value=""
                      disabled
                      selected
                      hidden
                    >
                      Pilih Kelas
                    </option>
                    <option>1 SD</option>
                    <option>2 SD</option>
                    <option>3 SD</option>
                    <option>4 SD</option>
                    <option>5 SD</option>
                    <option>6 SD</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Upload Gambar Pendukung
                  </label>
                  <label className="flex items-center gap-2 w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] text-[#B0AA9C] rounded-xl px-3 py-2 cursor-pointer">
                    <img
                      src="src/assets/upload.png"
                      className="w-5"
                      alt="upload"
                    />
                    <span className="text-sm">Unggah File</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="font-bold px-4 py-2 w-36 rounded-xl border border-gray-300 hover:bg-gray-100 text-[#FFA01A]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="font-bold px-4 py-2 w-36 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default DaftarKuis;
