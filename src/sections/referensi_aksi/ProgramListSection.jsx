// src/sections/referensi_aksi/ProgramListSection.jsx
import React, { useState } from "react";
import ProgramCard from "../../components/referensi_aksi/ProgramCard";

// Data program VOLUNTEER / beasiswa / pengabdian
const PROGRAM_LIST = [
  {
    id: 1,
    kategori: "Volunteer",
    status: "Akan Datang",
    judul: "Volunteer Mengajar Satu Desa",
    penyelenggara: "Komunitas Aksi Muda Indonesia",
    deskripsi:
      "Aksi langsung ke desa-desa untuk mengajar anak-anak SD yang belum memiliki akses belajar memadai.",
    periode: "Mei – Juni 2025",
    deadline: "25 April 2025",
    link: "https://contoh-volunteer.com",
    image: "./src/assets/Volunteer_mengajar_satu_desa.png",
  },
  {
    id: 2,
    kategori: "Volunteer",
    status: "Akan Datang",
    judul: "Program Kampus Mengajar",
    penyelenggara: "Kemendikbud",
    deskripsi:
      "Kesempatan bagi mahasiswa untuk mengajar anak-anak di daerah 3T.",
    periode: "April – Juni 2025",
    deadline: "28 Maret 2025",
    link: "https://contoh-kampus-mengajar.com",
    image: "./src/assets/Kampus_mengajar.png",
  },
  {
    id: 3,
    kategori: "Beasiswa",
    status: "Sedang Dibuka",
    judul: "Beasiswa Pendidikan Bright Futures 2025",
    penyelenggara: "Yayasan Indonesia Cerdas",
    deskripsi:
      "Beasiswa untuk mahasiswa aktif dengan minat kontribusi di bidang pendidikan masyarakat.",
    periode: "Januari – Desember 2025",
    deadline: "29 Desember 2024",
    link: "https://contoh-beasiswa.com",
    image: "./src/assets/beasiswa_pendidikan_bright_future.png",
  },
  {
    id: 4,
    kategori: "Pengabdian Masyarakat",
    status: "Sedang Dibuka",
    judul: "Relawan Pengajar Desa 2025",
    penyelenggara: "Yayasan Cahaya Literasi Indonesia",
    deskripsi:
      "Mengajar anak-anak di daerah 3T dengan metode pembelajaran yang menyenangkan.",
    periode: "April – Juli 2025",
    deadline: "18 Maret 2025",
    link: "https://contoh-pengabdian.com",
    image: "./src/assets/relawan_pengajar_desa.png",
  },
];

export default function ProgramListSection({
  searchText = "",
  kategori = "Semua",
  status = "Semua",
}) {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const filteredPrograms = PROGRAM_LIST.filter((p) => {
    const matchKategori = kategori === "Semua" || p.kategori === kategori;
    const matchStatus = status === "Semua" || p.status === status;

    const q = searchText.trim().toLowerCase();
    const matchSearch =
      !q ||
      p.judul.toLowerCase().includes(q) ||
      p.penyelenggara.toLowerCase().includes(q) ||
      p.kategori.toLowerCase().includes(q) ||
      p.deskripsi.toLowerCase().includes(q); // filter teks di beberapa field [web:340]

    return matchKategori && matchStatus && matchSearch;
  });

  return (
    <div className="mt-10 px-12 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredPrograms.length === 0 ? (
        <div className="col-span-4 text-center text-gray-500">
          Tidak ada program yang cocok dengan filter ini.
        </div>
      ) : (
        filteredPrograms.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onDetail={() => setSelectedProgram(program)}
          />
        ))
      )}

      {/* Modal detail sederhana, pakai data dari ProgramCard yang dipilih */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[700px] max-h-[90vh] overflow-y-auto relative p-6">
            <button
              className="cursor-pointer absolute top-2 right-4 text-3xl font-bold"
              onClick={() => setSelectedProgram(null)}
            >
              ×
            </button>

            <img
              src={selectedProgram.image}
              alt={selectedProgram.judul}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />

            <h2 className="text-xl font-bold mb-1">
              {selectedProgram.judul}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {selectedProgram.penyelenggara}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {selectedProgram.deskripsi}
            </p>

            <p className="text-sm font-medium text-[#317B74] mb-1">
              Periode: {selectedProgram.periode}
            </p>
            <p className="text-sm mb-3">
              <span className="bg-[#FFE5FE] text-[#8A38F5] px-3 py-0.5 rounded-full text-xs font-medium">
                Deadline: {selectedProgram.deadline}
              </span>
            </p>

            <a
              href={selectedProgram.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-[#FF9D01] text-white rounded-lg text-sm font-medium hover:bg-[#e88a00]"
            >
              Kunjungi Sumber
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
