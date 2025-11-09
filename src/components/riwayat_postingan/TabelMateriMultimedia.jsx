import React, { useState } from "react";
import { HiFilter, HiLink, HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";

const TabelMateriMultimedia = () => {
  const [selectedMateri, setSelectedMateri] = useState(null);
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
      judul: "Aritmatika Dasar",
      jenisfile: "PDF",
      kategori: "SD 1-3",
      jeniskategori: "Matematika",
      deskripsi: "Materi ini berisikan Aritmatika Dasar",
      tanggal: "16-09-2005",
      status: "Disetujui",
      file: "lalala.pdf",
    },
    {
      no: 2,
      judul: "Inggris Dasar",
      jenisfile: "PDF",
      kategori: "SD 1-3",
      jeniskategori: "Matematika",
      deskripsi: "Materi ini berisikan Inggris Dasar",
      tanggal: "16-09-2005",
      status: "Menunggu",
      file: "lalala.pdf",
    },
    {
      no: 3,
      judul: "IPS Dasar",
      jenisfile: "PDF",
      kategori: "SD 1-3",
      jeniskategori: "Matematika",
      deskripsi: "Materi ini berisikan IPS Dasar",
      tanggal: "16-09-2005",
      status: "Ditolak",
      file: "lalala.pdf",
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
        item.judul.toLowerCase().includes(text) ||
        item.kategori.toLowerCase().includes(text) ||
        item.jeniskategori.toLowerCase().includes(text);

        return matchStatus && matchSearch;
    });

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        {/* Live Search */}
        <input
          type="search"
          placeholder="Cari Materi..."
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
              <th className="px-4 py-2 text-left min-w-[180px]">Judul Materi</th>
              <th className="px-4 py-2 text-left min-w-[100px]">Jenis File</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Kategori Pelajar</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Jenis Kategori</th>
              <th className="px-4 py-2 text-left min-w-[200px]">Deskripsi</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Tanggal Submit</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Detail</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{item.no}</td>
                <td className="px-4 py-2">{item.judul}</td>
                <td className="px-4 py-2">{item.jenisfile}</td>
                <td className="px-4 py-2">{item.kategori}</td>
                <td className="px-4 py-2">{item.jeniskategori}</td>
                <td className="px-4 py-2">{truncateWords (item.deskripsi, 15)}</td>
                <td className="px-4 py-2">{item.tanggal}</td>

                <td className="px-4 py-2">
                  <StatusBadge status={item.status} />
                </td>

                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => setSelectedMateri(item)}
                    className="text-[#FF9500] hover:text-[#e68a00] cursor-pointer"
                  >
                    <HiEye className="w-5 h-5 inline" />
                  </button>
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
      {selectedMateri && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[420px] max-h-[90vh] overflow-y-auto relative">
            <button
              className="cursor-pointer absolute right-1.5 text-black hover:text-gray-700 text-4xl font-bold"
              onClick={() => setSelectedMateri(null)}
            >
              ×
            </button>

            <h2 className="text-center text-lg font-semibold text-[#FF9500] underline py-2">
              Detail Materi
            </h2>

            <div className="p-6 space-y-4 text-sm text-black">
              <div>
                <p className="font-semibold">Judul Materi</p>
                <p className="text-[#B0AA9C]">{selectedMateri.judul}</p>
              </div>

              <div>
                <p className="font-semibold">Jenis File</p>
                <p className="text-[#B0AA9C]">{selectedMateri.jenisfile}</p>
              </div>

              <div>
                <p className="font-semibold">Kategori Pelajar</p>
                <p className="text-[#B0AA9C]">{selectedMateri.kategori}</p>
              </div>

              <div>
                <p className="font-semibold">Jenis Kategori</p>
                <p className="text-[#B0AA9C]">{selectedMateri.jeniskategori}</p>
              </div>

              <div>
                <p className="font-semibold">Deskripsi</p>
                <p className="text-[#B0AA9C]">{selectedMateri.deskripsi}</p>
              </div>

              <div>
                <p className="font-semibold">File</p>
                <a
                    href={selectedMateri.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF9500] underline cursor-pointer"
                >
                    {selectedMateri.file}
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelMateriMultimedia;
