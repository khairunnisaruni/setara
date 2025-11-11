import { CheckCircle2 } from "lucide-react";

const SuccessDeleteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg text-center">
        <div className="flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Berhasil Dihapus!
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Data telah berhasil dihapus dari sistem.
          </p>

          <button
            onClick={onClose}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Oke
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessDeleteModal;
