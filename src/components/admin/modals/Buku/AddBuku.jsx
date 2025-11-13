import { useState } from "react";
import { Upload } from "lucide-react";
import FailedModal from "../../modals/Failed";
import SuccessModal from "../../modals/Success";

const AddBookModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    link: "",
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
      {/* Modal Tambah Buku */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
          <h2 className="text-base font-semibold text-center mb-3">
            Tambah Rekomendasi Buku
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Judul Buku */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Judul Buku
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
                placeholder="Masukkan judul buku"
              />
            </div>

            {/* Penulis Buku */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Penulis Buku
              </label>
              <input
                type="text"
                name="author"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
                placeholder="Masukkan nama penulis buku"
              />
            </div>

            {/* Kategori Buku */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Kategori Buku
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
              >
                <option value="">Pilih Kategori</option>
                <option value="fiksi">Fiksi</option>
                <option value="nonfiksi">Non-Fiksi</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                name="description"
                rows="2"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
                placeholder="Deskripsi singkat tentang buku"
              />
            </div>

            {/* Upload Sampul Buku */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Upload Sampul Buku
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
                  {formData.file ? formData.file.name : "Upload Sampul Buku"}
                </label>
              </div>
            </div>

            {/* Tautan Buku */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Tautan Buku
              </label>
              <input
                type="url"
                name="link"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
                placeholder="Contoh: www.bukunasional.com"
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
                className="bg-amber-400 text-white text-sm px-3 py-1.5 rounded-md hover:bg-amber-500"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Popup sukses / gagal */}
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

export default AddBookModal;
