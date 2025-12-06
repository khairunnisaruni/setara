import { Dialog } from "@headlessui/react";

const DetailKuis = ({ isOpen, onClose, quiz }) => {

  // ✅ PERBAIKAN DI SINI
  const getImageUrl = (filename) => {
    if (!filename) {
      return "https://via.placeholder.com/400x200.png?text=Tidak+Ada+Gambar";
    }
    // GANTI '/images/' MENJADI '/uploads/' sesuai server.js kamu
    return `http://localhost:5000/uploads/${filename}`; 
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg w-[360px] text-center relative overflow-hidden">
        
        {/* Header Gambar */}
        <div className="h-40 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={getImageUrl(quiz?.gambar)} 
            alt={quiz?.title || "Gambar Kuis"}
            className="w-full h-full object-cover"
            onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x200.png?text=Error+Image"; 
            }}
          />
        </div>

        {/* Konten Detail (Bagian bawah sama seperti sebelumnya) */}
        <div className="p-6">
          <Dialog.Title className="text-lg font-bold text-orange-500 underline underline-offset-4 mb-6">
            Detail Kuis
          </Dialog.Title>

          <div className="text-left space-y-4">
            <div>
              <p className="font-semibold text-sm">Judul Kuis & Game</p>
              <p className="text-gray-500 text-sm font-medium">{quiz?.title || "-"}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Deskripsi</p>
              <p className="text-gray-400 text-sm">{quiz?.description || "-"}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Platform</p>
              <p className="text-gray-400 text-sm capitalize">{quiz?.platform || "-"}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Link Kuis</p>
              {quiz?.link ? (
                <a
                  href={quiz.link.startsWith("http") ? quiz.link : `https://${quiz.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline break-all"
                >
                  {quiz.link}
                </a>
              ) : (
                <p className="text-gray-400 text-sm">-</p>
              )}
            </div>

            <div>
              <p className="font-semibold text-sm">Kategori Mata Pelajaran</p>
              <p className="text-gray-400 text-sm">{quiz?.nama_kategori || "-"}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Kategori Kelas</p>
              <p className="text-gray-400 text-sm">{quiz?.nama_kelas || "-"}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={onClose}
              className="px-6 py-1.5 border border-orange-400 rounded-full text-orange-500 text-sm hover:bg-orange-50 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DetailKuis;