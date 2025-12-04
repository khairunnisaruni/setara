import { useState, useEffect } from "react";

const AddInformasiModal = ({ isOpen, onClose, onSubmit }) => {
  // 1. Samakan struktur state dengan Database Backend
  const initialFormState = {
    judul_panduan: "",      // Sesuai backend: judul_panduan
    deskripsi_panduan: "",  // Sesuai backend: deskripsi_panduan
  };

  const [formData, setFormData] = useState(initialFormState);

  // 2. Reset form otomatis setiap kali modal dibuka (biar bersih)
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 3. Hapus Success/Failed Modal dari sini. 
  // Biarkan Parent (Halaman Informasi) yang mengurus sukses/gagal.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  if (!isOpen) return null;

  return (
    // Styling disamakan persis dengan AddDonasiModal (rounded-2xl, shadow, dll)
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-base font-semibold text-center mb-4">
          Tambah Panduan & Informasi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Judul Panduan */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Judul Panduan
            </label>
            <input
              type="text"
              name="judul_panduan" 
              value={formData.judul_panduan}
              onChange={handleChange}
              placeholder="Contoh: Cara Melakukan Donasi"
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Deskripsi Panduan */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Deskripsi Panduan
            </label>
            <textarea
              name="deskripsi_panduan"
              value={formData.deskripsi_panduan}
              onChange={handleChange}
              rows="5"
              placeholder="Jelaskan detail informasi atau panduan di sini..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Tombol Aksi - Styling disamakan */}
          <div className="flex justify-end gap-2 mt-6 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition shadow-sm"
            >
              Simpan Informasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInformasiModal;