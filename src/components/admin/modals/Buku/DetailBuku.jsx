import { Dialog } from "@headlessui/react";

const DetailBuku = ({ isOpen, onClose, book }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 w-[360px] text-center relative">
        <Dialog.Title className="text-lg font-bold text-orange-500 underline underline-offset-4 mb-4">
          Detail Buku
        </Dialog.Title>

        <div className="flex flex-col items-center space-y-2">
          {/* Gambar Buku */}
          <div className="w-28 h-36 bg-gray-200 rounded-md mb-4"></div>

          {/* Detail Buku */}
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
                  "Untuk pembelajaran Kelas 1 SD dalam menguji kembali pengetahuan dasar mereka"}
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm">Tautan Buku</p>
              <a
                href={`https://${book?.tautan}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 text-sm hover:underline"
              >
                {book?.tautan}
              </a>
            </div>
          </div>
        </div>

        {/* Tombol Batal */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="px-6 py-1.5 border border-orange-400 rounded-full text-orange-500 text-sm hover:bg-orange-50"
          >
            Batal
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DetailBuku;
