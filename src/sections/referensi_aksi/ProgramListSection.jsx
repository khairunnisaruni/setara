import React from "react";
import ProgramCard from "../../components/referensi_aksi/ProgramCard";

const programs = [
  {
    id: 1,
    kategori: "Volunteer",
    status: "Akan Datang",
    judul: "Volunteer Mengajar Satu Desa",
    penyelenggara: "Komunitas Aksi Muda Indonesia",
    deskripsi:
      "Aksi langsung ke desa-desa untuk mengajar anak-anak SD dengan fokus pembelajaran aktif dan menyenangkan.",
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
      "Kesempatan bagi mahasiswa untuk mengajar di sekolah dasar di seluruh Indonesia.",
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
      "Beasiswa untuk mahasiswa aktif yang berkomitmen pada bidang pendidikan dan pengabdian masyarakat.",
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
      "Kesempatan bagi mahasiswa untuk mengajar dan mendampingi anak-anak desa dengan metode kreatif.",
    periode: "April – Juli 2025",
    deadline: "18 Maret 2025",
    link: "#",
    image: "src/assets/relawan_pengajar_desa.png",
  },
];

export default function ProgramListSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-12 pb-12">
      <div className="grid gap-6 grid-cols-4 justify-start items-start">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
}
