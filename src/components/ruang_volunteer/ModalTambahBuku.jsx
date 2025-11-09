import React from "react";
import { HiUpload } from "react-icons/hi";

export default function ModalTambahBuku({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  if (!isOpen) return null;

  const inputStyle =
    "px-4 py-2 bg-[#FFF7E8] border border-gray-300 rounded-md text-sm outline-none w-full";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      {/* ✅ container sesuai request */}
      <div className="bg-white w-full max-w-[450px] rounded-2xl shadow-xl max-h-[90vh] flex flex-col animate-fadeIn">
        {/* HEADER */}
        <div className="p-6 pb-4 border-b">
          <h2 className="text-lg font-semibold text-center">
            Tambah Rekomendasi Buku
          </h2>
        </div>

        {/* ✅ SCROLLABLE CONTENT */}
        <div className="px-6 py-4 overflow-y-auto flex-1 space-y-4">
          {/* Judul */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Judul Buku</label>
            <input
              type="text"
              placeholder="Masukkan judul buku"
              value={formData.judul}
              onChange={(e) =>
                setFormData({ ...formData, judul: e.target.value })
              }
              className={inputStyle}
            />
          </div>

          {/* Penulis */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Penulis Buku</label>
            <input
              type="text"
              placeholder="Masukkan nama penulis"
              value={formData.penulis}
              onChange={(e) =>
                setFormData({ ...formData, penulis: e.target.value })
              }
              className={inputStyle}
            />
          </div>

          {/* Kategori */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Kategori Pelajar</label>
            <select
              value={formData.kategori}
              onChange={(e) =>
                setFormData({ ...formData, kategori: e.target.value })
              }
              className={inputStyle}
            >
              <option value="">Pilih Kategori</option>
              <option value="Literasi Dasar">Literasi Dasar</option>
              <option value="Numerasi">Numerasi</option>
              <option value="Sains">Sains</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Deskripsi</label>
            <textarea
              placeholder="Deskripsi singkat tentang buku"
              value={formData.deskripsi}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
              className={`${inputStyle} h-24 resize-none`}
            />
          </div>

          {/* Upload Sampul */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Upload Sampul Buku</label>

            <label className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FFF7E8] border border-gray-300 rounded-md text-sm cursor-pointer">
              <HiUpload size={16} />
              <span>Unggah File</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setFormData({ ...formData, sampul: e.target.files[0] })
                }
              />
            </label>
          </div>

          {/* Link */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Tautan Buku</label>
            <input
              type="text"
              placeholder="Contoh: www.bukunasional.com"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className={inputStyle}
            />
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="p-6 pt-3 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={onSubmit}
            className="px-6 py-2 rounded-full bg-[#FE9015] hover:bg-[#e57f0f] text-white font-semibold"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
