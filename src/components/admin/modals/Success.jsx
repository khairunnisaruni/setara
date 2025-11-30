import { CheckCircle } from "lucide-react";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-5 flex items-center gap-3 shadow-md">
        <CheckCircle size={40} className="text-green-500" />
        <div>
          <p className="text-green-600 font-semibold">Berhasil!</p>
          <p>Data berhasil ditambahkan.</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
