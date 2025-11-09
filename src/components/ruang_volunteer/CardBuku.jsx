import React from "react";

export default function CardBuku({ title, category, desc, cover, onDetail }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
      <div className="flex justify-between items-start gap-4">
        {/* LEFT */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{title}</h3>

          <div className="mt-2 inline-block px-3 py-1 border border-[#FE9015] text-[#FE9015] rounded-full text-sm">
            {category}
          </div>

          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{desc}</p>
        </div>

        {/* RIGHT THUMBNAIL */}
        {cover ? (
          <img
            src={cover}
            className="w-[85px] h-[110px] rounded-xl object-cover"
            alt="cover"
          />
        ) : (
          <div className="w-[85px] h-[110px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-xs">
            No Cover
          </div>
        )}
      </div>

      <button
        onClick={onDetail}
        className="w-full mt-6 py-2 border border-black rounded-full text-sm font-medium hover:bg-gray-50 transition"
      >
        Lihat Selengkapnya
      </button>
    </div>
  );
}
