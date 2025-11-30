const SuccessUpdateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg scale-100 transition-transform">
        {/* Ikon Ceklis Hijau */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">Berhasil!</h3>
        <p className="text-gray-500 text-sm mb-6">
          Data kuis berhasil diperbarui.
        </p>

        <button
          onClick={onClose}
          className="bg-amber-400 text-white w-full py-2 rounded-md font-semibold hover:bg-amber-500 transition"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};

export default SuccessUpdateModal;