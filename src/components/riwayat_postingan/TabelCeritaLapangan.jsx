import React, { useState } from "react";
import { HiFilter, HiLink, HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";

const TabelCeritaLapangan = () => {
  const [selectedCeritaLapangan, setSelectedCeritaLapangan] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [searchText, setSearchText] = useState(""); // search

  const truncateWords = (text, limit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  const data = [
    {
      no: 1,
      judul: "Pengalaman Saya",
      deskripsi: "Perjalanan 3 jam dengan motor trail membawa saya ke sebuah desa kecil di pegunungan ",
      tanggal: "16-09-2005",
      status: "Disetujui",
    },
    {
      no: 2,
      judul: "Pengalaman ",
      deskripsi: "Perjalanan 3 jam dengan motor trail membawa saya ke sebuah desa kecil di pegunungan",
      tanggal: "16-09-2005",
      status: "Menunggu",
    },
    {
      no: 3,
      judul: "Saya",
      deskripsi: "Perjalanan 3 jam dengan motor trail membawa saya ke sebuah desa kecil di pegunungan",
      tanggal: "16-09-2005",
      status: "Ditolak",
    },
  ];

    //  FILTER STATUS + SEARCH
    const filteredData = data.filter((item) => {
      // Filter status
      const matchStatus =
      filterStatus === "Semua" || item.status === filterStatus;

      // Filter search (case-insensitive)
      const text = searchText.toLowerCase();
      const matchSearch =
      item.judul.toLowerCase().includes(text);

      return matchStatus && matchSearch;
    });

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        {/* Live Search */}
        <input
          type="search"
          placeholder="Cari Cerita Lapangan..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FF9500] placeholder-[#6B7280]"
        />

        {/* Dropdown Filter */}
        <select
          className="border border-gray-300 rounded-xl px-3 py-2 text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="Semua">Semua Status</option>
          <option value="Disetujui">Disetujui</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Ditolak">Ditolak</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 rounded-xl">
          <thead className="bg-[#F8F4EA] text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left w-[60px]">No</th>
              <th className="px-4 py-2 text-left min-w-[180px]">Judul Cerita</th>
              <th className="px-4 py-2 text-left min-w-[200px]">Deskripsi Cerita</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Tanggal Submit</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{item.no}</td>
                <td className="px-4 py-2">{item.judul}</td>
                <td className="px-4 py-2">{truncateWords (item.deskripsi, 15)}</td>
                <td className="px-4 py-2">{item.tanggal}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}

            {/* Jika search/filter tidak ada hasil */}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  Tidak ada data yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {selectedCeritaLapangan && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[420px] max-h-[90vh] overflow-y-auto relative">
            <button
              className="cursor-pointer absolute top-1 right-0.5 text-black hover:text-gray-700 text-4xl font-bold"
              onClick={() => setSelectedCeritaLapangan(null)}
            >
              ×
            </button>

            <div className="w-full h-48 ">
              <img
                src={selectedCeritaLapangan.gambar}
                alt=""
                className="h-full w-full rounded-xl"
              />
            </div>

            <h2 className="text-center text-lg font-semibold text-[#FF9500] underline">
              Detail CeritaLapangan
            </h2>

            <div className="p-6 space-y-4 text-sm text-black">
              <div>
                <p className="font-semibold">Judul CeritaLapangan & Game</p>
                <p className="text-[#B0AA9C]">{selectedCeritaLapangan.judul}</p>
              </div>

              <div>
                <p className="font-semibold">Deskripsi</p>
                <p className="text-[#B0AA9C]">{selectedCeritaLapangan.deskripsi}</p>
              </div>

              <div>
                <p className="font-semibold">Platform</p>
                <p className="text-[#B0AA9C]">{selectedCeritaLapangan.platform}</p>
              </div>

              <div>
                <p className="font-semibold">Link</p>
                <a
                  href={selectedCeritaLapangan.tautan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF9500] underline"
                >
                  {selectedCeritaLapangan.tautan}
                </a>
              </div>

              <div>
                <p className="font-semibold">Kategori Mata Pelajaran</p>
                <p className="text-[#B0AA9C]">{selectedCeritaLapangan.mapel}</p>
              </div>

              <div>
                <p className="font-semibold">Kategori Kelas</p>
                <p className="text-[#B0AA9C]">{selectedCeritaLapangan.kelas}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelCeritaLapangan;
