import React from "react";

export default function ProgramCard({ program, onDetail }) {
  const statusStyles = {
    "Akan Datang": "text-[#1E40AF] bg-[#DBEAFE]",
    "Sedang Dibuka": "text-[#15803D] bg-[#DCFCE7]",
    Selesai: "text-[#7E22CE] bg-[#F3E8FF]",
  };

  // Icon khusus untuk tiap kategori
  const getKategoriIcon = (kategori) => {
    switch (kategori) {
      case "Volunteer":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.3333 17.5001V15.8334C18.3327 15.0948 18.0869 14.3774 17.6344 13.7937C17.1819 13.2099 16.5484 12.793 15.8333 12.6084" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.3333 2.6084C14.0503 2.79198 14.6858 3.20898 15.1396 3.79366C15.5935 4.37833 15.8398 5.09742 15.8398 5.83757C15.8398 6.57771 15.5935 7.2968 15.1396 7.88147C14.6858 8.46615 14.0503 8.88315 13.3333 9.06673" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        );

      case "Pengabdian Masyarakat":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 5.83301V17.4997" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.49996 15C2.27895 15 2.06698 14.9122 1.9107 14.7559C1.75442 14.5996 1.66663 14.3877 1.66663 14.1667V3.33333C1.66663 3.11232 1.75442 2.90036 1.9107 2.74408C2.06698 2.5878 2.27895 2.5 2.49996 2.5H6.66663C7.55068 2.5 8.39853 2.85119 9.02365 3.47631C9.64877 4.10143 9.99996 4.94928 9.99996 5.83333C9.99996 4.94928 10.3511 4.10143 10.9763 3.47631C11.6014 2.85119 12.4492 2.5 13.3333 2.5H17.5C17.721 2.5 17.9329 2.5878 18.0892 2.74408C18.2455 2.90036 18.3333 3.11232 18.3333 3.33333V14.1667C18.3333 14.3877 18.2455 14.5996 18.0892 14.7559C17.9329 14.9122 17.721 15 17.5 15H12.5C11.8369 15 11.201 15.2634 10.7322 15.7322C10.2634 16.2011 9.99996 16.837 9.99996 17.5C9.99996 16.837 9.73657 16.2011 9.26773 15.7322C8.79889 15.2634 8.163 15 7.49996 15H2.49996Z" stroke="#FF9500" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        );

      case "Beasiswa":
        return (
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path
              d="M3 7l9-4 9 4-9 4-9-4z"
              stroke="#FF9500"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M6 10v4c0 3 6 3 6 3s6 0 6-3v-4"
              stroke="#FF9500"
              strokeWidth="1.6"
            />
          </svg>
        );

      default:
        return (
          <svg width="22" height="22" fill="none" viewBox="0 0 20 20">
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16z"
              stroke="#FF9500"
              strokeWidth="1.6"
            />
          </svg>
        );
    }
  };

  return (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden flex flex-col h-full">
    {/* Gambar */}
    <img
      src={program.image}
      alt={program.judul}
      className="w-full h-44 object-cover"
    />

    <div className="flex flex-col grow p-5">

      {/* Kategori & Status (rapat, tidak ada tinggi berlebih) */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-h-5">
          <div className="w-5 h-5 shrink-0">
            {getKategoriIcon(program.kategori)}
          </div>

          <span className="text-[#FF9500] text-sm font-semibold leading-tight line-clamp-2">
            {program.kategori}
          </span>
        </div>

        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusStyles[program.status]}`}
        >
          {program.status}
        </span>
      </div>

      {/* Judul (2 baris maksimal) */}
      <h3 className="text-base font-semibold leading-snug line-clamp-2 mb-1">
        {program.judul}
      </h3>

      {/* Penyelenggara (1 baris) */}
      <p className="text-sm text-gray-800 line-clamp-1 mb-2">
        {program.penyelenggara}
      </p>

      {/* Deskripsi (3 baris) */}
      <p className="text-sm text-gray-500 line-clamp-3">
        {program.deskripsi}
      </p>

      {/* Spacer fleksibel biar tombol tetap di bawah */}
      <div className="grow"></div>

      {/* Periode & Deadline */}
      <div className="mt-3 text-sm space-y-1">
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
        <button
          onClick={onDetail}
          className="w-[118px] h-10 border border-[#317B74] text-[#317B74] hover:bg-[#317B74] hover:text-white rounded-lg text-sm font-medium"
        >
          Lihat Detail
        </button>

        <a
          href={program.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[174px] h-10 flex items-center justify-center bg-[#FF9D01] hover:bg-[#e88a00] text-white rounded-lg text-sm font-medium"
        >
          Kunjungi Sumber
        </a>
      </div>

    </div>
  </div>
);

}
