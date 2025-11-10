import { XCircle } from "lucide-react";

const ErrorModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-5 flex items-center gap-3 shadow-md">
        <XCircle size={40} className="text-red-500" />
        <div>
          <p className="text-red-600 font-semibold">Penambahan Gagal</p>
          <p>Gagal menambahkan data. Silahkan coba lagi.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
