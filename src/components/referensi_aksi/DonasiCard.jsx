import React from "react";

const DonasiCard = ({ data }) => {
  // Tentukan warna badge status
  const statusColor = {
    "Sedang Berjalan": "bg-green-100 text-green-700",
    "Akan Datang": "bg-blue-100 text-blue-700",
    Selesai: "bg-gray-200 text-gray-600",
  }[data.status] || "bg-gray-100 text-gray-600";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all w-[300px] h-[500px] flex flex-col">
      {/* Gambar */}
      <img
        src={data.image}
        alt={data.title}
        className="h-[220px] w-full object-cover"
      />

      {/* Konten */}
      <div className="flex-1 flex flex-col justify-between p-5">
        <div>
          {/* Status */}
          <div className="flex justify-between items-center mb-3">
            <div></div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}
            >
              {data.status}
            </span>
          </div>

          {/* Judul */}
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
            {data.title}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            {/* tempat ikon lokasi */}
            <span className="text-gray-500 text-sm">{data.location}</span>
          </div>

          {/* Deskripsi */}
          <p className="text-sm text-gray-600 line-clamp-3">{data.description}</p>
        </div>

        {/* Kategori */}
        <div className="mt-4">
            <div className="inline-block rounded-full p-[1.5px] bg-linear-to-r from-[#317C76] to-[#FF9500]">
                <span className="text-xs font-medium text-gray-700 px-3 py-1 bg-white rounded-full block">
                {data.category}
                </span>
            </div>
        </div>


        {/* Tombol */}
        <div className="mt-5 flex gap-2">
            <button className="flex-1 border border-gray-300 text-gray-700 font-medium text-sm py-2 rounded-lg hover:bg-gray-100 transition">
                Lihat Detail
            </button>
            <button className="flex-1 bg-orange-500 text-white font-medium text-sm py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2">
                {/* Tempat icon SVG Donasi */}
                <span>Donasi Sekarang</span>
            </button>
        </div>

      </div>
    </div>
  );
};

export default DonasiCard;
