import { useState, useEffect } from "react";

const EditCeritaModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Saat modal dibuka, isi otomatis dengan data dummy
  useEffect(() => {
    if (isOpen) {
      const dummyData = {
        title: "Petualangan di Desa Pelangi",
        description:
          "Hari itu langit tampak cerah di Desa Pelangi. Anak-anak berlarian di taman bunga yang berwarna-warni sambil tertawa riang. Cerita ini mengisahkan petualangan mereka menemukan pelangi ajaib di ujung hutan.",
      };
      setFormData(dummyData);
    }
  }, [isOpen]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📖 Cerita diperbarui:", formData);
    if (onSubmit) onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
        <h2 className="text-base font-semibold mb-3 text-gray-800 text-center">
          Edit Cerita
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2 text-left">
          {/* Judul Cerita */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Judul Cerita
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Masukkan judul cerita"
              required
            />
          </div>

          {/* Deskripsi Cerita */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Deskripsi Cerita
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Tuliskan ringkasan cerita..."
              required
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="text-amber-500 text-sm px-4 py-1.5 rounded-md font-medium border border-gray-200 hover:bg-amber-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-amber-400 text-white text-sm px-4 py-1.5 rounded-md font-medium hover:bg-amber-500"
            >
              Perbarui
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCeritaModal;
