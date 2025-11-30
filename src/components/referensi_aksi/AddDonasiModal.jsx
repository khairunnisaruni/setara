// src/components/referensi_aksi/AddDonasiModal.jsx
import React, { useState } from "react";

const AddDonasiModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    recipient: "",
    description: "",
    impact: "",
    link: "",
    responsible: "",
    contact: "",
    banner: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData); // sukses/gagal di-handle di HeroDonasi
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-4xl mx-4 rounded-2xl shadow-lg overflow-y-auto max-h-[95vh] relative p-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition"
        >
          ✕
        </button>

        <h2 className="text-[22px] font-semibold text-center text-gray-800">
          Tambahkan Program Donasi
        </h2>
        <p className="text-center text-gray-600 mt-2 mb-8 text-sm">
          Bagikan informasi donasi dari lembaga resmi untuk membantu sesama
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-[15px] text-gray-700 text-left"
        >
          {/* JUDUL */}
          <label className="font-medium">Judul Donasi *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Contoh: Donasi Buku Bacaan untuk Anak SD di Daerah Terpencil"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* KATEGORI */}
          <label className="font-medium">Kategori Donasi *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570]
             focus:ring-2 focus:ring-orange-400 outline-none"
            required
          >
            <option value="" disabled>
              Pilih kategori donasi...
            </option>
            <option value="Kebutuhan Dasar Siswa">Kebutuhan Dasar Siswa</option>
            <option value="Beasiswa & Bantuan Pendidikan">
              Beasiswa & Bantuan Pendidikan
            </option>
            <option value="Kegiatan Relawan & Volunteer">
              Kegiatan Relawan & Volunteer
            </option>
            <option value="Fasilitas Belajar & Infrastruktur">
              Fasilitas Belajar & Infrastruktur
            </option>
            <option value="Teknologi Pendidikan & Literasi Digital">
              Teknologi Pendidikan & Literasi Digital
            </option>
            <option value="Pengabdian Masyarakat & Workshop">
              Pengabdian Masyarakat & Workshop
            </option>
            <option value="Kegiatan Ekstra Kulikuler & Kreativitas">
              Kegiatan Ekstra Kulikuler & Kreativitas
            </option>
            <option value="Kampanye & Edukasi Masyarakat">
              Kampanye & Edukasi Masyarakat
            </option>
          </select>

          {/* PENERIMA MANFAAT */}
          <label className="font-medium">Penerima Manfaat *</label>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            placeholder="Contoh: Siswa SD Tapanuli, komunitas belajar usia 7–12 tahun"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* DESKRIPSI */}
          <label className="font-medium">Deskripsi Donasi *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tuliskan deskripsi tentang tujuan donasi..."
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] h-28
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* POSTER */}
          <label className="font-medium">Poster / Banner Donasi (Opsional)</label>
          <input
            type="file"
            name="banner"
            onChange={handleChange}
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]"
          />

          {/* DAMPAK */}
          <label className="font-medium">Dampak Donasi</label>
          <textarea
            name="impact"
            value={formData.impact}
            onChange={handleChange}
            placeholder="Bagaimana bantuan akan digunakan dan dampaknya bagi penerima manfaat"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] h-24
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* TAUTAN */}
          <label className="font-medium">Tautan Resmi Donasi *</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* PENANGGUNG JAWAB */}
          <label className="font-medium">Penanggung Jawab Donasi *</label>
          <input
            type="text"
            name="responsible"
            value={formData.responsible}
            onChange={handleChange}
            placeholder="Nama penanggung jawab"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* CONTACT */}
          <label className="font-medium">Contact Person *</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Nomor atau email narahubung"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* CHECKBOX */}
          <div className="flex items-start gap-2 mt-3">
            <input type="checkbox" required className="mt-[3px]" />
            <p className="text-sm text-gray-600 leading-relaxed">
              Saya menyatakan bahwa informasi donasi yang saya unggah bersifat
              benar, tidak menyesatkan, dan bersumber dari lembaga, organisasi,
              atau pihak yang dapat dipercaya. Setara tidak bertanggung jawab
              atas keaslian konten yang diunggah pengguna.
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="mt-2 w-full bg-[#FF9D01] text-white py-3 rounded-xl font-semibold
              hover:bg-[#d97e00] transition-all"
            >
              Tambahkan Program Donasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDonasiModal;
