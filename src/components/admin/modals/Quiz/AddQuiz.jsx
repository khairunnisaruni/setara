import { useState } from "react";
import { Upload } from "lucide-react";
import FailedModal from "../../modals/Failed";
import SuccessModal from "../../modals/Success";

const AddQuizModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "",
    link: "",
    subjectCategory: "",
    classCategory: "",
    file: null,
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

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
          <h2 className="text-base font-semibold text-center mb-3">
            Tambah Kuis & Game
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Judul */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Judul Kuis & Game
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Masukkan judul"
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Deskripsi (15 Kata)
              </label>
              <textarea
                name="description"
                rows="2"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Deskripsi singkat"
              />
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select
                name="platform"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
              >
                <option value="">Pilih Platform</option>
                <option value="kahoot">Kahoot</option>
                <option value="wayground">Wayground</option>
              </select>
            </div>

            {/* Link */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Link Kuis
              </label>
              <input
                type="url"
                name="link"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Masukkan link"
              />
            </div>

            {/* Kategori Mata Pelajaran */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Mata Pelajaran
              </label>
              <select
                name="subjectCategory"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
              >
                <option value="">Pilih Mata Pelajaran</option>
                <option value="matematika">Matematika</option>
                <option value="bahasa-indonesia">Bahasa Indonesia</option>
                <option value="ipa">IPA</option>
                <option value="ips">IPS</option>
                <option value="bahasa-inggris">Bahasa Inggris</option>
              </select>
            </div>

            {/* Kategori Kelas */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Kelas
              </label>
              <select
                name="classCategory"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
              >
                <option value="">Pilih Kelas</option>
                <option value="kelas-1">Kelas 1</option>
                <option value="kelas-2">Kelas 2</option>
                <option value="kelas-3">Kelas 3</option>
                <option value="kelas-4">Kelas 4</option>
                <option value="kelas-5">Kelas 5</option>
                <option value="kelas-6">Kelas 6</option>
              </select>
            </div>

            {/* Upload Gambar Pendukung */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Gambar Pendukung
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 cursor-pointer text-gray-600 text-sm hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4 text-gray-500" />
                  {formData.file ? formData.file.name : "Unggah File"}
                </label>
              </div>
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
                className="bg-amber-400 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-500"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Sukses dan Gagal */}
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

export default AddQuizModal;
