import { CheckCircle } from "lucide-react";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-[320px] flex flex-col items-center shadow-2xl animate-fade-in-up">
        
        {/* Icon Besar di Tengah */}
        <CheckCircle size={60} className="text-green-500 mb-3" />
        
        {/* Teks */}
        <h3 className="text-xl font-bold text-gray-800 mb-1">Berhasil!</h3>
        <p className="text-gray-500 text-center text-sm mb-6">
          Data berhasil ditambahkan ke sistem.
        </p>

        {/* Tombol Oke */}
        <button 
          onClick={onClose}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-xl transition duration-200"
        >
          Oke, Mengerti
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
