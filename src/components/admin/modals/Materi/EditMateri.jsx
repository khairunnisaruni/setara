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
  // ... (import dan state lain tetap sama)

  // 2. ISI DATA (LOGIKA YANG SUDAH DIPERBAIKI)
  useEffect(() => {
    if (isOpen && initialData) {
      // 🔍 DEBUGGING: Lihat isi data asli di Console Browser (F12)
      console.log("Data diterima untuk Edit:", initialData); 

      // Tentukan tipe file (mengantisipasi huruf besar/kecil atau nama kolom beda)
      // Cek apakah kolomnya 'type', 'file_type', atau 'jenis_file'
      const rawType = initialData.type || initialData.file_type || initialData.jenis_file || "pdf";
      const fileType = rawType.toLowerCase(); 

      // Tentukan Link Youtube atau File Path
      // Cek kolom 'file_path', 'link', atau 'url'
      const rawLink = initialData.file_path || initialData.link || initialData.url || "";

      setFormData({
        // 1. JUDUL: Cek 'title' atau 'judul'
        title: initialData.title || initialData.judul || "", 
        
        // 2. DESKRIPSI: Cek 'description' atau 'deskripsi'
        description: initialData.description || initialData.deskripsi || "",
        
        // 3. TIPE FILE
        file_type: fileType,
        
        // 4. LINK YOUTUBE (Hanya isi jika tipe video)
        youtube_link: fileType === "video" ? rawLink : "",
        
        // 5. FILE MATERIAL (Selalu null saat edit, user harus upload ulang jika mau ganti)
        file_material: null, 
        
        // 6. KATEGORI (MATA PELAJARAN)
        // 🔥 PENTING: Dropdown butuh ID, bukan Nama.
        // Cek 'kategori_id', 'category_id', atau 'id_kategori'
        kategori_id: initialData.kategori_id || initialData.category_id || initialData.id_kategori || "", 
        
        // 7. KELAS
        // Cek 'kategori_kelas_id', 'class_category_id', atau 'id_kelas'
        kategori_kelas_id: initialData.kategori_kelas_id || initialData.class_category_id || initialData.id_kelas || "",
      });
    } else if (isOpen && !initialData) {
      // Reset Form untuk Mode Tambah
      setFormData({
        title: "", 
        description: "", 
        file_type: "pdf", 
        youtube_link: "", 
        file_material: null, 
        kategori_id: "", 
        kategori_kelas_id: ""
      });
    }
  }, [isOpen, initialData]);

// ... (sisa kode return dll tetap sama)
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