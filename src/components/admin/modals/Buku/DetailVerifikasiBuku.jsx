import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

// Import popup yang sudah ada
import AcceptedModal from "../Accepted";
import RejectedModal from "../Rejected";

const DetailVerifikasiBuku = ({ isOpen, onClose, book }) => {
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  // Handler tombol Terima
const handleApprove = () => {
  onClose();          // Tutup modal detail dulu
  setShowAccepted(true);  // Langsung munculkan popup Accepted
};

// Handler tombol Tolak
const handleReject = () => {
  onClose();
  setShowRejected(true);
};

  return (
    <>
      {/* ===== Modal Detail Buku ===== */}
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
            Detail Buku
          </Dialog.Title>

          {/* Isi Konten */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-28 h-36 bg-gray-200 rounded-md mb-4"></div>

            <div className="text-left w-full space-y-3">
              <div>
                <p className="font-semibold text-sm">Judul Buku</p>
                <p className="text-gray-400 text-sm">{book?.title}</p>
              </div>

              <div>
                <p className="font-semibold text-sm">Penulis Buku</p>
                <p className="text-gray-400 text-sm">{book?.penulis}</p>
              </div>

              <div>
                <p className="font-semibold text-sm">Kategori Buku</p>
                <p className="text-gray-400 text-sm">{book?.kategori}</p>
              </div>

              <div>
                <p className="font-semibold text-sm">Deskripsi</p>
                <p className="text-gray-400 text-sm">
                  {book?.deskripsi ||
                    "Untuk pembelajaran Kelas 1 SD dalam menguji kembali pengetahuan dasar mereka."}
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm">Tautan Buku</p>
                <a
                  href={`https://${book?.tautan}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:underline break-all"
                >
                  {book?.tautan}
                </a>
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
      <AcceptedModal isOpen={showAccepted} onClose={() => setShowAccepted(false)} />
      <RejectedModal isOpen={showRejected} onClose={() => setShowRejected(false)} />
    </>
  );
};

export default DetailVerifikasiBuku;
