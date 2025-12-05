// src/sections/volunteer/ruang_volunteer/MainMMSection.jsx
import React, { useState } from "react";
import CardMateri from "../../../components/ruang_volunteer/CardMateri";
import FilterMateri from "../../../components/ruang_volunteer/FilterMateri";
import ModalTambahMateri from "../../../components/ruang_volunteer/ModalTambahMateri";
import SuccessPopup from "../../../components/ruang_volunteer/notification/SuccessPopup";

const allMaterials = [
  {
    id: 1,
    name: "Modul Literasi Dasar",
    subject: "Bahasa Indonesia",
    type: "SD Kelas 1",
    byte: "2.5 MB",
    extension: "PDF",
    total: "12 Downloads",
  },
  {
    id: 2,
    name: "Modul Numerasi Awal",
    subject: "Matematika",
    type: "SD Kelas 1",
    byte: "5.0 MB",
    extension: "Audio",
    total: "12 Downloads",
  },
  {
    id: 3,
    name: "Modul Sains Menyenangkan",
    subject: "IPA",
    type: "SD Kelas 5",
    byte: "10.2 MB",
    extension: "Video",
    total: "12 Downloads",
  },
  {
    id: 4,
    name: "Modul Membaca Cepat",
    subject: "Bahasa Indonesia",
    type: "SD Kelas 2",
    byte: "1.8 MB",
    extension: "PDF",
    total: "8 Downloads",
  },
];

const MainMMSection = () => {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const [formData, setFormData] = useState({
    judul: "",
    penulis: "",
    kategori: "",
    deskripsi: "",
    sampul: null,
    link: "",
  });

  const filters = [
    { name: "Semua", value: "Semua", total: 14 },
    { name: "SD 1", value: "SD Kelas 1", total: 10 },
    { name: "SD 2", value: "SD Kelas 2", total: 10 },
    { name: "SD 3", value: "SD Kelas 3", total: 10 },
    { name: "SD 4", value: "SD Kelas 4", total: 10 },
    { name: "SD 5", value: "SD Kelas 5", total: 8 },
    { name: "SD 6", value: "SD Kelas 6", total: 8 },
  ];

  const filteredMaterials = allMaterials.filter((material) => {
    // filter berdasarkan tombol SD 1 / SD 2 / dst
    if (activeFilter !== "Semua" && material.type !== activeFilter) {
      return false;
    }

    // kalau search kosong, cukup cek filter kelas saja
    if (!search.trim()) return true;

    const term = search.toLowerCase();

    // cek di: nama modul, mapel, dan kelas
    const matchByName = material.name.toLowerCase().includes(term);
    const matchBySubject = material.subject.toLowerCase().includes(term);
    const matchByType = material.type.toLowerCase().includes(term);

    return matchByName || matchBySubject || matchByType;
  });

  // Kirim data rekomendasi buku ke backend
  const handleSubmit = async () => {
    try {
      const payload = {
        title: formData.judul,
        author: formData.penulis,
        // mapping sederhana kategori → category (bisa diubah sesuai kebutuhan)
        category: formData.kategori === "Literasi Dasar" ? "fiksi" : "nonfiksi",
        description: formData.deskripsi,
        link: formData.link,
      };

      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan buku");
      }

      setIsOpen(false);
      setShowNotif(true);

      // reset form
      setFormData({
        judul: "",
        penulis: "",
        kategori: "",
        deskripsi: "",
        sampul: null,
        link: "",
      });

      setTimeout(() => setShowNotif(false), 2500);
    } catch (error) {
      console.error("Error saat menyimpan buku:", error);
      alert("Gagal menyimpan buku, cek console backend.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-7 py-20 px-12">
      {/* HEADER */}
      <div className="text-6xl font-bold text-center flex flex-col items-center gap-y-4 p-[42px_128px] rounded-[20px] bg-[linear-gradient(85deg,rgba(255,157,1,0.85)_22.33%,rgba(49,123,116,0.85)_77.67%)]">
        <div>
          <span className="bg-[#FFFFFF] bg-clip-text text-transparent drop-shadow-md">
            Materi
          </span>{" "}
          <span className="bg-[linear-gradient(90deg,#FFB54D_0%,#FBF8F4_25.48%,#FFB54D_100%)] bg-clip-text text-transparent drop-shadow-md">
            Multimedia
          </span>
        </div>

        <div className="flex max-w-[55%] text-lg font-normal text-white text-center flex-col items-center font-sans">
          Akses berbagai format materi pembelajaran yang siap digunakan
          dalam kegiatan mengajar
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari Modul..."
        className="w-[80%] px-5 py-3 bg-white rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-[#FE9015]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div className="flex gap-x-2 items-center">
        {filters.map((filter) => (
          <FilterMateri
            key={filter.name}
            name={filter.name}
            total={filter.total}
            isActive={activeFilter === filter.value}
            onClick={() => setActiveFilter(filter.value)}
          />
        ))}

        {/* BUTTON TAMBAH + */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-9 h-9 text-2xl flex justify-center items-center bg-[#FF9500] text-white rounded-full hover:bg-[#e57f0f] transition"
        >
          +
        </button>
      </div>

      {/* GRID MATERI */}
      <div className="w-full justify-between grid grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <CardMateri
            key={material.id}
            id={material.id}
            name={material.name}
            subject={material.subject}
            type={material.type}
            byte={material.byte}
            extension={material.extension}
            total={material.total}
          />
        ))}

        {filteredMaterials.length === 0 && (
          <div className="text-center col-span-3 text-gray-500">
            Tidak ada materi untuk kata kunci atau filter ini.
          </div>
        )}
      </div>

      {/* MODAL ADD MATERI */}
      <ModalTambahMateri
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />

      {/* POPUP SUKSES */}
      <SuccessPopup show={showNotif} entity="Rekomendasi Buku" />
    </div>
  );
};

export default MainMMSection;