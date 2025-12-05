
import React, { useState, useEffect } from "react";
import CardDaftarKuis from "./CardDaftarKuis";
import AddQuizModal from "../../components/admin/modals/Quiz/AddQuiz";

// Fallback data kalau fetch gagal / belum ada data
const DATA_KUIS_DEFAULT = [
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
];

// Mapping ID kelas dari DB -> label tampilan
const mapKelasLabel = (kategoriKelasId) => {
  switch (kategoriKelasId) {
    case 1:
      return "1 SD";
    case 2:
      return "2 SD";
    case 3:
      return "3 SD";
    case 4:
      return "4 SD";
    case 5:
      return "5 SD";
    case 6:
      return "6 SD";
    default:
      return "1 SD";
  }
};

// Mapping enum platform di DB -> label tampilan
const mapPlatformLabel = (platformEnum) => {
  // di DB: enum('wayground','kahoot')
  if (platformEnum === "kahoot") return "Kahoot";
  if (platformEnum === "wayground") return "Wayground";
  return "Kahoot";
};

const getPlatformImage = (platformEnum) => {
  if (platformEnum === "kahoot") return "src/assets/kahoot.png";
  if (platformEnum === "wayground") return "src/assets/wayground.png";
  return "src/assets/kahoot.png";
};

const DaftarKuis = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [kelasFilter, setKelasFilter] = useState("Semua Kelas");
  const [mapelFilter, setMapelFilter] = useState("Semua Mata Pelajaran");
  const [platformFilter, setPlatformFilter] = useState("Semua Platform");

  // data kuis dari backend
  const [quizzes, setQuizzes] = useState([]);

  // === FUNGSI SUBMIT KE BACKEND (dipanggil dari AddQuizModal) ===
  const handleSubmitQuiz = async (formData) => {
    const body = new FormData();
    body.append("title", formData.title);
    body.append("description", formData.description);
    body.append("platform", formData.platform);
    body.append("link", formData.link);
    body.append("subjectCategory", formData.subjectCategory);
    body.append("classCategory", formData.classCategory);
    if (formData.file) {
      body.append("file", formData.file);
    }

    const res = await fetch("http://localhost:5000/api/kuis", {
      method: "POST",
      body,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Gagal menambah kuis");
    }
  };

  // Ambil kuis approved dari backend saat pertama kali load
  useEffect(() => {
    const fetchApprovedQuizzes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/kuis/approved");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal mengambil kuis approved");
        }

        // Mapping baris DB -> struktur yang dipakai CardDaftarKuis
        const mapped = data.map((row) => ({
          id: row.id,
          gambar: "src/assets/bxs_school.png",
          kelas: mapKelasLabel(row.kategori_kelas_id),
          // TODO: map kategori_id -> nama mapel kalau sudah ada tabel kategori
          mapel: "Bahasa Inggris",
          judul: row.title,
          deskripsi: row.description || "",
          platform: mapPlatformLabel(row.platform),
          gambarplatform: getPlatformImage(row.platform),
        }));

        setQuizzes(mapped);
      } catch (error) {
        console.error("Gagal fetch kuis approved:", error);
        // fallback ke data default kalau error
        setQuizzes(DATA_KUIS_DEFAULT);
      }
    };

    fetchApprovedQuizzes();
  }, []);

  // Kalau fetch berhasil, pakai quizzes; kalau belum, pakai default
  const sourceKuis =
    quizzes && quizzes.length > 0 ? quizzes : DATA_KUIS_DEFAULT;

  // Filter berdasarkan kata kunci + dropdown
  const filteredKuis = sourceKuis.filter((kuis) => {
    const term = searchTerm.trim().toLowerCase();

    const matchSearch =
      !term ||
      kuis.judul.toLowerCase().includes(term) ||
      kuis.mapel.toLowerCase().includes(term) ||
      kuis.kelas.toLowerCase().includes(term) ||
      kuis.deskripsi.toLowerCase().includes(term) ||
      kuis.platform.toLowerCase().includes(term);

    const matchKelas =
      kelasFilter === "Semua Kelas" || kuis.kelas === kelasFilter;

    const matchMapel =
      mapelFilter === "Semua Mata Pelajaran" || kuis.mapel === mapelFilter;

    const matchPlatform =
      platformFilter === "Semua Platform" || kuis.platform === platformFilter;

    return matchSearch && matchKelas && matchMapel && matchPlatform;
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
        <select
          className="bg-white w-full md:w-40 py-2 px-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
          value={kelasFilter}
          onChange={(e) => setKelasFilter(e.target.value)}
        >
          <option value="Semua Kelas" className="text-[#B0AA9C]">
            Semua Kelas
          </option>
          <option value="1 SD">1 SD</option>
          <option value="2 SD">2 SD</option>
          <option value="3 SD">3 SD</option>
          <option value="4 SD">4 SD</option>
          <option value="5 SD">5 SD</option>
          <option value="6 SD">6 SD</option>
        </select>

        {/* Dropdown Mapel */}
        <select
          className="bg-white w-full md:w-48 py-2 px-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
          value={mapelFilter}
          onChange={(e) => setMapelFilter(e.target.value)}
        >
          <option value="Semua Mata Pelajaran" className="text-[#B0AA9C]">
            Semua Mata Pelajaran
          </option>
          <option value="Bahasa Inggris">Bahasa Inggris</option>
          <option value="Matematika">Matematika</option>
          <option value="IPA">IPA</option>
          <option value="IPS">IPS</option>
        </select>

        {/* Dropdown Platform */}
        <select
          className="bg-white w-full md:w-44 py-2 px-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="Semua Platform" className="text-[#B0AA9C]">
            Semua Platform
          </option>
          <option value="Kahoot">Kahoot</option>
          <option value="Wayground">Wayground</option>
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
            Kuis tidak ditemukan untuk kata kunci / filter tersebut.
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

      {/* Modal Tambah Kuis – desain dari AddQuiz.jsx */}
      <AddQuizModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmitQuiz}
      />
    </div>
  );
};

export default DaftarKuis;
