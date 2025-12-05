// src/sections/volunteer/ruang_volunteer/MainCLSection.jsx
import React, { useState, useEffect } from "react";
import CardCerita from "../../../components/ruang_volunteer/CardCerita";
import ModalCerita from "../../../components/ruang_volunteer/ModalCerita";
import ModalDetailCerita from "../../../components/ruang_volunteer/ModalDetailCerita";
import SuccessPopup from "../../../components/ruang_volunteer/notification/SuccessPopup";
import { HiPlus, HiArrowRight } from "react-icons/hi";

// data contoh (fallback jika fetch gagal / belum ada data)
const STORIES_DUMMY = [
  {
    id: 1,
    name: "Sri Rafena",
    date: "12 September 2025",
    title: "Kelas Pertama dengan Anak-Anak Pantai Selatan",
    content:
      "Angin laut yang kencang tak menghalangi semangat anak-anak mengikuti kelas literasi. Mereka begitu antusias membaca cerita rakyat Nusantara...",
  },
];

const formatTanggal = (isoString) => {
  if (!isoString) return "";
  const tanggal = new Date(isoString);
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const MainCLSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [judul, setJudul] = useState("");
  const [cerita, setCerita] = useState("");
  const [showNotif, setShowNotif] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const [likedStories, setLikedStories] = useState({});

  // cerita approved dari backend
  const [stories, setStories] = useState([]);

  const toggleLike = (id) => {
    setLikedStories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ambil cerita yang sudah approved dari backend
  const fetchApprovedStories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cerita/approved");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil cerita approved");
      }

      const mapped = data.map((row) => ({
        id: row.id,
        name: "Relawan SETARA", // bisa diganti kalau nanti join ke tabel users
        date: formatTanggal(row.created_at),
        title: row.title,
        // tampilkan ringkasan (mis. 200 karakter pertama)
        content:
          row.content && row.content.length > 200
            ? row.content.slice(0, 200) + "..."
            : row.content || "",
        fullContent: row.content || "",
      }));

      setStories(mapped);
    } catch (err) {
      console.error("Gagal fetch cerita approved:", err);
      // fallback ke dummy kalau error
      setStories(STORIES_DUMMY);
    }
  };

  // panggil sekali saat halaman dibuka
  useEffect(() => {
    fetchApprovedStories();
  }, []);

  // submit: kirim ke backend /api/cerita (status masih pending)
  const handleSubmit = async () => {
    try {
      if (!judul || !cerita) {
        alert("Judul dan cerita wajib diisi.");
        return;
      }

      const payload = {
        title: judul,
        content: cerita,
      };

      // 🔹 ambil token dari localStorage (ganti 'token' kalau key-nya beda)
      const token = localStorage.getItem("token");
      if (!token) {
        alert(
          "Tidak ada token. Kamu mungkin belum login / session habis. Silakan login ulang."
        );
        return;
      }

      const response = await fetch("http://localhost:5000/api/cerita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ← kirim JWT ke backend
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("Respon gagal dari backend cerita:", data);
        throw new Error(data.message || "Gagal menyimpan cerita");
      }

      setIsOpen(false);
      setShowNotif(true);

      setJudul("");
      setCerita("");

      // kalau admin langsung approve, setelah refresh berikutnya akan ikut tampil
      fetchApprovedStories();

      setTimeout(() => setShowNotif(false), 2500);
    } catch (error) {
      console.error("Error saat menyimpan cerita:", error);
      alert("Gagal menyimpan cerita, cek backend.");
    }
  };

  const sourceStories =
    stories && stories.length > 0 ? stories : STORIES_DUMMY;

  return (
    <div className="flex flex-col items-center gap-y-7 py-20 px-12">
      {/* HEADER */}
      <div className="text-6xl font-bold text-center flex flex-col items-center gap-y-4 p-[42px_128px] rounded-[20px] bg-[linear-gradient(85deg,rgba(255,157,1,0.85)_22.33%,rgba(49,123,116,0.85)_77.67%)]">
        <div>
          <span className="bg-white bg-clip-text text-transparent">
            Cerita
          </span>{" "}
          <span className="bg-[linear-gradient(90deg,#FFB54D_0%,#FBF8F4_25.48%,#FFB54D_100%)] bg-clip-text text-transparent">
            Lapangan
          </span>
        </div>
        <p className="max-w-[55%] text-lg text-white text-center">
          Berbagi pengalaman dan cerita inspiratif dari kegiatan mengajar di
          lapangan
        </p>
      </div>

      {/* TOMBOL TAMBAH CERITA */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-[#FE9015] text-white rounded-full shadow"
      >
        Tambahkan Cerita <HiPlus />
      </button>

      {/* Modal Tambah Cerita */}
      <ModalCerita
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        judul={judul}
        setJudul={setJudul}
        cerita={cerita}
        setCerita={setCerita}
        onSubmit={handleSubmit}
      />

      {/* Popup Sukses */}
      <SuccessPopup show={showNotif} entity="Cerita Lapangan" />

      {/* Modal Detail */}
      <ModalDetailCerita
        isOpen={openDetail}
        onClose={() => setOpenDetail(false)}
        data={selectedStory}
        isLiked={selectedStory && likedStories[selectedStory.id]}
        onToggleLike={() => selectedStory && toggleLike(selectedStory.id)}
      />

      {/* LIST CERITA */}
      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sourceStories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-200 rounded-full" />
              <div>
                <h3 className="font-semibold">{story.name}</h3>
                <p className="text-sm text-gray-500">{story.date}</p>
              </div>
            </div>

            <h2 className="mt-4 text-lg font-bold">{story.title}</h2>

            <p className="text-sm text-gray-600 mt-2">{story.content}</p>

            <button
              onClick={() => {
                setSelectedStory(story);
                setOpenDetail(true);
              }}
              className="text-[#FE9015] font-semibold mt-4 inline-flex items-center gap-1"
            >
              Baca Selengkapnya <HiArrowRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCLSection;