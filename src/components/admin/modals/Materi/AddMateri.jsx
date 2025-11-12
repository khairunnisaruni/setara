import { useState } from "react";
import FailedModal from "../../modals/Failed";
import SuccessModal from "../../modals/Success";

const AddMateriModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    fileType: "",
    classCategory: "",
    materialCategory: "",
    description: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileTypeChange = (type) => {
    setFormData({ ...formData, fileType: type });
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
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
          <h2 className="text-base font-semibold text-center mb-4">
            Tambah Materi
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Judul Materi */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Judul Materi
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm "
                placeholder="Masukkan judul Materi"
              />
            </div>

            {/* Jenis File */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Jenis File
              </label>
              <div className="flex gap-2">
                {["PDF", "Audio", "Video"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleFileTypeChange(type)}
                    className={`px-3 py-1.5 rounded-md text-sm border transition ${
                      formData.fileType === type
                        ? "bg-amber-400 text-white border-amber-400"
                        : " text-gray-600 border-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Kategori Pelajar */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Kategori Pelajar
              </label>
              <select
                name="classCategory"
                value={formData.classCategory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 "
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

            {/* Jenis Kategori */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Jenis Kategori
              </label>
              <select
                name="materialCategory"
                value={formData.materialCategory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 "
              >
                <option value="">Pilih Kategori</option>
                <option value="materi-utama">Materi Utama</option>
                <option value="materi-pendukung">Materi Pendukung</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm "
                placeholder="Deskripsi singkat tentang materi"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className=" text-amber-500 text-sm px-4 py-1.5 rounded-md font-medium border border-gray-200"
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

export default AddMateriModal;
