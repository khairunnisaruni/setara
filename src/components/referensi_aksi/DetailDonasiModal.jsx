import React from "react";
import { X } from "lucide-react";

export default function DetailDonasiModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9999 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-xl relative">

        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* Gambar Header */}
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-72 object-cover rounded-t-2xl"
        />

        {/* Konten */}
        <div className="p-7 space-y-6">

          {/* Judul */}
          <h2 className="text-2xl font-semibold text-gray-900">
            {data.title}
          </h2>

          {/* Penerima Manfaat */}
          <div>
            <p className="text-sm text-gray-500">Penerima Manfaat</p>
            <div className="flex items-center gap-2 mt-1 text-gray-700 font-medium">
              {/* Icon Lokasi */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.3333 17.5001V15.8334C18.3327 15.0948 18.0869 14.3774 17.6344 13.7937C17.1819 13.2099 16.5484 12.793 15.8333 12.6084" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.3333 2.6084C14.0503 2.79198 14.6858 3.20898 15.1396 3.79366C15.5935 4.37833 15.8398 5.09742 15.8398 5.83757C15.8398 6.57771 15.5935 7.2968 15.1396 7.88147C14.6858 8.46615 14.0503 8.88315 13.3333 9.06673" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{data.location}</span>
            </div>
          </div>

          {/* Jenis Bantuan */}
          <div>
            <p className="text-sm text-gray-500">Jenis Bantuan Dibutuhkan</p>
            <span className="inline-block bg-[#317C76] text-[#FBF8F4] font-medium text-sm px-3 py-1 rounded-full mt-1">
              {data.category}
            </span>
          </div>

          {/* Deskripsi Kebutuhan */}
          <div>
            <p className="text-sm text-gray-500">Deskripsi Kebutuhan</p>
            <p className="text-gray-700 leading-relaxed mt-1 whitespace-pre-line">
              {data.deskripsi_full || data.description}
            </p>
          </div>

          {/* Dampak Donasi */}
          <div>
            <p className="text-sm text-gray-500">Dampak Donasi</p>
            <p className="text-gray-700 leading-relaxed mt-1 whitespace-pre-line">
              {data.dampak || "Belum ada informasi dampak."}
            </p>
          </div>

          {/* Penanggung Jawab Donasi */}
          <div>
            <p className="text-sm text-gray-500">Penanggung Jawab Donasi</p>
            <p className="text-gray-700 font-medium mt-1">
              {data.penanggung_jawab || "Belum ada informasi penanggung jawab."}
            </p>
          </div>

          {/* Contact Person */}
          <div>
            <p className="text-sm text-gray-500">Contact Person</p>
            <div className="flex items-center gap-2 mt-1 text-gray-700 font-medium">
              {/* Icon Telepon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.7 14.89 16.1 14.78 16.47 14.88C17.66 15.2 18.93 15.37 20.25 15.37C20.66 15.37 21 15.71 21 16.12V20.25C21 20.66 20.66 21 20.25 21C10.86 21 3 13.14 3 3.75C3 3.34 3.34 3 3.75 3H7.88C8.29 3 8.63 3.34 8.63 3.75C8.63 5.07 8.8 6.34 9.12 7.53C9.22 7.9 9.11 8.3 8.82 8.59L6.62 10.79Z"
                  fill="black"
                />
              </svg>
              <span>{data.contact || "Belum ada informasi kontak."}</span>
            </div>
          </div>

          {/* Tombol Donasi */}
          <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FF9D01] hover:bg-[#e88a00] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                Donasi Sekarang
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                    d="M5 12H19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    />
                    <path
                    d="M12 5L19 12L12 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    />
                </svg>
            </a>

        </div>
      </div>
    </div>
  );
}
