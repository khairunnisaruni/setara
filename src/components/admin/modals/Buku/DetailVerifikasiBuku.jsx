// src/components/admin/modals/Buku/DetailVerifikasiBuku.jsx
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const DetailVerifikasiBuku = ({ isOpen, onClose, book, onApprove, onReject }) => {
  
  // 1. Helper untuk URL Gambar (Agar gambar dari backend muncul)
  const getImageUrl = (filename) => {
    if (!filename) return "https://via.placeholder.com/150x200.png?text=No+Cover";
    return `http://localhost:5000/uploads/${filename}`;
  };

  // 2. Handler Wrapper (Tutup modal dulu, baru panggil fungsi parent)
  const handleApproveClick = () => {
    onClose();   // Tutup modal detail ini
    onApprove(); // Panggil fungsi API di parent
  };

  const handleRejectClick = () => {
    onClose();   // Tutup modal detail ini
    onReject();  // Panggil fungsi API di parent
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg w-[360px] text-center relative overflow-hidden animate-fade-in">
        
        {/* Header Gambar */}
        <div className="h-44 w-full bg-gray-100 flex items-center justify-center py-4">
           {/* Container gambar */}
           <div className="w-28 h-36 shadow-md rounded-md overflow-hidden bg-white">
              <img
                src={getImageUrl(book?.gambar)} // ✅ Gambar sekarang akan muncul
                alt={book?.title || "Cover Buku"}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/150x200.png?text=Error"; }}
              />
           </div>
        </div>

        {/* Tombol Close X */}
        <button onClick={onClose} className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full p-1 text-gray-500 hover:text-gray-700 transition">
          <X size={18} />
        </button>

        {/* Konten */}
        <div className="p-6 pt-2">
          <Dialog.Title className="text-lg font-bold text-orange-500 underline underline-offset-4 mb-4">
            Verifikasi Buku
          </Dialog.Title>

          <div className="text-left space-y-3 text-sm">
            <div>
              <p className="font-semibold">Judul Buku</p>
              <p className="text-gray-500">{book?.title || "-"}</p>
            </div>
            <div>
              <p className="font-semibold">Penulis</p>
              <p className="text-gray-500">{book?.penulis || book?.author || "-"}</p>
            </div>
            <div>
              <p className="font-semibold">Kategori</p>
              <p className="text-gray-500">{book?.kategori || "-"}</p>
            </div>
            <div>
               <p className="font-semibold">Deskripsi</p>
               <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed">{book?.description || "-"}</p>
            </div>
            <div>
              <p className="font-semibold">Disubmit Oleh</p>
              <p className="text-gray-500">{book?.submitter || "Admin"}</p>
            </div>
            <div>
              <p className="font-semibold">Tautan</p>
              {book?.tautan ? (
                <a href={book.tautan} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate block">
                  {book.tautan}
                </a>
              ) : <span className="text-gray-400">-</span>}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleApproveClick} // ✅ Pakai wrapper agar modal tertutup dulu
              className="px-6 py-1.5 rounded-full bg-green-500 text-white text-sm hover:bg-green-600 transition"
            >
              Terima
            </button>
            <button
              onClick={handleRejectClick} // ✅ Pakai wrapper agar modal tertutup dulu
              className="px-6 py-1.5 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition"
            >
              Tolak
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DetailVerifikasiBuku;