import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import CardBuku from "../../../components/ruang_volunteer/CardBuku";
import ModalPojokBuku from "../../../components/ruang_volunteer/ModalPojokBuku";
import SuccessPopup from "../../../components/ruang_volunteer/notification/SuccessPopup";
import ModalDetailBuku from "../../../components/ruang_volunteer/ModalDetailBuku";

const MainPBSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    judul: "",
    penulis: "",
    kategori: "",
    deskripsi: "",
    sampul: null,
    link: "",
  });

  const [showNotif, setShowNotif] = useState(false);

  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    setIsOpen(false);
    setShowNotif(true);

    // auto hide popup setelah 2.5 detik
    setTimeout(() => {
      setShowNotif(false);
    }, 2500);
  };

  const [openDetail, setOpenDetail] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const bukuList = [
    {
      id: 1,
      title: "Buku Pintar Membaca",
      category: "Literasi Dasar",
      desc: "Metode pembelajaran membaca yang menyenangkan untuk anak usia dini",
      cover: "",
      penulis: "Mark Lee",
      link: "hey",
    },
    {
      id: 2,
      title: "Buku Pintar Membaca",
      category: "Literasi Dasar",
      desc: "Metode pembelajaran membaca yang menyenangkan untuk anak usia dini",
      cover: "",
      penulis: "Mark Lee",
      link: "hey",
    },
    {
      id: 3,
      title: "Buku Pintar Membaca",
      category: "Literasi Dasar",
      desc: "Metode pembelajaran membaca yang menyenangkan untuk anak usia dini",
      cover: "",
      penulis: "Mark Lee",
      link: "hey",
    },
  ];

  return (
    <div className=" flex flex-col items-center gap-y-7 py-20 px-12">
      <div className=" text-6xl font-bold text-center flex flex-col items-center gap-y-4  p-[42px_128px] rounded-[20px] bg-[linear-gradient(85deg,rgba(255,157,1,0.85)_22.33%,rgba(49,123,116,0.85)_77.67%)]">
        {" "}
        <div>
          <span className="bg-[#FFFFFF] bg-clip-text text-transparent drop-shadow-md">
            Pojok
          </span>{" "}
          <span className="bg-[linear-gradient(90deg,#FFB54D_0%,#FBF8F4_25.48%,#FFB54D_100%)] bg-clip-text text-transparent drop-shadow-md">
            Buku
          </span>
        </div>
        <div className="flex max-w-[55%] text-lg font-normal text-[#FFFFFF] text-center flex-col items-center font-sans">
          <div>
            Bagikan dan temukan rekomendasi buku terbaik untuk pembelajaran
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER + ADD */}
      <div className="w-full max-w-6xl flex items-center justify-between">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari Buku..."
          className="w-[80%] px-5 py-3 bg-white rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-[#FE9015]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex items-center gap-3">
          {/* Filter */}
          <button className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-sm hover:bg-gray-100 transition">
            <FiFilter size={18} />
            <span>Filter</span>
          </button>

          {/* Add Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="px-5 py-3 bg-[#FE9015] hover:bg-[#e57f0f] text-white rounded-xl flex items-center gap-2 shadow"
          >
            <HiPlus size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Modal Form Buku */}
      <ModalPojokBuku
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />

      <SuccessPopup show={showNotif} entity="Rekomendasi Buku" />

      {/* Card Buku */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bukuList.map((book) => (
          <CardBuku
            key={book.id}
            title={book.title}
            category={book.category}
            desc={book.desc}
            cover={book.cover}
            penulis={book.penulis}
            link={book.link}
            onDetail={() => {
              setSelectedBook(book);
              setOpenDetail(true);
            }}
          />
        ))}
      </div>

      <ModalDetailBuku
        isOpen={openDetail}
        onClose={() => setOpenDetail(false)}
        data={selectedBook}
      />
    </div>
  );
};

export default MainPBSection;
