// src/sections/referensi_aksi/ProgramListSection.jsx
import React, { useState, useEffect } from "react";
import ProgramCard from "../../components/referensi_aksi/ProgramCard";

// Data dummy fallback
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
  // ...dst (biarkan seperti sekarang)
];

const mapKategori = (jenis_program) => {
  // sesuaikan dengan nilai di kolom jenis_program tabel programs
  if (jenis_program === "Volunteer") return "Volunteer";
  if (jenis_program === "Beasiswa") return "Beasiswa";
  if (jenis_program === "Pengabdian Masyarakat") return "Pengabdian Masyarakat";
  return jenis_program || "Volunteer";
};

const mapStatusProgram = (status_program) => {
  // misal di DB: 'akan datang', 'sedang dibuka', 'selesai'
  if (!status_program) return "Akan Datang";
  const lower = status_program.toLowerCase();
  if (lower === "akan datang") return "Akan Datang";
  if (lower === "sedang dibuka") return "Sedang Dibuka";
  if (lower === "selesai") return "Selesai";
  return status_program;
};

export default function ProgramListSection({
  searchText = "",
  kategori = "Semua",
  status = "Semua",
}) {
  const [selectedProgram, setSelectedProgram] = useState(null);

  // data program approved dari backend
  const [programs, setPrograms] = useState([]);

  // ambil program yang sudah di-approve admin
  useEffect(() => {
    const fetchApprovedPrograms = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/programs/approved");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal mengambil program approved");
        }

        const mapped = data.map((row) => ({
          id: row.id,
          kategori: mapKategori(row.jenis_program),
          status: mapStatusProgram(row.status_program),
          judul: row.judul_program,
          penyelenggara: row.penyelenggara,
          deskripsi: row.deskripsi_program || "",
          periode: row.periode_tanggal || "",
          deadline: row.deadline_pendaftaran || "",
          link: row.tautan_sumber_resmi || "#",
          image: row.poster_banner || "./src/assets/Volunteer_mengajar_satu_desa.png",
        }));

        setPrograms(mapped);
      } catch (err) {
        console.error("Gagal fetch program approved:", err);
        // kalau error, biarkan kosong -> fallback ke PROGRAM_LIST
      }
    };

    fetchApprovedPrograms();
  }, []);

  // gunakan data backend jika ada, kalau tidak pakai dummy
  const sourcePrograms =
    programs && programs.length > 0 ? programs : PROGRAM_LIST;

  const filteredPrograms = sourcePrograms.filter((p) => {
    const matchKategori = kategori === "Semua" || p.kategori === kategori;
    const matchStatus = status === "Semua" || p.status === status;

    const q = searchText.trim().toLowerCase();
    const matchSearch =
      !q ||
      p.judul.toLowerCase().includes(q) ||
      p.penyelenggara.toLowerCase().includes(q) ||
      p.kategori.toLowerCase().includes(q) ||
      p.deskripsi.toLowerCase().includes(q);

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