import { useState, useEffect } from "react";

const EditInformasiModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // 1. STATE SESUAI DATABASE (judul_panduan & deskripsi_panduan)
  const [formData, setFormData] = useState({
    judul_panduan: "",
    deskripsi_panduan: "",
  });

  // 2. LOGIKA ISI DATA (RESET / EDIT)
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Mode Edit: Isi dengan data lama
        setFormData({
          judul_panduan: initialData.judul_panduan || "",
          deskripsi_panduan: initialData.deskripsi_panduan || "",
        });
      } else {
        // Mode Tambah: Kosongkan form
        setFormData({
          judul_panduan: "",
          deskripsi_panduan: "",
        });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-[420px] shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4">
          {initialData ? "Edit Informasi" : "Tambah Informasi Baru"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul Panduan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Informasi / Panduan
            </label>
            <input
              type="text"
              name="judul_panduan" // Wajib sama dengan State & DB
              value={formData.judul_panduan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 text-sm"
              placeholder="Masukkan judul informasi"
              required
            />
          </div>

          {/* Deskripsi Panduan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              name="deskripsi_panduan" // Wajib sama dengan State & DB
              rows="5"
              value={formData.deskripsi_panduan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-400 text-sm"
              placeholder="Tulis deskripsi informasi..."
              required
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-amber-400 text-white text-sm px-4 py-2 rounded-md hover:bg-amber-500 font-bold"
            >
              {initialData ? "Simpan Perubahan" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInformasiModal;