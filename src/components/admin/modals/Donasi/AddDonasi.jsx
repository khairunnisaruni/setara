import { useState } from "react";
import FailedModal from "../../modals/Failed";
import SuccessModal from "../../modals/Success";

const AddDonasiModal = ({ isOpen, onClose, onSubmit }) => {
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
      setShowSuccessModal(true);
    } catch (error) {
      onClose();
      setShowFailedModal(true);
    }
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
  ];

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <h2 className="text-base font-semibold text-center mb-4">
            Tambahkan Program Donasi
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
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
                placeholder="Contoh: Donasi Buku Bacaan untuk Anak SD di Daerah Terpencil"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
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
                placeholder="Contoh: Siswa SD Tapanuli, Komunitas belajar anak-anak usia 7–12 tahun"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Deskripsi Donasi */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Deskripsi Donasi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Tuliskan deskripsi tentang tujuan donasi, penerima manfaat, dan bentuk bantuan yang dibutuhkan..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
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
                value={formData.impact}
                onChange={handleChange}
                rows="2"
                placeholder="Bagaimana bantuan akan digunakan dan dampaknya bagi penerima manfaat"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
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
                placeholder="https://..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
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
                placeholder="Masukkan nama penanggung jawab donasi"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
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
                placeholder="Masukkan kontak atau nomor telepon penanggung jawab donasi"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-amber-500 text-sm px-4 py-1.5 rounded-md font-medium border border-gray-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-amber-400 text-white text-sm px-4 py-1.5 rounded-md font-medium hover:bg-amber-500"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Sukses & Gagal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <FailedModal
        isOpen={showFailedModal}
        onClose={() => setShowFailedModal(false)}
      />
    </>
  );
};

export default AddDonasiModal;
