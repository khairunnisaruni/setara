import { Dialog } from "@headlessui/react";

const DetailDonasi = ({ isOpen, onClose, donasi }) => {
  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg w-[320px] text-center relative overflow-hidden">
        {/* Header Gambar / Banner */}
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

        {/* Konten Detail */}
        <div className="p-4">
          <Dialog.Title className="text-base font-bold text-amber-500 underline underline-offset-4 mb-4">
            Detail Donasi
          </Dialog.Title>

          <div className="text-left space-y-3 text-sm">
            {/* Judul Donasi */}
            <div>
              <p className="font-semibold">Judul Donasi</p>
              <p className="text-gray-500">{donasi?.title || "—"}</p>
            </div>

            {/* Kategori */}
            <div>
              <p className="font-semibold">Kategori</p>
              <p className="text-gray-500">{donasi?.category || "—"}</p>
              
            </div>

            {/* Penerima Donasi */}
            <div>
              <p className="font-semibold">Penerima Donasi</p>
              <p className="text-gray-500">{donasi?.recipient || "—"}</p>
            </div>

            {/* Deskripsi */}
            <div>
              <p className="font-semibold">Deskripsi Donasi</p>
              <p className="text-gray-500">
                {donasi?.description || "Tidak ada deskripsi."}
              </p>
            </div>

            {/* Dampak / Impact */}
            <div>
              <p className="font-semibold">Dampak Donasi</p>
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

          {/* Tombol Tutup */}
          <div className="mt-5">
            <button
              onClick={onClose}
              className="px-5 py-1 border border-amber-400 rounded-full text-amber-500 text-sm hover:bg-amber-50"
            >
              Tutup
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DetailDonasi;
