import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

const EditQuizModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "",
    link: "",
    kategori_id: "",       
    kategori_kelas_id: "",  
    file: null,
  });

  const [listKategori, setListKategori] = useState([]);
  const [listKelas, setListKelas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/admin/categories')
      .then(res => res.json())
      .then(data => setListKategori(data))
      .catch(err => console.error(err));

    fetch('http://localhost:3000/admin/class-categories')
      .then(res => res.json())
      .then(data => setListKelas(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        platform: initialData.platform || "",
        link: initialData.link || "",
        kategori_id: initialData.kategori_id || "", 
        kategori_kelas_id: initialData.kategori_kelas_id || "",
        file: null, 
      });
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
      <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
        <h2 className="text-base font-semibold mb-3 text-gray-800">
          Perbarui Rekomendasi Kuis
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2 text-left">
          {/* Judul Kuis & Game */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Judul Kuis & Game
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Masukkan judul kuis"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Deskripsi singkat tentang kuis"
            />
          </div>

          {/* Platform */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Platform
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400"
            >
              <option value="">Pilih Platform</option>
              {/* Pastikan value huruf kecil sesuai ENUM database kamu */}
              <option value="kahoot">Kahoot</option>
              <option value="wayground">Wayground</option>
              {/* Jika database sudah diubah ENUM-nya, baru boleh tambah ini: */}
              <option value="quizizz">Quizizz</option> 
              <option value="google form">Google Form</option>
            </select>
          </div>

          {/* Link Kuis */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Link Kuis
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Contoh: https://create.kahoot.it/discover"
            />
          </div>

          {/* Kategori Mata Pelajaran (DINAMIS) */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Kategori Mata Pelajaran
            </label>
            <select
              name="kategori_id" // <--- Ganti nama atribut
              value={formData.kategori_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 text-gray-700"
            >
              <option value="">Pilih Mata Pelajaran</option>
              {/* Looping data dari database */}
              {listKategori.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Kategori Kelas (DINAMIS) */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Kategori Kelas
            </label>
            <select
              name="kategori_kelas_id" // <--- Ganti nama atribut
              value={formData.kategori_kelas_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 text-gray-700"
            >
              <option value="">Pilih Kelas</option>
               {/* Looping data dari database */}
               {listKelas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Thumbnail Kuis */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Upload Thumbnail Kuis
            </label>
            <div className="relative">
              <input
                type="file"
                name="file"
                id="edit-quiz-file-upload"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="edit-quiz-file-upload"
                className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 cursor-pointer text-gray-600 text-sm hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 text-gray-500" />
                {formData.file
                  ? formData.file.name
                  : "Pilih File Baru (Opsional)"}
              </label>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-md"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-amber-400 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-500"
            >
              Perbarui
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuizModal;