import React, { useState } from "react";
import ProgramCard from "../../components/referensi_aksi/ProgramCard";
import ModalDetailProgram from "../../components/referensi_aksi/ModalDetailProgram";

const programs = [
  {
    id: 1,
    kategori: "Volunteer",
    status: "Akan Datang",
    judul: "Volunteer Mengajar Satu Desa",
    penyelenggara: "Komunitas Aksi Muda Indonesia",
    deskripsi:
      "Aksi langsung ke desa-desa untuk mengajar anak-anak SD yang belum memiliki akses belajar memadai, fokus pembelajaran aktif dan menyenangkan.",
    periode: "Mei – Juni 2025",
    deadline: "25 April 2025",
    link: "#",
    image: "src/assets/Volunteer_mengajar_satu_desa.png",
  },
  {
    id: 2,
    kategori: "Volunteer",
    status: "Akan Datang",
    judul: "Program Kampus Mengajar",
    penyelenggara: "Kemendikbud",
    deskripsi:
      "Kesempatan bagi mahasiswa untuk mengajar anak-anak di daerah 3T (Tertinggal, Terdepan, Terluar) dengan fokus pada kemampuan membaca, menulis, dan berhitung dasar.",
    periode: "April – Juni 2025",
    deadline: "28 Maret 2025",
    link: "#",
    image: "src/assets/Kampus_mengajar.png",
  },
  {
    id: 3,
    kategori: "Beasiswa",
    status: "Sedang Dibuka",
    judul: "Beasiswa Pendidikan Bright Futures 2025",
    penyelenggara: "Yayasan Indonesia Cerdas",
    deskripsi:
      "Beasiswa untuk mahasiswa aktif yang memiliki kontribusi di bidang pendidikan masyarakat, dengan dukungan mentoring dan pelatihan leadership.",
    periode: "Januari – Desember 2025",
    deadline: "29 Desember 2024",
    link: "#",
    image: "src/assets/beasiswa_pendidikan_bright_future.png",
  },
  {
    id: 4,
    kategori: "Pengabdian Masyarakat",
    status: "Sedang Dibuka",
    judul: "Relawan Pengajar Desa 2025",
    penyelenggara: "Yayasan Cahaya Literasi Indonesia",
    deskripsi:
      "Kesempatan bagi mahasiswa untuk mengajar anak-anak di daerah 3T dengan metode pembelajaran kreatif, interaktif, dan menyenangkan.",
    periode: "April – Juli 2025",
    deadline: "18 Maret 2025",
    link: "#",
    image: "src/assets/relawan_pengajar_desa.png",
  },
];

export default function ProgramListSection() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onDetail={() => setSelectedProgram(program)}
            />
          ))}
        </div>
      </section>

      <ModalDetailProgram
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />
    </>
  );
}
