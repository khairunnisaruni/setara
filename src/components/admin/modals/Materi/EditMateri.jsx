import { useState, useEffect } from "react";

const EditMateriModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // State Form sesuai Database
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file_type: "pdf", // Default
    youtube_link: "", // Untuk Video
    file_material: null, // Untuk PDF/Audio
    kategori_id: "",
    kategori_kelas_id: "",
  });

  // State untuk Dropdown dari Database
  const [listKategori, setListKategori] = useState([]);
  const [listKelas, setListKelas] = useState([]);

  // 1. Ambil Data Dropdown saat modal dibuka
  useEffect(() => {
    if (isOpen) {
        fetch('http://localhost:3000/admin/categories').then(res => res.json()).then(setListKategori);
        fetch('http://localhost:3000/admin/class-categories').then(res => res.json()).then(setListKelas);
    }
  }, [isOpen]);

  // 2. Isi Data (Reset saat Tambah, Isi saat Edit)
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.judul || "",
          description: initialData.description || "",
          file_type: initialData.jenisFile ? initialData.jenisFile.toLowerCase() : "pdf",
          youtube_link: initialData.jenisFile === "VIDEO" ? initialData.file_path : "",
          file_material: null,
          kategori_id: initialData.original_kategori_id || "",
          kategori_kelas_id: initialData.original_kelas_id || "",
        });
      } else {
        setFormData({
          title: "", description: "", file_type: "pdf", youtube_link: "", 
          file_material: null, kategori_id: "", kategori_kelas_id: ""
        });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // Handle tombol jenis file
  const handleFileTypeChange = (type) => {
    setFormData({ ...formData, file_type: type.toLowerCase() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-base font-semibold mb-4 text-gray-800 text-center">
          {initialData ? "Edit Materi" : "Tambah Materi Baru"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Judul */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Judul Materi</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded-md text-sm" placeholder="Contoh: Belajar Matematika Dasar" required />
          </div>

          {/* Jenis File (Tombol) */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Jenis File</label>
            <div className="flex gap-2">
              {["PDF", "Audio", "Video"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleFileTypeChange(type)}
                  className={`px-3 py-1.5 rounded-md text-sm border transition font-medium ${
                    formData.file_type === type.toLowerCase()
                      ? "bg-amber-400 text-white border-amber-400"
                      : "text-gray-600 border-gray-300 hover:bg-amber-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 🔥 1. KOLOM ATTACH FILE (DINAMIS) */}
          {formData.file_type === 'video' ? (
             <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Link YouTube</label>
                <input type="url" name="youtube_link" value={formData.youtube_link} onChange={handleChange} placeholder="https://youtube.com/..." className="w-full p-2 border rounded-md text-sm" required />
             </div>
          ) : (
             <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Upload File ({formData.file_type.toUpperCase()})</label>
                <input type="file" name="file_material" onChange={handleChange} accept={formData.file_type === 'pdf' ? ".pdf" : "audio/*"} className="w-full p-2 border rounded-md text-sm" />
             </div>
          )}

          {/* Kategori & Kelas */}
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Mata Pelajaran</label>
                <select name="kategori_id" value={formData.kategori_id} onChange={handleChange} className="w-full p-2 border rounded-md text-sm" required>
                    <option value="">Pilih Mapel</option>
                    {listKategori.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                </select>
             </div>
             <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Kelas</label>
                <select name="kategori_kelas_id" value={formData.kategori_kelas_id} onChange={handleChange} className="w-full p-2 border rounded-md text-sm" required>
                    <option value="">Pilih Kelas</option>
                    {listKelas.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                </select>
             </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full p-2 border rounded-md text-sm" />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="text-amber-500 text-sm px-4 py-1.5 rounded-md font-medium border border-gray-200 hover:bg-amber-50">Batal</button>
            <button type="submit" className="bg-amber-400 text-white text-sm px-4 py-1.5 rounded-md font-medium hover:bg-amber-500">{initialData ? "Simpan" : "Tambah"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMateriModal;