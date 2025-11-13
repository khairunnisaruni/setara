import { useState } from "react";
import FailedModal from "../../modals/Failed";
import SuccessModal from "../../modals/Success";

const AddInformasiModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
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
      {/* Modal Tambah Informasi */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white rounded-2xl p-6 w-[420px] shadow-lg">
          <h2 className="text-lg font-bold text-center mb-4">
            Tambah Panduan Baru
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Judul Panduan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Panduan
              </label>
              <input
                type="text"
                name="judul"
                onChange={handleChange}
                value={formData.judul}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Masukkan judul panduan"
                required
              />
            </div>

            {/* Deskripsi Panduan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi Panduan
              </label>
              <textarea
                name="deskripsi"
                rows="5"
                onChange={handleChange}
                value={formData.deskripsi}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Tulis deskripsi panduan..."
                required
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-amber-400 text-white text-sm px-4 py-2 rounded-md hover:bg-amber-500"
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

export default AddInformasiModal;
