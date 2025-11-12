import { Dialog } from "@headlessui/react";

const DetailKuis = ({ isOpen, onClose, quiz }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg w-[360px] text-center relative overflow-hidden">
        {/* Header Gambar */}
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

        {/* Konten Detail */}
        <div className="p-6">
          {/* Judul */}
          <Dialog.Title className="text-lg font-bold text-orange-500 underline underline-offset-4 mb-6">
            Detail Kuis
          </Dialog.Title>

          {/* Detail Kuis */}
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
                className="text-gray-400 text-sm hover:underline"
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
              <p className="text-gray-400 text-sm">{quiz?.kelas || "4 SD"}</p>
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
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DetailKuis;
