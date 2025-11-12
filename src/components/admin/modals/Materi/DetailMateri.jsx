import { Dialog } from "@headlessui/react";

const DetailMateri = ({ isOpen, onClose, materi }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 w-[360px] text-center relative">
        {/* Judul Modal */}
        <Dialog.Title className="text-lg font-bold text-orange-500 underline underline-offset-4 mb-4">
          Detail Materi
        </Dialog.Title>

        <div className="flex flex-col items-center space-y-2">
          {/* Icon / Preview File */}
          <div className="w-28 h-28 bg-gray-100 flex items-center justify-center rounded-md mb-4">
            <p className="text-sm text-gray-400 italic">
              {materi?.fileType || "File"}
            </p>
          </div>

          {/* Detail Materi */}
          <div className="text-left w-full space-y-3">
            <div>
              <p className="font-semibold text-sm">Judul Materi</p>
              <p className="text-gray-400 text-sm">
                {materi?.title || "-"}
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm">Jenis File</p>
              <p className="text-gray-400 text-sm">
                {materi?.fileType || "-"}
              </p>
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
                  "Deskripsi singkat tentang materi pembelajaran"}
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Tutup */}
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

export default DetailMateri;
