import React from "react";

export default function ModalPojokBuku({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999] px-4">
      <div
        className="bg-white w-full max-w-[450px] rounded-2xl shadow-xl 
                      max-h-[90vh] flex flex-col animate-fadeIn"
      >
        {/* HEADER */}
        <div className="p-6 pb-4">
          <h2 className="text-xl font-semibold text-[#3B3B3B] text-center">
            Tambah Rekomendasi Buku
          </h2>
        </div>

        {/* === BODY (scrollable) === */}
        <div className="px-6 pb-6 overflow-y-auto flex-1">
          <div className="flex flex-col gap-4">
            {/* JUDUL BUKU */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-[#3B3B3B]">
                Judul Buku
              </label>
              <input
                type="text"
                placeholder="Masukkan judul buku"
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                className="px-4 py-2 border border-gray-200 rounded-md bg-[#FFF7E8] 
                           focus:ring-2 focus:ring-[#FE9015] outline-none"
              />
            </div>

            {/* PENULIS */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-[#3B3B3B]">
                Penulis Buku
              </label>
              <input
                type="text"
                placeholder="Masukkan nama penulis buku"
                value={formData.penulis}
                onChange={(e) =>
                  setFormData({ ...formData, penulis: e.target.value })
                }
                className="px-4 py-2 border border-gray-200 rounded-md bg-[#FFF7E8] 
                           focus:ring-2 focus:ring-[#FE9015] outline-none"
              />
            </div>

            {/* KATEGORI */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-[#3B3B3B]">
                Kategori Buku
              </label>
              <select
                value={formData.kategori}
                onChange={(e) =>
                  setFormData({ ...formData, kategori: e.target.value })
                }
                className="px-4 py-2 border border-gray-200 rounded-md bg-[#FFF7E8] 
                           text-gray-600 focus:ring-2 focus:ring-[#FE9015] outline-none"
              >
                <option value="">Pilih Kategori</option>
                <option value="Literasi Dasar">Literasi Dasar</option>
                <option value="Numerasi">Numerasi</option>
                <option value="Sains">Sains</option>
                <option value="Sosial">Sosial</option>
              </select>
            </div>

            {/* DESKRIPSI */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-[#3B3B3B]">
                Deskripsi
              </label>
              <textarea
                placeholder="Deskripsi singkat tentang materi"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                className="px-4 py-3 h-28 border border-gray-200 rounded-md bg-[#FFF7E8] 
                           resize-none focus:ring-2 focus:ring-[#FE9015] outline-none"
              ></textarea>
            </div>

            {/* UPLOAD SAMPUL */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-[#3B3B3B]">
                Upload Sampul Buku
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, sampul: e.target.files[0] })
                }
                className="px-4 py-2 border border-gray-200 rounded-md bg-[#FFF7E8] outline-none"
              />
            </div>

            {/* TAUTAN BUKU */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 text-[#3B3B3B]">
                Upload Tautan Buku
              </label>
              <input
                type="text"
                placeholder="Contoh: www.bukunasional.com"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="px-4 py-2 border border-gray-200 rounded-md bg-[#FFF7E8] 
                           focus:ring-2 focus:ring-[#FE9015] outline-none"
              />
            </div>
          </div>
        </div>

        {/* BUTTONS (tetap di bawah) */}
        <div className="p-6 pt-4 flex justify-end gap-3 border-t bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-300 
                       text-gray-600 hover:bg-gray-100 transition"
          >
            Batal
          </button>

          <button
            onClick={onSubmit}
            className="px-6 py-2 rounded-full bg-[#FE9015] hover:bg-[#e57f0f] 
                       text-white font-semibold transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
