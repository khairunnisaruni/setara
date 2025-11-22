import React from "react";
import { X } from "lucide-react";

export default function ModalDetailProgram({ program, onClose }) {
  if (!program) return null;

const getKategoriIcon = (kategori) => {
  switch (kategori) {
    case "Volunteer":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5"
            stroke="#FF9500" strokeWidth="1.666" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z"
            stroke="#FF9500" strokeWidth="1.666" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.3333 17.5001V15.8334C18.3327 15.0948 18.0869 14.3774 17.6344 13.7937C17.1819 13.2099 16.5484 12.793 15.8333 12.6084"
            stroke="#FF9500" strokeWidth="1.666" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.3333 2.6084C14.0503 2.79198 14.6858 3.20898 15.1396 3.79366C15.5935 4.37833 15.8398 5.09742 15.8398 5.83757C15.8398 6.57771 15.5935 7.2968 15.1396 7.88147C14.6858 8.46615 14.0503 8.88315 13.3333 9.06673"
            stroke="#FF9500" strokeWidth="1.666" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case "Pengabdian Masyarakat":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 5.83301V17.4997" stroke="#FF9500" strokeWidth="1.666" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.49996 15C2.27895 15 2.06698 14.9122 1.9107 14.7559C1.75442 14.5996 1.66663 14.3877 1.66663 14.1667V3.33333C1.66663 3.11232 1.75442 2.90036 1.9107 2.74408C2.06698 2.5878 2.27895 2.5 2.49996 2.5H6.66663C7.55068 2.5 8.39853 2.85119 9.02365 3.47631C9.64877 4.10143 9.99996 4.94928 9.99996 5.83333C9.99996 4.94928 10.3511 4.10143 10.9763 3.47631C11.6014 2.85119 12.4492 2.5 13.3333 2.5H17.5C17.721 2.5 17.9329 2.5878 18.0892 2.74408C18.2455 2.90036 18.3333 3.11232 18.3333 3.33333V14.1667C18.3333 14.3877 18.2455 14.5996 18.0892 14.7559C17.9329 14.9122 17.721 15 17.5 15H12.5C11.8369 15 11.201 15.2634 10.7322 15.7322C10.2634 16.2011 9.99996 16.837 9.99996 17.5C9.99996 16.837 9.73657 16.2011 9.26773 15.7322C8.79889 15.2634 8.163 15 7.49996 15H2.49996Z"
            stroke="#FF9500" strokeWidth="1.666" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case "Beasiswa":
      return (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="#FF9500" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M6 10v4c0 3 6 3 6 3s6 0 6-3v-4" stroke="#FF9500" strokeWidth="1.6"/>
        </svg>
      );

    default:
      return (
        <svg width="22" height="22" fill="none" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" stroke="#FF9500" strokeWidth="1.6"/>
        </svg>
      );
  }
};


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9999 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-xl relative">

        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* Header Gambar */}
        <img
          src={program.image}
          alt={program.judul}
          className="w-full h-64 object-cover rounded-t-2xl"
        />

        {/* Konten */}
        <div className="p-7 space-y-6">

          {/* Judul + Status */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              {program.judul}
            </h2>

            <span
              className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                program.status === "Akan Datang"
                  ? "bg-[#DBEAFE] text-[#1E40AF]"
                  : program.status === "Sedang Dibuka"
                  ? "bg-[#DCFCE7] text-[#15803D]"
                  : "bg-[#F3E8FF] text-[#7E22CE]"
              }`}
            >
              {program.status}
            </span>
          </div>

          {/* Jenis Program */}
            <div>
            <p className="text-sm text-gray-500">Jenis Program</p>

            <div className="flex items-center gap-2 text-[#FF9500] font-semibold text-base mt-1">
                {getKategoriIcon(program.kategori)}
                <span>{program.kategori}</span>
            </div>
            </div>


          {/* Penyelenggara */}
          <div>
            <p className="text-sm text-gray-500">Penyelenggara Program</p>
            <p className="text-gray-700 font-medium">{program.penyelenggara}</p>
          </div>

          {/* Periode Program */}
          <div>
            <p className="text-sm text-gray-500">Periode Program</p>
            <p className="text-gray-700 font-medium">{program.periode}</p>
          </div>

          {/* Lokasi Program */}
          <div>
            <p className="text-sm text-gray-500">Lokasi Program</p>
            <div className="flex items-center gap-2 text-gray-700 font-medium mt-1">
              {/* Icon Lokasi */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C7.6 2 4 5.6 4 10C4 15.4 11 21.5 11.3 21.8C11.5 21.9 11.8 22 12 22C12.2 22 12.5 21.9 12.7 21.8C13 21.5 20 15.4 20 10C20 5.6 16.4 2 12 2ZM12 19.7C9.9 17.7 6 13.4 6 10C6 6.7 8.7 4 12 4C15.3 4 18 6.7 18 10C18 13.3 14.1 17.7 12 19.7ZM12 6C9.8 6 8 7.8 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 7.8 14.2 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z" fill="black"/>
              </svg>

              <span>{program.lokasi || "Tidak ada informasi lokasi"}</span>
            </div>
          </div>

          {/* Deskripsi Program */}
          <div>
            <p className="text-sm text-gray-500">Deskripsi Program</p>
            <p className="text-gray-700 leading-relaxed">
              {program.deskripsi_full || program.deskripsi}
            </p>
          </div>

          {/* Deadline */}
          <div>
            <span className="bg-[#317C76] text-[#FBF8F4] px-4 py-1.5 rounded-full text-sm font-medium">
              Deadline Pendaftaran • {program.deadline}
            </span>
          </div>

          {/* Tombol Sumber */}
          <a
            href={program.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#FF9D01] hover:bg-[#e88a00] text-white text-center font-semibold py-3 rounded-xl"
          >
            Kunjungi Sumber
          </a>
        </div>
      </div>
    </div>
  );
}
