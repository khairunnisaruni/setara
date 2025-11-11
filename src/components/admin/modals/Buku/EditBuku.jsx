import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

const EditBookModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    link: "",
    file: null,
  });

  useEffect(() => {
    if (isOpen) {
      // kalau gak ada initialData, pakai contoh dummy
      const dummyData = {
        title: "Petualangan di Negeri Awan",
        author: "R. Sasmita",
        category: "fiksi",
        description: "Sebuah kisah tentang perjalanan misterius di negeri awan.",
        link: "https://contohbuku.com/awan",
      };

      setFormData(initialData || dummyData);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        {/* 🔸 Judul rata kiri */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Perbarui Rekomendasi Buku
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          {/* Judul Buku */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Judul Buku
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md placeholder-gray-400"
              placeholder="Masukkan judul buku"
            />
          </div>

          {/* Penulis Buku */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Penulis Buku
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md placeholder-gray-400"
              placeholder="Masukkan nama penulis buku"
            />
          </div>

          {/* Kategori Buku */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kategori Buku
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md text-gray-700 placeholder-gray-400"
            >
              <option value="">Pilih Kategori</option>
              <option value="fiksi">Fiksi</option>
              <option value="nonfiksi">Non-Fiksi</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md placeholder-gray-400"
              placeholder="Deskripsi singkat tentang materi"
            />
          </div>

          {/* Upload Sampul Buku */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Sampul Buku
            </label>
            <div className="relative">
              <input
                type="file"
                name="file"
                id="edit-file-upload"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="edit-file-upload"
                className="flex items-center gap-2 border border-gray-400 rounded-md px-3 py-2 cursor-pointer text-gray-600 hover:bg-gray-50"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                {formData.file
                  ? formData.file.name
                  : "Pilih File Baru (Opsional)"}
              </label>
            </div>
          </div>

          {/* Upload Tautan Buku */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Tautan Buku
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md placeholder-gray-400"
              placeholder="Contoh: www.bukunasional.com"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-500"
            >
              Perbarui
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
