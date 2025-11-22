import React, { useState } from "react";
import DetailDonasiModal from "./DetailDonasiModal"; // ⬅ WAJIB ADA

const DonasiCard = ({ data }) => {
  const [open, setOpen] = useState(false);

  // Tentukan warna badge status
  const statusColor = {
    "Sedang Berjalan": "bg-green-100 text-green-700",
    "Akan Datang": "bg-blue-100 text-blue-700",
    Selesai: "bg-gray-200 text-gray-600",
  }[data.status] || "bg-gray-100 text-gray-600";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all w-[300px] h-[500px] flex flex-col">
      
      <img
        src={data.image}
        alt={data.title}
        className="h-[220px] w-full object-cover"
      />

      <div className="flex-1 flex flex-col justify-between p-5">
        <div>
          <div className="flex justify-between items-center mb-3">
            <div></div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}
            >
              {data.status}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
            {data.title}
          </h3>

          <div className="flex items-start gap-2 mb-2">
            <svg
              className="w-5 h-5 shrink-0"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.3571 13.4763C11.732 12.8512 10.8841 12.5 10.0001 12.5H5.00008C4.11603 12.5 3.26818 12.8512 2.64306 13.4763C2.01794 14.1014 1.66675 14.9493 1.66675 15.8333V17.5"
                stroke="#FF9500"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.50008 9.16667C9.34103 9.16667 10.8334 7.67428 10.8334 5.83333C10.8334 3.99238 9.34103 2.5 7.50008 2.5C5.65913 2.5 4.16675 3.99238 4.16675 5.83333C4.16675 7.67428 5.65913 9.16667 7.50008 9.16667Z"
                stroke="#FF9500"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3333 17.5001V15.8334C18.3327 15.0948 18.0869 14.3774 17.6344 13.7937C17.1819 13.2099 16.5484 12.793 15.8333 12.6084"
                stroke="#FF9500"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3333 2.6084C14.0503 2.79198 14.6858 3.20898 15.1396 3.79366C15.5935 4.37833 15.8398 5.09742 15.8398 5.83757C15.8398 6.57771 15.5935 7.2968 15.1396 7.88147C14.6858 8.46615 14.0503 8.88315 13.3333 9.06673"
                stroke="#FF9500"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-gray-500 text-sm leading-tight">
              {data.location}
            </span>
          </div>


          <p className="text-sm text-gray-600 line-clamp-3">
            {data.description}
          </p>
        </div>

        <div className="mt-4">
          <div className="inline-block rounded-full p-[1.5px] bg-linear-to-r from-[#317C76] to-[#FF9500]">
            <span className="text-xs font-medium text-gray-700 px-3 py-1 bg-white rounded-full block">
              {data.category}
            </span>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="flex-1 border border-gray-300 text-gray-700 font-medium text-sm py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Lihat Detail
          </button>

          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#FF9500] text-white font-medium text-sm py-2 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
          >
            Donasi Sekarang
          </a>

        </div>
      </div>

      {/* Modal */}
      {open && (
        <DetailDonasiModal
          onClose={() => setOpen(false)}
          data={data}
        />
      )}
    </div>
  );
};

export default DonasiCard;
