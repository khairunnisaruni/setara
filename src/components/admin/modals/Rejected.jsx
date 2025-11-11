import { XCircle } from "lucide-react";

const RejectedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-[340px] sm:w-[380px] text-center shadow-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()} // supaya gak ketutup pas klik konten
      >
        <div className="flex flex-col items-center space-y-3">
          <XCircle size={60} className="text-red-500" />
          <div>
            <p className="text-xl font-semibold text-red-600 mb-1">Data Ditolak</p>
            <p className="text-gray-600 text-sm">Data buku telah ditolak.</p>
          </div>
          <button
            onClick={onClose}
            className="mt-3 px-5 py-1.5 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectedModal;
