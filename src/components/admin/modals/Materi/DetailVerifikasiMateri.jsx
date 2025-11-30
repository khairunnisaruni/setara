import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

// Import popup konfirmasi yang sudah ada
import AcceptedModal from "../Accepted";
import RejectedModal from "../Rejected";

const DetailVerifikasiMateri = ({ isOpen, onClose, materi }) => {
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  // Handler tombol Terima
  const handleApprove = () => {
    onClose();           // Tutup modal detail
    setShowAccepted(true); // Tampilkan popup diterima
  };

  // Handler tombol Tolak
  const handleReject = () => {
    onClose();
    setShowRejected(true);
  };

  return (
    <>
      {/* ===== Modal Detail Materi ===== */}
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 w-[360px] text-center relative animate-fade-in">
          {/* Tombol Close (X) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          {/* Judul Modal */}
          <Dialog.Title className="text-lg font-bold text-orange-500 underline underline-offset-4 mb-4">
            Detail Materi
          </Dialog.Title>

          {/* Isi Konten */}
          <div className="flex flex-col items-center space-y-2">
            

            {/* Detail Materi */}
            <div className="text-left w-full space-y-3">
              <div>
                <p className="font-semibold text-sm">Judul Materi</p>
                <p className="text-gray-400 text-sm">{materi?.title || "-"}</p>
              </div>

              <div>
                <p className="font-semibold text-sm">Jenis File</p>
                <p className="text-gray-400 text-sm">{materi?.fileType || "-"}</p>
              </div>

              <div>
                <p className="font-semibold text-sm">Kategori Pelajar</p>
                <p className="text-gray-400 text-sm">
                  {materi?.classCategory || "-"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Jenis Kategori</p>
                <p className="text-gray-400 text-sm">
                  {materi?.materialCategory || "-"}
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Deskripsi</p>
                <p className="text-gray-400 text-sm">
                  {materi?.description ||
                    "Deskripsi singkat tentang materi pembelajaran."}
                </p>
              </div>

              {materi?.tautan && (
                <div>
                  <p className="font-semibold text-sm">Tautan Materi</p>
                  <a
                    href={`https://${materi.tautan}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:underline break-all"
                  >
                    {materi.tautan}
                  </a>
                </div>
              )}
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
      <AcceptedModal isOpen={showAccepted} onClose={() => setShowAccepted(false)} />
      <RejectedModal isOpen={showRejected} onClose={() => setShowRejected(false)} />
    </>
  );
};

export default DetailVerifikasiMateri;
