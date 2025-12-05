// src/sections/referensi_aksi/HeroDonasi.jsx
import React, { useState } from "react";
import axios from "axios";
import AddDonasiModal from "../../components/referensi_aksi/AddDonasiModal";

/* Popup sukses */
const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-5 max-w-sm w-full text-center">
        <h3 className="text-lg font-semibold text-green-700 mb-2">Berhasil</h3>
        <p className="text-sm text-gray-600 mb-4">
          Program donasi berhasil ditambahkan.
        </p>
        <button
          onClick={onClose}
          className="mt-2 inline-flex justify-center px-4 py-2 text-sm font-medium
                     text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

/* Popup gagal */
const FailedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-5 max-w-sm w-full text-center">
        <h3 className="text-lg font-semibold text-red-600 mb-2">Gagal</h3>
        <p className="text-sm text-gray-600 mb-4">
          Terjadi kesalahan saat menyimpan donasi. Coba lagi nanti.
        </p>
        <button
          onClick={onClose}
          className="mt-2 inline-flex justify-center px-4 py-2 text-sm font-medium
                     text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

const HeroDonasi = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // dipanggil dari AddDonasiModal
  const handleSubmitDonasi = async (formData) => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    try {
      // 🔹 Ambil token dari localStorage
      // GANTI "token" jika di Login.jsx kamu pakai key lain (mis. "accessToken")
      const token = localStorage.getItem("token");
      if (!token) {
        alert(
          "Tidak ada token. Kamu mungkin belum login atau sesi sudah habis. Silakan login ulang."
        );
        return;
      }

      await axios.post("http://localhost:5000/api/donasi", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // kirim JWT ke backend
        },
      });

      setIsModalOpen(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Gagal kirim donasi:", error?.response?.data || error);
      setIsModalOpen(false);
      setShowFailedModal(true);
    }
  };

  return (
    <>
      <section
        className="py-24 text-center px-4"
        style={{
          background:
            "linear-gradient(to right, rgba(255, 157, 1, 0.45), rgba(49, 123, 116, 0.45))",
        }}
      >
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 64 64"
            fill="none"
          >
            <path
              d="M50.6667 37.3333C54.64 33.44 58.6667 28.7733 58.6667 22.6667C58.6667 18.7768 57.1215 15.0463 54.3709 12.2958C51.6204 9.54523 47.8899 8 44 8C39.3067 8 36 9.33333 32 13.3333C28 9.33333 24.6934 8 20 8C16.1102 8 12.3797 9.54523 9.62914 12.2958C6.87861 15.0463 5.33337 18.7768 5.33337 22.6667C5.33337 28.8 9.33337 33.4667 13.3334 37.3333L32 56L50.6667 37.3333Z"
              stroke="white"
              strokeWidth="5.3333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#317B74]">
          Bersama Wujudkan Akses Pendidikan yang Setara
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Dukung sekolah-sekolah yang membutuhkan bantuan fasilitas, buku, dan
          sarana belajar.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() =>
              document
                .getElementById("daftar-donasi")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
          >
            Lihat Daftar Donasi
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white border border-gray-300 hover:bg-gray-50 font-semibold px-6 py-2 rounded-lg transition-all"
          >
            + Tambahkan Program Donasi
          </button>
        </div>

        {/* Modal Donasi */}
        {isModalOpen && (
          <AddDonasiModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitDonasi}
          />
        )}
      </section>

      {/* Popup sukses / gagal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <FailedModal
        isOpen={showFailedModal}
        onClose={() => setShowFailedModal(false)}
      />
    </>
  );
};

export default HeroDonasi;
