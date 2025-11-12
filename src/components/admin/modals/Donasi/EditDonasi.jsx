import { useState, useEffect } from "react";

const EditDonasiModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    recipient: "",
    description: "",
    impact: "",
    link: "",
    responsible: "",
    contact: "",
    banner: null,
  });

  // Saat modal dibuka, isi dengan data dummy
  useEffect(() => {
    if (isOpen) {
      const dummyData = {
        title: "Donasi Buku Bacaan untuk Anak SD di Daerah Terpencil",
        category: "Pendidikan",
        recipient: "Siswa SD Tapanuli, Komunitas belajar anak-anak usia 7–12 tahun",
        description:
          "Program donasi untuk membantu penyediaan buku bacaan anak-anak di daerah terpencil agar meningkatkan minat baca dan pengetahuan mereka.",
        impact:
          "Buku akan digunakan oleh sekolah dasar dan komunitas lokal, membantu meningkatkan literasi anak-anak.",
        link: "https://donasi-sekolahpeduli.id",
        responsible: "Komunitas Sekolah Peduli",
        contact: "0812-3456-7890 (Rina)",
        banner: null,
      };
      setFormData(dummyData);
    }
  }, [isOpen]);

  // Handle perubahan input teks & file
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📦 Data donasi yang diperbarui:", formData);
    if (onSubmit) onSubmit(formData);
  };

  if (!isOpen) return null;

  const categoryOptions = [
    "Pendidikan",
    "Kesehatan",
    "Bencana Alam",
    "Sosial",
    "Lingkungan",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-base font-semibold mb-3 text-gray-800 text-center">
          Edit Program Donasi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2 text-left">
          {/* Judul Donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Judul Donasi
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Contoh: Donasi Buku Bacaan untuk Anak SD di Daerah Terpencil"
            />
          </div>

          {/* Kategori Donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Kategori Donasi
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
            >
              <option value="">Pilih kategori donasi...</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Penerima Manfaat */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Penerima Manfaat
            </label>
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Contoh: Siswa SD Tapanuli, Komunitas belajar anak-anak usia 7–12 tahun"
            />
          </div>

          {/* Deskripsi Donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Deskripsi Donasi
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Tuliskan deskripsi tentang tujuan donasi, penerima manfaat, dan bentuk bantuan yang dibutuhkan..."
            />
          </div>

          {/* Poster / Banner Donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Poster / Banner Donasi
            </label>
            <input
              type="file"
              name="banner"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Dampak Donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Dampak Donasi
            </label>
            <textarea
              name="impact"
              rows="2"
              value={formData.impact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Bagaimana bantuan akan digunakan dan dampaknya bagi penerima manfaat"
            />
          </div>

          {/* Tautan ke sumber resmi donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tautan ke sumber resmi donasi
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="https://..."
            />
          </div>

          {/* Penanggung Jawab Donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Penanggung Jawab Donasi
            </label>
            <input
              type="text"
              name="responsible"
              value={formData.responsible}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Masukkan nama penanggung jawab donasi"
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Contact Person
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Masukkan kontak atau nomor telepon penanggung jawab donasi"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-3">
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
              Perbarui
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonasiModal;
