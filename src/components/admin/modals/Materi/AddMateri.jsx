import { useState, useEffect } from "react";

const AddMateriModal = ({ isOpen, onClose, onSubmit }) => {
  // 1. State Form (Sesuai Database & Backend)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file_type: "pdf",      // Default PDF
    youtube_link: "",      // Jika Video
    file_material: null,   // Jika PDF/Audio
    kategori_id: "",       // ID Mapel
    kategori_kelas_id: "", // ID Kelas
  });

  // 2. State untuk Dropdown dari Database
  const [listKategori, setListKategori] = useState([]);
  const [listKelas, setListKelas] = useState([]);

  // 3. Ambil Data Dropdown saat modal dibuka
  useEffect(() => {
    if (isOpen) {
        // Fetch Kategori Mapel
        fetch('http://localhost:5000/admin/categories')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setListKategori(data);
            })
            .catch(err => console.error(err));

        // Fetch Kategori Kelas
        fetch('http://localhost:5000/admin/class-categories')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setListKelas(data);
            })
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

  // Handle tombol ganti jenis file
  const handleFileTypeChange = (type) => {
    setFormData({ 
        ...formData, 
        file_type: type.toLowerCase(),
        file_material: null, // Reset file jika ganti tipe
        youtube_link: ""     // Reset link jika ganti tipe
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data ke Parent
    onSubmit(formData);

    // Reset Form (Opsional, agar bersih saat dibuka lagi)
    setFormData({
        title: "", description: "", file_type: "pdf", youtube_link: "", 
        file_material: null, kategori_id: "", kategori_kelas_id: ""
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-base font-semibold mb-4 text-gray-800 text-center">
          Tambah Materi Baru
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Judul Materi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Judul Materi</label>
            <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400" 
                placeholder="Contoh: Belajar Matematika Dasar" 
                required 
            />
          </div>

          {/* Jenis File (Tombol Pilihan) */}
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

          {/* Input File Dinamis (Video = Link, Lainnya = Upload) */}
          {formData.file_type === 'video' ? (
             <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Link YouTube</label>
                <input 
                    type="url" 
                    name="youtube_link" 
                    value={formData.youtube_link} 
                    onChange={handleChange} 
                    placeholder="https://youtube.com/..." 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm" 
                    required 
                />
             </div>
          ) : (
             <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                    Upload File ({formData.file_type.toUpperCase()})
                </label>
                <input 
                    type="file" 
                    name="file_material" 
                    onChange={handleChange} 
                    accept={formData.file_type === 'pdf' ? ".pdf" : "audio/*"} 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm" 
                    required // Wajib upload jika bukan video
                />
             </div>
          )}

          {/* Kategori & Kelas (Grid 2 Kolom) */}
          <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Mata Pelajaran</label>
                <select 
                    name="kategori_id" 
                    value={formData.kategori_id} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700" 
                    required
                >
                    <option value="">Pilih Mapel</option>
                    {listKategori.map(k => (
                        <option key={k.id} value={k.id}>{k.nama}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Kelas</label>
                <select 
                    name="kategori_kelas_id" 
                    value={formData.kategori_kelas_id} 
                    onChange={handleChange} 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700" 
                    required
                >
                    <option value="">Pilih Kelas</option>
                    {listKelas.map(k => (
                        <option key={k.id} value={k.id}>{k.nama}</option>
                    ))}
                </select>
              </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="3" 
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400" 
                placeholder="Deskripsi singkat tentang materi"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-4">
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
                Tambah
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddMateriModal;

