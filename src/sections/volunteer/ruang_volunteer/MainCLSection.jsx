import React from "react";
import CardCerita from "../../../components/ruang_volunteer/CardCerita";
import ModalCerita from "../../../components/ruang_volunteer/ModalCerita";
import ModalDetailCerita from "../../../components/ruang_volunteer/ModalDetailCerita"; // ✅ WAJIB ADA
import SuccessPopup from "../../../components/ruang_volunteer/notification/SuccessPopup";
import { HiPlus, HiArrowRight } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";

const stories = [
  {
    id: 1,
    name: "Sri Rafena",
    date: "12 September 2025",
    title: "Kelas Pertama dengan Anak-Anak Pantai Selatan",
    content:
      "Angin laut yang kencang tak menghalangi semangat anak-anak mengikuti kelas literasi. Mereka begitu antusias membaca cerita rakyat Nusantara...",
  },
  {
    id: 2,
    name: "Wella",
    date: "3 Oktober 2025",
    title: "Belajar Matematika dengan Media Alam",
    content:
      "Saya mengajak anak-anak menghitung batu di sungai sebagai cara belajar penjumlahan. Ternyata metode sederhana ini membuat mereka sangat cepat memahami konsep dasar...",
  },
  {
    id: 3,
    name: "Nadia Putri",
    date: "18 Oktober 2025",
    title: "Tertawa Bersama Saat Mengajar di Rumah Panggung",
    content:
      "Di dalam rumah panggung sederhana, kami belajar sambil bermain tebak kata. Suasana hangat dan penuh tawa membuat anak-anak berani membaca lantang...",
  },
  {
    id: 4,
    name: "Gilang Saputra",
    date: "26 Oktober 2025",
    title: "Menembus Hutan untuk Mengajar",
    content:
      "Butuh hampir dua jam berjalan kaki melewati hutan untuk mencapai lokasi belajar. Namun rasa lelah hilang seketika melihat anak-anak berbaris rapi menyambut kedatangan saya...",
  },
  {
    id: 5,
    name: "Siti Rahmah",
    date: "2 November 2025",
    title: "Serunya Kelas Menggambar di Desa Sungai Kapuas",
    content:
      "Anak-anak sangat senang saat diberi kertas dan crayon. Mereka menggambar rumah, sungai, dan hewan-hewan setempat. Kreativitas mereka benar-benar mengejutkan...",
  },
  {
    id: 6,
    name: "Jonathan Marbun",
    date: "10 November 2025",
    title: "Kegiatan Baca Buku di Halaman Sekolah",
    content:
      "Kami menggelar kegiatan membaca di bawah pohon besar. Dengan suara pelan namun penuh semangat, mereka menceritakan kembali isi buku yang baru saja dibaca...",
  },
];

const MainCLSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [judul, setJudul] = useState("");
  const [cerita, setCerita] = useState("");
  const [showNotif, setShowNotif] = useState(false);

  const handleSubmit = () => {
    setIsOpen(false);
    setShowNotif(true);

    setJudul("");
    setCerita("");

    setTimeout(() => setShowNotif(false), 2500);
  };

  const [openDetail, setOpenDetail] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const [likedStories, setLikedStories] = useState({});

  const toggleLike = (id) => {
    setLikedStories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col items-center gap-y-7 py-20 px-12">
      {/* HEADER */}
      <div className="text-6xl font-bold text-center flex flex-col items-center gap-y-4 p-[42px_128px] rounded-[20px] bg-[linear-gradient(85deg,rgba(255,157,1,0.85)_22.33%,rgba(49,123,116,0.85)_77.67%)]">
        <div>
          <span className="bg-white bg-clip-text text-transparent">Cerita</span>{" "}
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
        isLiked={likedStories[selectedStory?.id]}
        onToggleLike={() => toggleLike(selectedStory.id)}
      />

      {/* LIST CERITA */}
      <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
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
