
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

// ❌ Hapus import Success/Failed modal dari sini agar tidak bentrok
// Parent (Buku.jsx) yang akan menampilkannya.

const AddBookModal = ({ isOpen, onClose, onSubmit }) => {
  // 1. State Form
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    kategori_id: "", // ID (Integer)
    description: "",
    link: "",
    gambar: null,    // File Object
  });

  const [kategoriList, setKategoriList] = useState([]);

  // 2. Fetch Kategori
  useEffect(() => {
    if (isOpen) {
        fetch('http://localhost:5000/admin/categories') 
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) setKategoriList(data);
        })
        .catch(err => console.error("Gagal ambil kategori:", err));
    }
  }, [isOpen]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim data mentah ke Parent (Buku.jsx)
    onSubmit(formData);
    
    // Reset form
    setFormData({
        title: "", author: "", kategori_id: "", description: "", link: "", gambar: null
    });

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
        <h2 className="text-base font-semibold text-center mb-3">
          Tambah Rekomendasi Buku
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Judul */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Judul Buku</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Masukkan judul" required />
          </div>

          {/* Penulis */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Penulis Buku</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Nama penulis" required />
          </div>

          {/* Kategori (Dinamis) */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Kategori Buku</label>
            <select name="kategori_id" value={formData.kategori_id} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700" required>
              <option value="">Pilih Kategori</option>
              {kategoriList.map((kat) => (
                  <option key={kat.id} value={kat.id}>{kat.nama || kat.name}</option>
              ))}
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea name="description" value={formData.description} rows="2" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="Deskripsi singkat" />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Upload Sampul Buku</label>
            <div className="relative">
              <input type="file" name="gambar" id="add-book-file-upload" onChange={handleChange} className="hidden" accept="image/*" />
              <label htmlFor="add-book-file-upload" className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 cursor-pointer text-gray-600 text-sm hover:bg-gray-50">
                <Upload className="w-4 h-4 text-gray-500" />
                {formData.gambar ? formData.gambar.name : "Upload Sampul Buku"}
              </label>
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tautan Buku</label>
            <input type="url" name="link" value={formData.link} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" placeholder="https://..." />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-md">Batal</button>
            <button type="submit" className="bg-amber-400 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-500">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;

