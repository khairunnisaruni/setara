import { useState, useEffect } from "react";


const EditCeritaModal = ({ isOpen, onClose, onSubmit, initialData }) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // 👇 LOGIKA BARU: Pakai data dari Database (bukan dummy lagi)
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        title: initialData.title || "",
        // Di DB namanya 'content', di form kita 'description'. Kita cocokkan disini:
        description: initialData.content || "", 
      });
    } else if (isOpen && !initialData) {
       // Kalau mode tambah (initialData kosong), reset form
       setFormData({ title: "", description: "" });
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Kirim data ke Parent

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
        <h2 className="text-base font-semibold mb-3 text-gray-800 text-center">
           {initialData ? "Edit Cerita" : "Tambah Cerita"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2 text-left">
          {/* Judul */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Judul Cerita</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"

              placeholder="Masukkan judul cerita"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi Cerita</label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Tuliskan isi cerita..."

              required
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="text-amber-500 text-sm px-4 py-1.5 rounded-md border border-gray-200 hover:bg-amber-50"

            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-amber-400 text-white text-sm px-4 py-1.5 rounded-md hover:bg-amber-500"
            >
              Simpan

            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCeritaModal;
