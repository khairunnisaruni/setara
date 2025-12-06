import { Dialog } from "@headlessui/react";

const DetailBuku = ({ isOpen, onClose, book }) => {
  console.log("Data Buku:", book);
  
  // 1. Helper untuk membuat URL Gambar lengkap
  const getImageUrl = (filename) => {
    if (!filename) {
      // Gambar default jika buku tidak punya cover
      return "https://via.placeholder.com/150x200.png?text=No+Cover";
    }
    // Gabungkan dengan URL Backend (pastikan port 5000 dan folder /uploads/)
    return `http://localhost:5000/uploads/${filename}`;
  };

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
          
          {/* 2. GANTI DIV KOSONG DENGAN IMG */}
          <div className="w-32 h-44 bg-gray-100 rounded-md mb-4 overflow-hidden border border-gray-200 shadow-sm">
            <img 
              src={getImageUrl(book?.gambar)} // Pastikan nama kolom di database adalah 'gambar'
              alt={book?.title || "Cover Buku"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150x200.png?text=Error";
              }}
            />
          </div>

          {/* Detail Buku */}
          <div className="text-left w-full space-y-3">
            <div>
              <p className="font-semibold text-sm">Judul Buku</p>
              <p className="text-gray-500 text-sm font-medium">{book?.title || "-"}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Penulis Buku</p>
              <p className="text-gray-400 text-sm">{book?.penulis || "-"}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Kategori Buku</p>
              {/* Jika backend pakai JOIN, mungkin namanya 'nama_kategori'. Sesuaikan disini */}
              <p className="text-gray-400 text-sm">{book?.kategori || book?.nama_kategori || "-"}</p>
            </div>

            <div>
              <p className="font-semibold text-sm">Deskripsi</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {book?.description || "-"}
              </p>
            </div>

            <div>
              <p className="font-semibold text-sm">Tautan Buku</p>
              {book?.tautan ? (
                <a
                  // Cek apakah link sudah ada http/https, jika belum tambahkan
                  href={book.tautan.startsWith('http') ? book.tautan : `https://${book.tautan}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline break-all"
                >
                  {book.tautan}
                </a>
              ) : (
                <p className="text-gray-400 text-sm">-</p>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Batal */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="px-6 py-1.5 border border-orange-400 rounded-full text-orange-500 text-sm hover:bg-orange-50 transition"
          >
            Tutup
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DetailBuku;