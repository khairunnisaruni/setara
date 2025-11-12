import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import AcceptedModal from "../Accepted";
import RejectedModal from "../Rejected";

const DetailVerifikasiProgram = ({ isOpen, onClose, program }) => {
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  const handleApprove = () => {
    onClose();
    setShowAccepted(true);
  };

  const handleReject = () => {
    onClose();
    setShowRejected(true);
  };

  return (
    <>
      {/* ===== Modal Detail Verifikasi Program ===== */}
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <Dialog.Panel className="bg-white rounded-2xl shadow-lg w-[320px] text-center relative overflow-hidden animate-fade-in">
          {/* ===== Header Gambar ===== */}
          <div className="h-32 w-full bg-gray-100">
            <img
              src={
                program?.banner ||
                "https://via.placeholder.com/400x200.png?text=Banner+Program"
              }
              alt="Banner Program"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ===== Tombol Close ===== */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full p-1 text-gray-500 hover:text-gray-700 transition"
          >
            <X size={18} />
          </button>

          {/* ===== Konten Utama ===== */}
          <div className="p-4">
            {/* Judul Modal */}
            <Dialog.Title className="text-base font-bold text-amber-500 underline underline-offset-4 mb-4">
              Detail Program
            </Dialog.Title>

            {/* Detail Program */}
            <div className="text-left space-y-3 text-sm">
              <div>
                <p className="font-semibold">Judul Program</p>
                <p className="text-gray-500">{program?.title || "—"}</p>
              </div>

              <div>
                <p className="font-semibold">Penyelenggara</p>
                <p className="text-gray-500">{program?.organizer || "—"}</p>
              </div>

              <div>
                <p className="font-semibold">Jenis Program</p>
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    program?.programType === "Beasiswa"
                      ? "bg-orange-100 text-orange-700"
                      : program?.programType === "Pelatihan"
                      ? "bg-green-100 text-green-700"
                      : program?.programType === "Pengabdian Masyarakat"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {program?.programType || "—"}
                </span>
              </div>

              <div>
                <p className="font-semibold">Lokasi</p>
                <p className="text-gray-500">{program?.location || "—"}</p>
              </div>

              <div>
                <p className="font-semibold">Deskripsi</p>
                <p className="text-gray-500">
                  {program?.description || "Tidak ada deskripsi."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-semibold">Periode</p>
                  <p className="text-gray-500">{program?.period || "—"}</p>
                </div>
                <div>
                  <p className="font-semibold">Deadline</p>
                  <p className="text-gray-500">{program?.deadline || "—"}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold">Status</p>
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                    program?.status === "Aktif"
                      ? "bg-green-100 text-green-700"
                      : program?.status === "Nonaktif"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {program?.status || "—"}
                </span>
              </div>

              <div>
                <p className="font-semibold">Link Pendaftaran / Dokumentasi</p>
                <a
                  href={program?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:underline break-words"
                >
                  {program?.link || "Tidak ada link"}
                </a>
              </div>
            </div>

            {/* ===== Tombol Aksi ===== */}
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={handleApprove}
                className="px-6 py-1.5 rounded-full bg-green-500 text-white text-sm hover:bg-green-600 transition"
              >
                Terima
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-1.5 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition"
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

export default DetailVerifikasiProgram;
