import { useState } from "react";
import FailedModal from "../../modals/Failed";
import SuccessModal from "../../modals/Success";

const AddCeritaModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      {/* Modal Tambah Cerita */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
          <h2 className="text-base font-semibold text-center mb-3">
            Bagikan Cerita Anda
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Judul Cerita */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Judul Cerita
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={formData.title}
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
                placeholder="Masukkan judul cerita"
                required
              />
            </div>

            {/* Cerita Anda */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Cerita Anda
              </label>
              <textarea
                name="content"
                rows="5"
                onChange={handleChange}
                value={formData.content}
                className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
                placeholder="Tulis cerita Anda di sini..."
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

export default AddCeritaModal;
