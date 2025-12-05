import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

const EditBookModal = ({ isOpen, onClose, onSubmit, initialData }) => {

  // 1. State untuk Form
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    kategori_id: "",
    description: "",
    link: "",
    gambar: null,
  });

  // 2. State untuk menyimpan daftar Kategori dari Database
  const [kategoriList, setKategoriList] = useState([]);

  // 3. FETCH DATA KATEGORI (Agar dropdown dinamis)
  useEffect(() => {
    // Pastikan endpoint ini sesuai dengan backend kamu
    fetch('http://localhost:5000/admin/categories') // atau /admin/kategori
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setKategoriList(data);
        } else {
          console.error("Data kategori bukan array:", data);
        }
      })
      .catch(err => console.error("Gagal ambil kategori:", err));
  }, []);

  // 4. Isi Form saat modal dibuka (Edit Mode)
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        kategori_id: initialData.kategori_id || "", 
        description: initialData.description || "",
        link: initialData.link || "",
        gambar: null, 
      });
    } else {
        // Reset form jika mode tambah
        setFormData({
            title: "",
            author: "",
            kategori_id: "",
            description: "",
            link: "",
            gambar: null
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
      <div className="bg-white rounded-xl p-4 w-full max-w-md shadow-lg">

        <h2 className="text-lg font-semibold mb-3 text-gray-800">
          {initialData ? "Perbarui Rekomendasi Buku" : "Tambah Buku Baru"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2 text-left">
          
          {/* Judul Buku */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Buku</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}

              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Masukkan judul buku"
              required

            />
          </div>

          {/* Penulis Buku */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Penulis Buku</label>

            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}

              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Masukkan nama penulis"
              required
            />
          </div>

          {/* Kategori Buku (SUDAH DINAMIS) */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Kategori Buku</label>
            <select
              name="kategori_id"
              value={formData.kategori_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md text-gray-700 text-sm"
              required
            >
              <option value="">Pilih Kategori</option>
              
              {/* Looping data dari database */}
              {kategoriList.map((kat) => (
                <option key={kat.id} value={kat.id}>
                  {kat.nama || kat.name} {/* Sesuaikan dengan nama kolom di tabel kategori */}
                </option>
              ))}


            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi</label>

            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}

              className="w-full p-2 border border-gray-400 rounded-md text-sm"
              placeholder="Deskripsi singkat"
            />
          </div>

          {/* Upload Sampul */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Upload Sampul Buku</label>
            <div className="relative">
              <input
                type="file"
                name="gambar"
                id="edit-book-file-upload"
                onChange={handleChange}
                className="hidden"
                accept="image/*"

              />
              <label
                htmlFor="edit-book-file-upload"
                className="flex items-center gap-2 border border-gray-400 rounded-md px-3 py-1.5 cursor-pointer text-gray-600 hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 text-gray-500" />

                {formData.gambar ? formData.gambar.name : "Pilih File Baru (Opsional)"}
              </label>
            </div>
            {!formData.gambar && initialData?.gambar && (
                <p className="text-xs text-gray-500 mt-1">File saat ini: {initialData.gambar}</p>
            )}
          </div>

          {/* Tautan */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tautan Buku</label>

            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded-md text-sm"
              placeholder="Contoh: https://..."
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md">Batal</button>
            <button type="submit" className="bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-500">
              {initialData ? "Simpan Perubahan" : "Tambah Buku"}
            </button>
          </div>


        </form>
      </div>
    </div>
  );
};

export default EditBookModal;

