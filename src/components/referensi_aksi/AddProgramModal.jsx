// src/components/referensi_aksi/AddProgramModal.jsx
import React, { useState } from "react";
import SuccessPopup from "../ruang_volunteer/notification/SuccessPopup";

export default function AddProgramModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    organizer: "",
    programType: "",
    location: "",
    description: "",
    period: "",
    deadline: "",
    status: "Akan Datang",
    link: "",
    banner: null,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // ⬅️ state popup

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFormData((prev) => ({
      ...prev,
      banner: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await onSubmit(formData); // kirim data ke parent
      onClose();                // tutup modal form dulu
      setShowSuccessModal(true); // tampilkan popup sukses
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Gagal menyimpan program");
    }
  };

  return (
    <>
      {/* Modal Form */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl mx-4 overflow-y-auto max-h-[90vh] p-8 relative">
          {/* Tombol close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-lg font-bold text-gray-800 text-center mb-6">
            Tambahkan Program Baru
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 text-sm text-gray-700">
            <p className="text-gray-600 text-center">
              Bagikan informasi program yang kamu ketahui untuk membantu mahasiswa lain
            </p>

            <style>{`
              input::placeholder, textarea::placeholder, select::placeholder {
                color: #757570;
              }
            `}</style>

            <div className="space-y-3 mt-4">
              {/* Judul Program */}
              <label className="font-medium">Judul Program *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Program Kampus Mengajar Angkatan 7"
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />

              {/* Penyelenggara */}
              <label className="font-medium">Penyelenggara *</label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="Contoh: Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi"
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />

              {/* Jenis Program */}
              <label className="font-medium">Jenis Program *</label>
              <select
                name="programType"
                value={formData.programType}
                onChange={handleChange}
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570]"
                required
              >
                <option value="">Pilih Jenis Program</option>
                <option value="volunteer">Volunteer</option>
                <option value="beasiswa">Beasiswa</option>
                <option value="pengabdian">Pengabdian Masyarakat</option>
              </select>

              {/* Lokasi Program */}
              <label className="font-medium">Lokasi Program</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Beri tahu dimana lokasi volunteer/pengabdian masyarakat"
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
              />

              {/* Deskripsi Program */}
              <label className="font-medium">Deskripsi Program *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Jelaskan deskripsi program ini"
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] h-24 placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />

              {/* Periode / Tanggal */}
              <label className="font-medium">Periode / Tanggal *</label>
              <input
                type="text"
                name="period"
                value={formData.period}
                onChange={handleChange}
                placeholder="Contoh: Januari - Juni 2025"
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
              />

              {/* Deadline Pendaftaran */}
              <label className="font-medium">Deadline Pendaftaran *</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />

              {/* Status Program */}
              <label className="font-medium">Status Program *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570]"
              >
                <option value="Akan Datang">Akan Datang</option>
                <option value="Sedang Berjalan">Sedang Dibuka</option>
                <option value="Selesai">Selesai</option>
              </select>

              {/* Link */}
              <label className="font-medium">Tautan ke sumber resmi program *</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />

              {/* Poster / Banner */}
              <label className="font-medium">Poster / Banner (Opsional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Tombol aksi */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Batal
              </button>
              <button
                type="submit"
                className="mr-2 bg-[#FF9D01] text-white px-4 py-2 rounded-lg hover:bg-[#8a5500]"
              >
                Kirim Program
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup Sukses */}
      <SuccessPopup
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}

