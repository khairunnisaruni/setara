import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

// Import popup Accepted dan Rejected
import AcceptedModal from "../Accepted";
import RejectedModal from "../Rejected";

const DetailVerifikasiKuis = ({ isOpen, onClose, quiz }) => {
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
      {/* ===== Modal Detail Kuis ===== */}
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <Dialog.Panel className="bg-white rounded-2xl shadow-lg w-[360px] text-center relative overflow-hidden animate-fade-in">
          {/* ===== Header Gambar ===== */}
          <div className="h-40 w-full bg-gray-100">
            <img
              src={
                quiz?.gambar ||
                "https://via.placeholder.com/400x200.png?text=Gambar+Kuis"
              }
              alt="Gambar Kuis"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ===== Tombol Close (X) ===== */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full p-1 text-gray-500 hover:text-gray-700 transition"
          >
            <X size={18} />
          </button>

          {/* ===== Konten Utama ===== */}
          <div className="p-6">
            {/* Judul Modal */}
            <Dialog.Title className="text-lg font-bold text-orange-500 underline underline-offset-4 mb-6">
              Detail Kuis
            </Dialog.Title>

            {/* Isi Konten */}
            <div className="text-left space-y-4">
              <div>
                <p className="font-semibold text-sm">Judul Kuis & Game</p>
                <p className="text-gray-400 text-sm">{quiz?.judul || "—"}</p>
              </div>

              <div>
                <p className="font-semibold text-sm">Deskripsi</p>
                <p className="text-gray-400 text-sm">
                  {quiz?.deskripsi ||
                    "Kuis soal matematika tentang pecahan yang seru"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Platform</p>
                <p className="text-gray-400 text-sm">
                  {quiz?.platform || "Kahoot"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">
                  Link Kahoot atau Wayground
                </p>
                <a
                  href={quiz?.link || "https://create.kahoot.it/discover"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:underline break-all"
                >
                  {quiz?.link || "https://create.kahoot.it/discover"}
                </a>
              </div>

              <div>
                <p className="font-semibold text-sm">Kategori Mata Pelajaran</p>
                <p className="text-gray-400 text-sm">
                  {quiz?.kategoriMapel || "Matematika"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Kategori Kelas</p>
                <p className="text-gray-400 text-sm">
                  {quiz?.kelas || "4 SD"}
                </p>
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

export default DetailVerifikasiKuis;
