import { CheckCircle } from "lucide-react";

const AcceptedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-[340px] sm:w-[380px] text-center shadow-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()} // supaya gak nutup pas klik konten
      >
        <div className="flex flex-col items-center space-y-3">
          <CheckCircle size={60} className="text-green-500" />
          <div>
            <p className="text-xl font-semibold text-green-600 mb-1">Berhasil!</p>
            <p className="text-gray-600 text-sm">Data buku telah diterima dengan sukses.</p>
          </div>
          <button
            onClick={onClose}
            className="mt-3 px-5 py-1.5 rounded-full bg-green-500 text-white text-sm hover:bg-green-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptedModal;
