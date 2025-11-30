import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import AcceptedModal from "../Accepted";
import RejectedModal from "../Rejected";

const DetailVerifikasiDonasi = ({ isOpen, onClose, donasi }) => {
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
      {/* ===== Modal Detail Verifikasi Donasi ===== */}
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
                donasi?.banner ||
                "https://via.placeholder.com/400x200.png?text=Banner+Donasi"
              }
              alt="Banner Donasi"
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
            <Dialog.Title className="text-base font-bold text-amber-500 underline underline-offset-4 mb-4">
              Detail Donasi
            </Dialog.Title>

            {/* ===== Detail Donasi ===== */}
            <div className="text-left space-y-3 text-sm">
              {/* Judul Donasi */}
              <div>
                <p className="font-semibold">Judul Donasi</p>
                <p className="text-gray-500">{donasi?.title || "—"}</p>
              </div>

              {/* Kategori */}
              <div>
                <p className="font-semibold">Kategori</p>
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                    donasi?.category === "Pendidikan"
                      ? "bg-blue-100 text-blue-700"
                      : donasi?.category === "Kesehatan"
                      ? "bg-green-100 text-green-700"
                      : donasi?.category === "Lingkungan"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {donasi?.category || "—"}
                </span>
              </div>

              {/* Penerima Donasi */}
              <div>
                <p className="font-semibold">Penerima Donasi</p>
                <p className="text-gray-500">{donasi?.recipient || "—"}</p>
              </div>

              {/* Deskripsi */}
              <div>
                <p className="font-semibold">Deskripsi</p>
                <p className="text-gray-500">
                  {donasi?.description || "Tidak ada deskripsi."}
                </p>
              </div>

              {/* Dampak / Impact */}
              <div>
                <p className="font-semibold">Dampak</p>
                <p className="text-gray-500">
                  {donasi?.impact || "Belum ada informasi dampak."}
                </p>
              </div>

              {/* Penanggung Jawab */}
              <div>
                <p className="font-semibold">Penanggung Jawab</p>
                <p className="text-gray-500">{donasi?.responsible || "—"}</p>
              </div>

              {/* Kontak */}
              <div>
                <p className="font-semibold">Kontak</p>
                <p className="text-gray-500">{donasi?.contact || "—"}</p>
              </div>

              {/* Tautan */}
              <div>
                <p className="font-semibold">Tautan Informasi / Dokumentasi</p>
                <a
                  href={donasi?.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:underline break-all"
                >
                  {donasi?.link || "Tidak ada link"}
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

export default DetailVerifikasiDonasi;
