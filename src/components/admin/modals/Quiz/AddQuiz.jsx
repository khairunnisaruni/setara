// src/components/admin/modals/Quiz/AddQuiz.jsx

import { useState, useEffect } from "react"; // Tambah useEffect
import { Upload } from "lucide-react";
import FailedModal from "../../modals/Failed";
import SuccessModal from "../../modals/Success";

const AddQuizModal = ({ isOpen, onClose, onSubmit }) => {
  // 1. Ganti nama state agar sesuai dengan Backend
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "",
    link: "",
    kategori_id: "",        // Ganti dari subjectCategory
    kategori_kelas_id: "",  // Ganti dari classCategory
    file: null,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // State untuk menampung list dari database
  const [listKategori, setListKategori] = useState([]);
  const [listKelas, setListKelas] = useState([]);

  // 2. Ambil data kategori dan kelas dari API saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      // Fetch Kategori Mapel
      fetch('http://localhost:5000/admin/categories')
        .then(res => res.json())
        .then(data => setListKategori(Array.isArray(data) ? data : []))
        .catch(err => console.error(err));

      // Fetch Kategori Kelas
      fetch('http://localhost:5000/admin/class-categories')
        .then(res => res.json())
        .then(data => setListKelas(Array.isArray(data) ? data : []))
        .catch(err => console.error(err));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.kategori_id || !formData.kategori_kelas_id) {
       alert("Harap pilih kategori mapel dan kelas!");
       return;
    }

    try {
      // Pastikan data dikirim sebagai object yang benar
      await onSubmit(formData); 
      onClose();
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        title: "", description: "", platform: "", link: "",
        kategori_id: "", kategori_kelas_id: "", file: null
      });
      
    } catch (error) {
      onClose();
      setShowFailedModal(true);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
          <h2 className="text-base font-semibold text-center mb-3">
            Tambah Kuis & Game
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Judul */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Judul Kuis & Game</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none"
                placeholder="Masukkan judul"
                required
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea
                name="description"
                rows="2"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none"
                placeholder="Deskripsi singkat"
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Platform</label>
              <select
                name="platform"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none"
              >
                <option value="">Pilih Platform</option>
                <option value="kahoot">Kahoot</option>
                <option value="wayground">Wayground</option>
                
              </select>
            </div>

            {/* Link */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Link Kuis</label>
              <input
                type="url"
                name="link"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none"
                placeholder="Masukkan link"
                required
              />
            </div>

            {/* Kategori Mata Pelajaran (DINAMIS) */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mata Pelajaran</label>
              <select
                name="kategori_id" // <--- Sudah disesuaikan dengan Backend
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none"
                required
              >
                <option value="">Pilih Mata Pelajaran</option>
                {listKategori.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Kategori Kelas (DINAMIS) */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Kelas</label>
              <select
                name="kategori_kelas_id" // <--- Sudah disesuaikan dengan Backend
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm outline-none"
                required
              >
                <option value="">Pilih Kelas</option>
                {listKelas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Gambar */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Gambar Pendukung</label>
              <div className="relative">
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 cursor-pointer text-gray-600 text-sm hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  {formData.file ? formData.file.name : "Unggah File"}
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
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <FailedModal isOpen={showFailedModal} onClose={() => setShowFailedModal(false)} />
    </>
  );
};

export default AddQuizModal;