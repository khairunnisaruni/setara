// src/sections/volunteer/ruang_volunteer/MainMMSection.jsx
import React, { useState, useEffect } from "react";
import CardMateri from "../../../components/ruang_volunteer/CardMateri";
import FilterMateri from "../../../components/ruang_volunteer/FilterMateri";
import ModalTambahMateri from "../../../components/ruang_volunteer/ModalTambahMateri";
import SuccessPopup from "../../../components/ruang_volunteer/notification/SuccessPopup";

// Data dummy awal (fallback kalau fetch gagal / kosong)
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

  // State di parent, disesuaikan dengan field yang dipakai ModalTambahMateri
  const [formData, setFormData] = useState({
    // field lama (kalau nanti masih dipakai fitur buku)
    judul: "",
    penulis: "",
    kategori: "",
    deskripsi: "",
    sampul: null,
    link: "",
    // field untuk materi multimedia (dipakai modal)
    title: "",
    fileType: "",
    classCategory: "",
    materialCategory: "",
    description: "",
    file: null,
  });

  // Data materi yang sudah disetujui admin (diambil dari backend)
  const [materials, setMaterials] = useState([]);

  const filters = [
    { name: "Semua", value: "Semua", total: 14 },
    { name: "SD 1", value: "SD Kelas 1", total: 10 },
    { name: "SD 2", value: "SD Kelas 2", total: 10 },
    { name: "SD 3", value: "SD Kelas 3", total: 10 },
    { name: "SD 4", value: "SD Kelas 4", total: 10 },
    { name: "SD 5", value: "SD Kelas 5", total: 8 },
    { name: "SD 6", value: "SD Kelas 6", total: 8 },
  ];

  // Helper untuk map kategori_kelas_id -> label kelas (sesuai desain lama)
  const mapKelasLabel = (id) => {
    switch (id) {
      case 1:
        return "SD Kelas 1";
      case 2:
        return "SD Kelas 2";
      case 3:
        return "SD Kelas 3";
      case 4:
        return "SD Kelas 4";
      case 5:
        return "SD Kelas 5";
      case 6:
        return "SD Kelas 6";
      default:
        return "SD Kelas 1";
    }
  };

  // Ambil materi yang status-nya approved dari backend
  const fetchApprovedMaterials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/materials/approved");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil materi");
      }

      // Mapping baris DB -> properti yang dipakai CardMateri
      const mapped = data.map((row) => ({
        id: row.id,
        name: row.title,
        subject: "—", // ganti kalau nanti ada kolom mapel di tabel
        type: mapKelasLabel(row.kategori_kelas_id),
        byte: "—", // bisa diisi ukuran file kalau disimpan di DB
        extension:
          row.file_type === "audio"
            ? "Audio"
            : row.file_type === "video"
            ? "Video"
            : "PDF",
        total: "0 Downloads",
      }));

      setMaterials(mapped);
    } catch (err) {
      console.error("Gagal fetch materi approved:", err);
      // Kalau error, biarkan materials kosong -> fallback ke allMaterials
    }
  };

  // Panggil sekali saat halaman dibuka
  useEffect(() => {
    fetchApprovedMaterials();
  }, []);

  // Pakai data dari DB kalau sudah ada, kalau belum pakai dummy
  const sourceMaterials = materials.length > 0 ? materials : allMaterials;

  const filteredMaterials = sourceMaterials.filter((material) => {
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

  // Kirim data MATERI multimedia ke backend (pakai FormData + file)
  const handleSubmit = async () => {
    try {
      const materiData = {
        title: formData.title,
        description: formData.description,
        fileType: formData.fileType,
        classCategory: formData.classCategory,
        materialCategory: formData.materialCategory,
        file: formData.file,
      };

      console.log("Data materi dari form (parent):", materiData);

      // Validasi minimal: judul & file wajib
      if (!materiData.title || !materiData.file) {
        alert("Judul dan file wajib diisi.");
        return;
      }

      // 🔹 AMBIL TOKEN DARI LOCAL STORAGE
      // GANTI 'token' JIKA DI LOGIN KAMU PAKAI NAMA KEY LAIN (mis: 'accessToken')
      const token = localStorage.getItem("token");

      if (!token) {
        alert(
          "Tidak ada token. Kamu mungkin belum login atau session sudah habis. Silakan login ulang."
        );
        return;
      }

      const fd = new FormData();
      fd.append("title", materiData.title);
      fd.append("description", materiData.description || "");
      fd.append("fileType", materiData.fileType || "");
      fd.append("classCategory", materiData.classCategory || "");
      fd.append("materialCategory", materiData.materialCategory || "");
      fd.append("file", materiData.file);

      const response = await fetch("http://localhost:5000/api/materials", {
        method: "POST",
        headers: {
          // jangan set "Content-Type" manual kalau pakai FormData
          Authorization: `Bearer ${token}`, // 🔹 KIRIM TOKEN KE BACKEND
        },
        body: fd,
      });

      const result = await response.json();
      console.log("Response backend materi:", result);

      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan materi");
      }

      setIsOpen(false);
      setShowNotif(true);

      // reset semua field form
      setFormData({
        judul: "",
        penulis: "",
        kategori: "",
        deskripsi: "",
        sampul: null,
        link: "",
        title: "",
        fileType: "",
        classCategory: "",
        materialCategory: "",
        description: "",
        file: null,
      });

      // Refresh list materi approved (kalau admin sudah approve, akan muncul)
      fetchApprovedMaterials();

      setTimeout(() => setShowNotif(false), 2500);
    } catch (error) {
      console.error("Error saat menyimpan materi:", error);
      alert(error.message || "Gagal menyimpan materi, cek console backend.");
    }
  };

  // ====== DESAIN DI BAWAH INI TIDAK DIUBAH ======
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
          Akses berbagai format materi pembelajaran yang siap digunakan dalam
          kegiatan mengajar
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
      {/* entity bisa kamu ganti jadi "Materi Multimedia" kalau mau lebih spesifik */}
      <SuccessPopup show={showNotif} entity="Materi Multimedia" />
    </div>
  );
};

export default MainMMSection;
