import React from "react";

export default function ProgramCard({ program }) {
  const statusStyles = {
    "Akan Datang": "text-[#1E40AF] bg-[#DBEAFE]",
    "Sedang Dibuka": "text-[#15803D] bg-[#DCFCE7]",
    Selesai: "text-[#7E22CE] bg-[#F3E8FF]",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden flex flex-col h-full">
      {/* Gambar */}
      <img
        src={program.image}
        alt={program.judul}
        className="w-full h-44 object-cover"
      />

      {/* Isi Card */}
      <div className="flex flex-col grow p-5">
        {/* Kategori dan Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#FF9500]">
            <div className="w-5 h-5 shrink-0">
              {/* nanti masukkan SVG icon 20x20 di sini */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.3333 17.5001V15.8334C18.3327 15.0948 18.0869 14.3774 17.6344 13.7937C17.1819 13.2099 16.5484 12.793 15.8333 12.6084" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.3333 2.6084C14.0503 2.79198 14.6858 3.20898 15.1396 3.79366C15.5935 4.37833 15.8398 5.09742 15.8398 5.83757C15.8398 6.57771 15.5935 7.2968 15.1396 7.88147C14.6858 8.46615 14.0503 8.88315 13.3333 9.06673" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </div>
            <span>{program.kategori}</span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusStyles[program.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {program.status}
          </span>
        </div>

        {/* Judul dan Penyelenggara */}
        <h3 className="text-base font-semibold leading-tight mb-1">
          {program.judul}
        </h3>
        <p className="text-sm text-gray-800 mb-2">{program.penyelenggara}</p>

        {/* Deskripsi (dibatasi 3 baris agar card seragam tinggi) */}
        <p className="text-sm text-gray-500 line-clamp-3">
          {program.deskripsi}
        </p>

        {/* Info Periode dan Deadline */}
        <div className="mt-4 text-sm space-y-1">
          <p className="font-medium text-[#317B74]">
            Periode: {program.periode}
          </p>
          <p>
            <span className="bg-[#FFE5FE] text-[#8A38F5] px-3 py-0.5 rounded-full text-xs font-medium">
              Deadline: {program.deadline}
            </span>
          </p>
        </div>

        {/* Tombol */}
        <div className="flex gap-2 mt-4">
          <button className="w-[118px] h-10 border border-[#317B74] text-[#317B74] hover:bg-[#317B74] hover:text-white rounded-lg text-sm font-medium">
            Lihat Detail
          </button>
          <a
            href={program.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[174px] h-10 flex items-center justify-center bg-[#FF9D01] hover:bg-[#e88a00] text-white rounded-lg text-sm font-medium gap-1"
          >
            Kunjungi Sumber
            {/* SVG icon di sini (16x16) */}
          </a>
        </div>
      </div>
    </div>
  );
}
