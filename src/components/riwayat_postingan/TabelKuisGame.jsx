import React, { useState } from "react";
import { HiFilter, HiLink, HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";

const TabelKuisGame = () => {
  const [selectedKuis, setSelectedKuis] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [searchText, setSearchText] = useState(""); // search

  const data = [
    {
      no: 1,
      judul: "Learning Past Tenses",
      kelas: "SD 5",
      mapel: "Bahasa Inggris",
      platform: "Wayground",
      deskripsi: "Materi Past tense untuk kelas 5 sd",
      tautan: "https://kahoot.com/blog/2021/01/28/how-to-create-kahoot-tips-teachers/",
      tanggal: "16-09-2005",
      status: "Disetujui",
      gambar: "./src/assets/inggris.png",
    },
    {
      no: 2,
      judul: "Belajar Mengeja, Menulis, dan Menghitung",
      kelas: "SD 2",
      mapel: "Pelajaran Dasar",
      platform: "Kahoot!",
      deskripsi: "Materi hitung untuk kelas 5 sd",
      tautan: "https://create.kahoot.it/discover",
      tanggal: "16-09-2005",
      status: "Menunggu",
      gambar: "./src/assets/inggris.png",

    },
    {
      no: 3,
      judul: "Belajar Mengeja, Menulis, dan Menghitung",
      kelas: "SD 2",
      mapel: "Pelajaran Dasar",
      platform: "Kahoot!",
      deskripsi: "Materi hitung untuk kelas 5 sd",
      tautan: "https://kahoot.com",
      tanggal: "16-09-2005",
      status: "Ditolak",
      gambar: "./src/assets/inggris.png",

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
      item.mapel.toLowerCase().includes(text) ||
      item.platform?.toLowerCase().includes(text) ||
      item.kelas.toLowerCase().includes(text);

      return matchStatus && matchSearch;
    });

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        {/* Live Search */}
        <input
          type="search"
          placeholder="Cari kuis..."
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
              <th className="px-4 py-2 text-left min-w-[180px]">Judul</th>
              <th className="px-4 py-2 text-left min-w-28">Kelas</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Mata Pelajaran</th>
              <th className="px-4 py-2 text-left">Platform</th>
              <th className="px-4 py-2 text-left min-w-[200px]">Deskripsi</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Tanggal Submit</th>
              <th className="px-4 py-2 text-center">Tautan</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Detail</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{item.no}</td>
                <td className="px-4 py-2">{item.judul}</td>
                <td className="px-4 py-2">{item.kelas}</td>
                <td className="px-4 py-2">{item.mapel}</td>
                <td className="px-4 py-2">{item.platform}</td>
                <td className="px-4 py-2">{item.deskripsi}</td>
                <td className="px-4 py-2">{item.tanggal}</td>
                <td className="px-4 py-2 text-center">
                  <a
                    href={item.tautan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF9500] hover:text-[#e68a00]"
                  >
                    <HiLink className="w-5 h-5 inline" />
                  </a>
                </td>

                <td className="px-4 py-2">
                  <StatusBadge status={item.status} />
                </td>

                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => setSelectedKuis(item)}
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
      {selectedKuis && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[420px] max-h-[90vh] overflow-y-auto relative">
            <button
              className="cursor-pointer absolute top-1 right-0.5 text-black hover:text-gray-700 text-4xl font-bold"
              onClick={() => setSelectedKuis(null)}
            >
              ×
            </button>

            <div className="w-full h-48 ">
              <img
                src={selectedKuis.gambar}
                alt=""
                className="object-cover h-full w-full rounded-xl"
              />
            </div>

            <h2 className="text-center text-lg font-semibold text-[#FF9500] underline">
              Detail Kuis
            </h2>

            <div className="p-6 space-y-4 text-sm text-black">
              <div>
                <p className="font-semibold">Judul Kuis & Game</p>
                <p className="text-[#B0AA9C]">{selectedKuis.judul}</p>
              </div>

              <div>
                <p className="font-semibold">Deskripsi</p>
                <p className="text-[#B0AA9C]">{selectedKuis.deskripsi}</p>
              </div>

              <div>
                <p className="font-semibold">Platform</p>
                <p className="text-[#B0AA9C]">{selectedKuis.platform}</p>
              </div>

              <div>
                <p className="font-semibold">Link</p>
                <a
                  href={selectedKuis.tautan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF9500] underline"
                >
                  {selectedKuis.tautan}
                </a>
              </div>

              <div>
                <p className="font-semibold">Kategori Mata Pelajaran</p>
                <p className="text-[#B0AA9C]">{selectedKuis.mapel}</p>
              </div>

              <div>
                <p className="font-semibold">Kategori Kelas</p>
                <p className="text-[#B0AA9C]">{selectedKuis.kelas}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelKuisGame;
