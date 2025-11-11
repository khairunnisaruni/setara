import { Trash2 } from "lucide-react";

const KonfirmasiHapus = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-3 rounded-full mb-3">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>

          <h2 className="text-lg font-semibold mb-2">Hapus Data?</h2>
          <p className="text-gray-600 text-sm mb-6">
            Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan.
          </p>

          <div className="flex justify-end gap-3 w-full">
            <button
              onClick={onClose}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiHapus;
