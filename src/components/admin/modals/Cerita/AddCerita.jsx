import { useState, useEffect } from "react";

const AddCeritaModal = ({ isOpen, onClose, onSubmit }) => {
  // ✅ Hapus 'penulis' dari state awal
  const initialFormState = {
    title: "",
    content: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (isOpen) setFormData(initialFormState);
  }, [isOpen]);

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
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-lg font-bold text-center mb-4 text-gray-800">
          Bagikan Cerita Baru
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Judul Cerita</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Judul cerita..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          {/* ❌ INPUT PENULIS DIHAPUS DARI SINI ❌ */}

          {/* Input Content */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Isi Cerita</label>
            <textarea
              name="content"
              rows="6"
              value={formData.content}
              onChange={handleChange}
              placeholder="Tuliskan pengalaman Anda..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-2 ">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-md"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 text-white text-sm rounded-md font-medium"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCeritaModal;