import React from "react";
import { HiX, HiHeart, HiOutlineHeart } from "react-icons/hi";

export default function ModalDetailCerita({
  isOpen,
  onClose,
  data,
  isLiked,
  onToggleLike,
}) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white w-full max-w-[600px] max-h-[90vh] rounded-2xl shadow-xl p-6 flex flex-col relative animate-fadeIn">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <HiX size={24} />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-200 rounded-full"></div>

          <div>
            <h3 className="font-semibold text-lg">{data.name}</h3>
            <p className="text-sm text-gray-500">{data.date}</p>
          </div>
        </div>

        {/* CONTENT */}
        <div
          className="mt-4 overflow-y-auto pr-2"
          style={{ maxHeight: "55vh" }}
        >
          <h2 className="text-2xl font-bold text-[#3B3B3B]">{data.title}</h2>

          <p className="text-gray-700 text-sm leading-relaxed mt-3 whitespace-pre-line">
            {data.fullContent || data.content}
          </p>
        </div>

        {/* LIKE BUTTON */}
        <button
          onClick={onToggleLike}
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-[#FE9015] hover:bg-[#e57f0f] text-white rounded-full self-end"
        >
          {isLiked ? (
            <>
              <HiHeart size={18} className="text-red-300" />
              Disukai
            </>
          ) : (
            <>
              <HiOutlineHeart size={18} />
              Suka
            </>
          )}
        </button>
      </div>
    </div>
  );
}
