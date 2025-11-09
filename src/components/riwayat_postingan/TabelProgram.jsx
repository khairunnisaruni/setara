import React, { useState } from "react";
import { HiFilter, HiLink, HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";
import JenisProgramBadge from "./JenisProgramBadge";
import StatusProgramBadge from "./StatusProgramBadge";

const TabelProgram = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
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
      judul: "Valounteer mengajar satu desa",
      penyelenggara: "Komunitas Aksi Muda Indonesia",
      jenis: "Volunteer",
      lokasi: "SDN 09 Tapanuli Selatan",
      deskripsi: "“Volunteer Mengajar Satu Desa” merupakan inisiatif nyata dari Komunitas Aksi Muda Indonesia untuk memperluas akses pendidikan dasar di wilayah pedesaan. Program ini mengajak mahasiswa dan pemuda untuk terjun langsung ke desa-desa terpencil, memberikan pendampingan belajar bagi anak-anak SD yang belum memperoleh fasilitas dan metode pembelajaran yang memadai.",
      periode: "Mei - Juni 2025",
      deadline: "25 april 2025",
      statusprogram: "Akan Datang",
      tautan:"www.bukunasional.com",
      tanggal: "16-09-2005",
      status: "Disetujui",
      gambar: "./src/assets/inggris.png",
    },
    {
      no: 2,
      judul: "Valounteer mengajar satu desa",
      penyelenggara: "Komunitas Aksi Muda Indonesia",
      jenis: "Pengabdian Masyarakat",
      lokasi: "SDN 09 Tapanuli Selatan",
      deskripsi: "“Volunteer Mengajar Satu Desa” merupakan inisiatif nyata dari Komunitas Aksi Muda Indonesia untuk memperluas akses pendidikan dasar di wilayah pedesaan. Program ini mengajak mahasiswa dan pemuda untuk terjun langsung ke desa-desa terpencil, memberikan pendampingan belajar bagi anak-anak SD yang belum memperoleh fasilitas dan metode pembelajaran yang memadai.",
      periode: "Mei - Juni 2025",
      deadline: "25 april 2025",
      statusprogram: "Sedang Dibuka",
      tautan:"www.bukunasional.com",
      tanggal: "16-09-2005",
      status: "Menunggu",
      gambar: "./src/assets/inggris.png",

    },
    {
      no: 3,
      judul: "Valounteer mengajar satu desa",
      penyelenggara: "Komunitas Aksi Muda Indonesia",
      jenis: "Beasiswa",
      lokasi: "SDN 09 Tapanuli Selatan",
      deskripsi: "“Volunteer Mengajar Satu Desa” merupakan inisiatif nyata dari Komunitas Aksi Muda Indonesia untuk memperluas akses pendidikan dasar di wilayah pedesaan. Program ini mengajak mahasiswa dan pemuda untuk terjun langsung ke desa-desa terpencil, memberikan pendampingan belajar bagi anak-anak SD yang belum memperoleh fasilitas dan metode pembelajaran yang memadai.",
      periode: "Mei - Juni 2025",
      deadline: "25 april 2025",
      statusprogram: "Selesai",
      tautan:"www.bukunasional.com",
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
      item.penyelenggara.toLowerCase().includes(text) ||
      item.jenis.toLowerCase().includes(text) ||
      item.lokasi.toLowerCase().includes(text) ||
      item.periode.toLowerCase().includes(text) ||
      item.deadline.toLowerCase().includes(text);
      item.statusprogram.toLowerCase().includes(text);

      return matchStatus && matchSearch;
    });

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        {/* Live Search */}
        <input
          type="search"
          placeholder="Cari Program..."
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
              <th className="px-4 py-2 text-left min-w-[180px]">Judul Program</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Penyelenggara</th>
              <th className="px-4 py-2 text-left">Jenis Program</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Lokasi Program</th>
              <th className="px-4 py-2 text-left min-w-[200px]">Deskripsi Program</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Periode</th>
              <th className="px-4 py-2 text-left min-w-[180px]">Deadline Pendaftaran</th>
              <th className="px-4 py-2 text-left">Status Program</th>
              <th className="px-4 py-2 text-center">Tautan</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left min-w-[150px]">Tanggal Submit</th>
              <th className="px-4 py-2 text-center">Detail</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2">{item.no}</td>
                <td className="px-4 py-2">{item.judul}</td>
                <td className="px-4 py-2">{item.penyelenggara}</td>
                <td className="px-4 py-2">
                    <JenisProgramBadge jenis={item.jenis} />
                </td>
                <td className="px-4 py-2">{item.lokasi}</td>
                <td className="px-4 py-2">{truncateWords(item.deskripsi, 15)}</td>
                <td className="px-4 py-2">{item.periode}</td>
                <td className="px-4 py-2">{item.deadline}</td>
                <td className="px-4 py-2">
                    <StatusProgramBadge status={item.statusprogram} />
                </td>
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

                <td className="px-4 py-2">{item.tanggal}</td>

                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => setSelectedProgram(item)}
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
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[700px] max-h-[90vh] overflow-y-auto relative">
            <button
              className="cursor-pointer absolute top-1 right-0.5 text-black hover:text-gray-700 text-4xl font-bold"
              onClick={() => setSelectedProgram(null)}
            >
              ×
            </button>

            <div className="w-full h-48 ">
              <img
                src={selectedProgram.gambar}
                alt=""
                className="object-cover h-full w-full rounded-xl"
              />
            </div>

            <div className="p-6 space-y-4 text-sm text-black">
              <div className="flex justify-between">
                <div>
                    <p className="font-semibold">Judul Program</p>
                    <p className="text-[#B0AA9C]">{selectedProgram.judul}</p>
                </div>
                <div>
                    <StatusProgramBadge status={selectedProgram.statusprogram} />
                </div>
              </div>

              <div>
                <p className="font-semibold">Jenis Program</p>
                <JenisProgramBadge jenis={selectedProgram.jenis} />
              </div>

              <div>
                <p className="font-semibold">Penyelenggara Program</p>
                <p className="text-[#B0AA9C]">{selectedProgram.penyelenggara}</p>
              </div>

              <div>
                <p className="font-semibold">Periode Program</p>
                <p className="text-[#B0AA9C]">{selectedProgram.periode}</p>
              </div>

              <div>
                <p className="font-semibold">Lokasi Program</p>
                <p className="text-[#B0AA9C]">{selectedProgram.lokasi}</p>
              </div>

              <div>
                <p className="font-semibold">Deskripsi Program</p>
                <p className="text-[#B0AA9C]">{selectedProgram.deskripsi}</p>
              </div>

              <div>
                <p className="font-semibold">Deadline Pendaftaran</p>
                <p className="mt-1 px-3 py-1 rounded-full font-semibold bg-[#317C76] text-[#FBF8F4] w-fit">{selectedProgram.deadline}</p>
              </div>

              <div>
                <p className="font-semibold">Link</p>
                <a
                  href={selectedProgram.tautan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF9500] underline"
                >
                  {selectedProgram.tautan}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelProgram;
