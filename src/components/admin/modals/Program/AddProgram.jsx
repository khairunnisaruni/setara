import { useState } from "react";
import FailedModal from "../../modals/Failed";
import SuccessModal from "../../modals/Success";

const AddProgramModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    organizer: "",
    programType: "",
    location: "",
    description: "",
    period: "",
    deadline: "",
    status: "Akan Datang",
    link: "",
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

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, programType: type });
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

  const typeOptions = [
    { value: "volunteer", label: "Volunteer" },
    { value: "pengabdian", label: "Pengabdian Masyarakat" },
    { value: "beasiswa", label: "Beasiswa" },
  ];

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
          <h2 className="text-base font-semibold text-center mb-4">
            Tambahkan Program Baru
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Judul Program */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Judul Program
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Program Kampus Mengajar Angkatan 7"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Penyelenggara */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Penyelenggara
              </label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="Contoh: Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Jenis Program (Button Selector) */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Jenis Program
              </label>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleTypeSelect(option.value)}
                    className={`text-xs px-3 py-1.5 rounded-md border font-medium transition-all
                      ${
                        formData.programType === option.value
                          ? "bg-amber-400 text-white border-amber-400"
                          : "border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lokasi Program */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Lokasi Program
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Beri tahu dimana lokasi volunteer/pengabdian masyarakat"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Deskripsi Program */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Deskripsi Program
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Jelaskan deskripsi program ini"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Periode / Tanggal */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Periode / Tanggal
              </label>
              <input
                type="text"
                name="period"
                value={formData.period}
                onChange={handleChange}
                placeholder="Contoh: Januari - Juni 2025"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Deadline Pendaftaran */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Deadline Pendaftaran
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Status Program */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Status Program
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
              >
                <option value="Akan Datang">Akan Datang</option>
                <option value="Sedang Berjalan">Sedang Berjalan</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>

            {/* Tautan ke sumber resmi */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Tautan ke sumber resmi program
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

            {/* Poster / Banner */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Poster / Banner
              </label>
              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={handleChange}
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

export default AddProgramModal;
