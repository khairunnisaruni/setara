import { useState, useEffect } from "react";

const EditDonasiModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // 1. STATE HARUS SAMA DENGAN DATABASE (Bahasa Indonesia)
  const [formData, setFormData] = useState({
    title: "",
    kategori: "",            // Dulu: category (GANTI INI PENTING!)
    penerima_manfaat: "",    // Dulu: recipient
    description: "",
    dampak: "",              // Dulu: impact
    link: "",
    penanggung_jawab: "",    // Dulu: responsible
    contact_person: "",      // Dulu: contact
    poster: null,
  });

  // 2. ISI DATA SAAT EDIT (Gunakan nama database)
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title || "",
          kategori: initialData.kategori || "", // Pastikan ini 'kategori'
          penerima_manfaat: initialData.penerima_manfaat || "",
          description: initialData.description || "",
          dampak: initialData.dampak || "",
          link: initialData.link || "",
          penanggung_jawab: initialData.penanggung_jawab || "",
          contact_person: initialData.contact_person || "",
        });
      } else {
        // Reset Form untuk Tambah Baru
        setFormData({
          title: "",
          kategori: "",
          penerima_manfaat: "",
          description: "",
          dampak: "",
          link: "",
          penanggung_jawab: "",
          contact_person: "",
        });
      }
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

  const categoryOptions = [
    "Kebutuhan Dasar Siswa",
    "Beasiswa & Bantuan Pendidikan",
    "Kegiatan Relawan & Volunteer",
    "Fasilitas Belajar & Infrastruktur",
    "Teknologi Pendidikan & Literasi Digital",
    "Pengabdian Masyarakat & Workshop",
    "Kegiatan Ekstra Kulikuler & Kreativitas",
    "Kampanye & Edukasi Masyarakat",
    "Bantuan Bencana Alam",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-base font-semibold mb-3 text-gray-800 text-center">
          {initialData ? "Edit Program Donasi" : "Tambah Program Donasi"}
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
              placeholder="Contoh: Donasi Buku Bacaan..."
              required
            />
          </div>

          {/* Kategori Donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Kategori Donasi
            </label>
            <select
              name="kategori" // WAJIB SAMA DENGAN STATE
              value={formData.kategori}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
              required
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
              name="penerima_manfaat" // WAJIB SAMA DENGAN STATE
              value={formData.penerima_manfaat}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Contoh: Siswa SD Tapanuli..."
              required
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
              placeholder="Tuliskan deskripsi..."
              required
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
              name="dampak" // WAJIB SAMA DENGAN STATE
              rows="2"
              value={formData.dampak}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Bagaimana dampak donasi ini..."
              required
            />
          </div>

          {/* Tautan */}
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
              required
            />
          </div>

          {/* Penanggung Jawab */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Penanggung Jawab Donasi
            </label>
            <input
              type="text"
              name="penanggung_jawab" // WAJIB SAMA DENGAN STATE
              value={formData.penanggung_jawab}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Masukkan nama penanggung jawab"
              required
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Contact Person
            </label>
            <input
              type="text"
              name="contact_person" // WAJIB SAMA DENGAN STATE
              value={formData.contact_person}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="No HP / Kontak"
              required
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
              {initialData ? "Perbarui" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonasiModal;