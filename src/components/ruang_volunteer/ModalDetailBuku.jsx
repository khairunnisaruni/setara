import React from "react";
import { HiX, HiOutlineExternalLink } from "react-icons/hi";

export default function ModalDetailBuku({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-[550px] max-h-[90vh] rounded-2xl shadow-xl p-6 relative animate-fadeIn overflow-y-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <HiX size={24} />
        </button>

        {/* COVER */}
        <div className="flex justify-center mb-6">
          {data.cover ? (
            <img
              src={data.cover}
              alt="cover"
              className="w-[140px] h-[190px] object-cover rounded-xl shadow"
            />
          ) : (
            <div className="w-[140px] h-[190px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
              No Cover
            </div>
          )}
        </div>

        {/* JUDUL */}
        <h2 className="text-2xl font-bold text-center">{data.title}</h2>

        {/* PENULIS */}
        <p className="text-center text-gray-600 mt-1 text-sm">
          Penulis:{" "}
          <span className="font-medium">
            {data.penulis || "Tidak diketahui"}
          </span>
        </p>

        {/* KATEGORI */}
        <div className="text-center mt-3">
          <span className="inline-block px-4 py-1 bg-[#FFF7E8] border border-[#FE9015] text-[#FE9015] rounded-full text-sm">
            {data.category}
          </span>
        </div>

        {/* DESKRIPSI */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Deskripsi</h3>
          <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
            {data.desc}
          </p>
        </div>

        {/* LINK PEMBELIAN */}
        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full py-3 bg-[#FE9015] hover:bg-[#e57f0f] text-white rounded-full flex items-center justify-center gap-2 transition"
          >
            Beli Buku <HiOutlineExternalLink size={18} />
          </a>
        )}
      </div>
    </div>
  );
}
