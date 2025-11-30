import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

// Import popup yang sudah ada
import AcceptedModal from "../Accepted";
import RejectedModal from "../Rejected";

const DetailVerifikasiCerita = ({ isOpen, onClose, cerita }) => {
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  // Handler tombol Terima
  const handleApprove = () => {
    onClose();
    setShowAccepted(true);
  };

  // Handler tombol Tolak
  const handleReject = () => {
    onClose();
    setShowRejected(true);
  };

  return (
    <>
      {/* ===== Modal Detail Cerita ===== */}
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 w-[380px] text-center relative animate-fade-in">
          {/* Tombol Close (X) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          {/* Judul Modal */}
          <Dialog.Title className="text-lg font-bold text-orange-500 underline underline-offset-4 mb-4">
            Detail Cerita
          </Dialog.Title>

          {/* Isi Konten */}
          <div className="flex flex-col items-center space-y-3">
            <div className="text-left w-full space-y-3">
              <div>
                <p className="font-semibold text-sm">Judul Cerita</p>
                <p className="text-gray-500 text-sm">{cerita?.title}</p>
              </div>

              <div>
                <p className="font-semibold text-sm">Cerita Anda</p>
                <p className="text-gray-500 text-sm whitespace-pre-line max-h-52 overflow-y-auto">
                  {cerita?.content ||
                    "Belum ada isi cerita yang ditulis oleh pengguna."}
                </p>
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleApprove}
              className="px-6 py-1.5 rounded-full bg-green-500 text-white text-sm hover:bg-green-600"
            >
              Terima
            </button>
            <button
              onClick={handleReject}
              className="px-6 py-1.5 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
            >
              Tolak
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* ===== Popup Accepted & Rejected ===== */}
      <AcceptedModal
        isOpen={showAccepted}
        onClose={() => setShowAccepted(false)}
      />
      <RejectedModal
        isOpen={showRejected}
        onClose={() => setShowRejected(false)}
      />
    </>
  );
};

export default DetailVerifikasiCerita;
