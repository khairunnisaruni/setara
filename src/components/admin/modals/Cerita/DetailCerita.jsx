import { Dialog } from "@headlessui/react";

const DetailCerita = ({ isOpen, onClose, cerita }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 w-[360px] text-center relative">
        <Dialog.Title className="text-lg font-bold text-orange-500 underline underline-offset-4 mb-4">
          Detail Cerita
        </Dialog.Title>

        <div className="flex flex-col items-center space-y-3">
          {/* Detail Cerita */}
          <div className="text-left w-full space-y-3">
            <div>
              <p className="font-semibold text-sm">Judul Cerita</p>
              <p className="text-gray-500 text-sm">{cerita?.title}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Cerita Anda</p>
              <p className="text-gray-500 text-sm whitespace-pre-line">
                {cerita?.content ||
                  "Belum ada isi cerita yang ditulis oleh pengguna."}
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Batal */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="px-6 py-1.5 border border-orange-400 rounded-full text-orange-500 text-sm hover:bg-orange-50"
          >
            Tutup
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DetailCerita;
