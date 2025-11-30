import { XCircle, AlertTriangle } from "lucide-react";

const RejectedModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-[340px] sm:w-[380px] text-center shadow-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center space-y-3">
          {/* Ikon Silang */}
          <div className="bg-red-100 p-3 rounded-full">
            <XCircle size={40} className="text-red-600" />
          </div>

          <div>
            <p className="text-xl font-semibold text-gray-800 mb-1">Tolak Program?</p>
            <p className="text-gray-600 text-sm">
              Program ini akan ditandai sebagai ditolak.
            </p>
          </div>

          {/* Dua Tombol: Batal & Ya */}
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-50 font-medium"
            >
              Batal
            </button>
            <button
              onClick={() => {
                onConfirm(); // Panggil fungsi update ke backend
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 font-medium"
            >
              Ya, Tolak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectedModal;