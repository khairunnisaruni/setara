
import { useState, useEffect } from "react";

const AddDonasiModal = ({ isOpen, onClose, onSubmit }) => {
  // State awal kosong
  const initialFormState = {
    title: "",
    kategori: "",
    penerima_manfaat: "",
    description: "",
    dampak: "",
    link: "",
    penanggung_jawab: "",
    contact_person: "",
    poster: null,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Reset form setiap kali modal dibuka
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState);
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
    // Kirim data ke Parent (DonasiTableSection)
    onSubmit(formData);

  };

  // Komponen baru benar‑benar hilang hanya jika:
  // - form donasi tertutup DAN
  // - tidak ada popup sukses/gagal yang tampil
  if (!isOpen && !showSuccessModal && !showFailedModal) return null;

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
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-base font-semibold text-center mb-4">
          Tambahkan Program Donasi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Judul Donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Judul Donasi</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Contoh: Donasi Buku Bacaan..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          {/* Kategori Donasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Kategori Donasi</label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
              required
            >
              <option value="">Pilih kategori donasi...</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Penerima Manfaat */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Penerima Manfaat</label>
            <input
              type="text"
              name="penerima_manfaat"
              value={formData.penerima_manfaat}
              onChange={handleChange}
              placeholder="Contoh: Siswa SD Tapanuli..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi Donasi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Tuliskan deskripsi..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          {/* Poster */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Poster / Banner Donasi</label>
            <input
              type="file"
              name="poster"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Dampak */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Dampak Donasi</label>
            <textarea
              name="dampak"
              value={formData.dampak}
              onChange={handleChange}
              rows="2"
              placeholder="Dampak bagi penerima manfaat..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tautan ke sumber resmi</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          {/* Penanggung Jawab */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Penanggung Jawab Donasi</label>
            <input
              type="text"
              name="penanggung_jawab"
              value={formData.penanggung_jawab}
              onChange={handleChange}
              placeholder="Nama penanggung jawab"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Contact Person</label>
            <input
              type="text"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              placeholder="No HP / Kontak"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
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
              className="bg-amber-400 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-500 font-bold"
            >
              Tambahkan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDonasiModal;
