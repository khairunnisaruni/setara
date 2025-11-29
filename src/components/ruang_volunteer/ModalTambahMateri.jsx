import React from "react";
import { HiUpload } from "react-icons/hi";

export default function ModalTambahMateri({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  if (!isOpen) return null;

  const inputStyle =
    "px-4 py-2 bg-[#FFF7E8] border border-gray-300 rounded-md text-sm outline-none w-full";

  const handleFileTypeChange = (type) => {
    setFormData({ ...formData, fileType: type });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-[450px] rounded-2xl shadow-xl max-h-[90vh] flex flex-col animate-fadeIn">
        {/* HEADER */}
        <div className="p-6 pb-4 border-b">
          <h2 className="text-lg font-semibold text-center">Tambah Materi</h2>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-4 overflow-y-auto flex-1 space-y-4">
          {/* Judul */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Judul Materi</label>
            <input
              type="text"
              placeholder="Masukkan judul materi"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className={inputStyle}
            />
          </div>

          {/* Jenis File */}
          <div>
            <label className="font-medium mb-1">Jenis File</label>
            <div className="flex gap-2">
              {["PDF", "Audio", "Video"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleFileTypeChange(type)}
                  className={`px-3 py-2 rounded-md text-sm border transition 
                    ${
                      formData.fileType === type
                        ? "bg-[#FE9015] border-[#FE9015] text-white"
                        : "bg-[#FFF7E8] border-gray-300 text-gray-700"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Upload File */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Upload File</label>

            <label className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FFF7E8] border border-gray-300 rounded-md text-sm cursor-pointer">
              <HiUpload size={16} />
              <span>Unggah File</span>

              <input
                type="file"
                className="hidden"
                accept={
                  formData.fileType === "PDF"
                    ? ".pdf"
                    : formData.fileType === "Audio"
                    ? "audio/*"
                    : formData.fileType === "Video"
                    ? "video/*"
                    : "*"
                }
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files[0] })
                }
              />
            </label>

            {formData.file && (
              <p className="text-xs text-gray-600 mt-1">
                File dipilih: {formData.file.name}
              </p>
            )}
          </div>

          {/* Kategori Pelajar */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Kategori Pelajar</label>
            <select
              value={formData.classCategory}
              onChange={(e) =>
                setFormData({ ...formData, classCategory: e.target.value })
              }
              className={inputStyle}
            >
              <option value="">Pilih Kelas</option>
              <option value="kelas-1">Kelas 1</option>
              <option value="kelas-2">Kelas 2</option>
              <option value="kelas-3">Kelas 3</option>
              <option value="kelas-4">Kelas 4</option>
              <option value="kelas-5">Kelas 5</option>
              <option value="kelas-6">Kelas 6</option>
            </select>
          </div>

          {/* Jenis Kategori */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Jenis Kategori</label>
            <select
              value={formData.materialCategory}
              onChange={(e) =>
                setFormData({ ...formData, materialCategory: e.target.value })
              }
              className={inputStyle}
            >
              <option value="">Pilih Kategori</option>
              <option value="materi-utama">Materi Utama</option>
              <option value="materi-pendukung">Materi Pendukung</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Deskripsi</label>
            <textarea
              placeholder="Deskripsi singkat tentang materi"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={`${inputStyle} h-24 resize-none`}
            />
          </div>
        </div>

        {/* FOOTER */}
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
