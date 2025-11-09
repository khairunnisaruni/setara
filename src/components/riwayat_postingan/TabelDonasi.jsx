import React, { useState } from "react";
import { HiFilter, HiLink, HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";

const TabelDonasi = () => {
  const [selectedDonasi, setSelectedDonasi] = useState(null);
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
      judul: "Donasi Buku & Alat Tulis SD SDN 09 Sipirok",
      kategori: "Kebutuhan Dasar Siswa",
      penerima: "SDN 09 Sipirok Tapanuli Selatan, Sumatera Utara",
      deskripsi: "Di Desa Sipirok Tapanuli, semangat belajar anak-anak begitu tinggi, tetapi fasilitas membaca masih sangat terbatas. Perpustakaan sekolah hanya memiliki beberapa buku pelajaran lama, dan sebagian besar siswa belum pernah membaca buku cerita anak yang sesuai usia mereka.",
      dampak: "Membantu 100+ anak SD dan SMP mendapatkan akses ke bahan bacaan yang menarik dan mendidik, Meningkatkan minat baca dan kemampuan literasi dasar anak-anak desa, Mendorong terbentuknya komunitas membaca mandiri di Desa Lumban Batu, Menginspirasi mahasiswa dan relawan untuk turut berkontribusi dalam kegiatan literasi pedesaan.",
      tautan: "www.bukunasional.com",
      penanggungjawab: "Rina Sari",
      contactperson: "081234567890",
      tanggal: "16-09-2005",
      status: "Disetujui",
      gambar: "./src/assets/inggris.png",
    },
    {
      no: 2,
      judul: "Alat Tulis SD SDN 09 Sipirok",
      kategori: "Kebutuhan Dasar Siswa",
      penerima: "SDN 09 Sipirok Tapanuli Selatan, Sumatera Utara",
      deskripsi: "Di Desa Sipirok Tapanuli, semangat belajar anak-anak begitu tinggi, tetapi fasilitas membaca masih sangat terbatas. Perpustakaan sekolah hanya memiliki beberapa buku pelajaran lama, dan sebagian besar siswa belum pernah membaca buku cerita anak yang sesuai usia mereka.",
      dampak: "Membantu 100+ anak SD dan SMP mendapatkan akses ke bahan bacaan yang menarik dan mendidik, Meningkatkan minat baca dan kemampuan literasi dasar anak-anak desa, Mendorong terbentuknya komunitas membaca mandiri di Desa Lumban Batu, Menginspirasi mahasiswa dan relawan untuk turut berkontribusi dalam kegiatan literasi pedesaan.",
      tautan: "www.bukunasional.com",
      penanggungjawab: "Rina Sari",
      contactperson: "081234567890",
      tanggal: "16-09-2005",
      status: "Menunggu",
      gambar: "./src/assets/inggris.png",
    },
    {
      no: 3,
      judul: "Donasi Buku SD SDN 09 Sipirok",
      kategori: "Kebutuhan Dasar Siswa",
      penerima: "SDN 09 Sipirok Tapanuli Selatan, Sumatera Utara",
      deskripsi: "Di Desa Sipirok Tapanuli, semangat belajar anak-anak begitu tinggi, tetapi fasilitas membaca masih sangat terbatas. Perpustakaan sekolah hanya memiliki beberapa buku pelajaran lama, dan sebagian besar siswa belum pernah membaca buku cerita anak yang sesuai usia mereka.",
      dampak: "Membantu 100+ anak SD dan SMP mendapatkan akses ke bahan bacaan yang menarik dan mendidik, Meningkatkan minat baca dan kemampuan literasi dasar anak-anak desa, Mendorong terbentuknya komunitas membaca mandiri di Desa Lumban Batu, Menginspirasi mahasiswa dan relawan untuk turut berkontribusi dalam kegiatan literasi pedesaan.",
      tautan: "www.bukunasional.com",
      penanggungjawab: "Rina Sari",
      contactperson: "081234567890",
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
      item.kategori.toLowerCase().includes(text) ||
      item.penerima.toLowerCase().includes(text) ||
      item.dampak.toLowerCase().includes(text);
      item.penanggungjawab.toLowerCase().includes(text);
      item.contactperson.toLowerCase().includes(text);


      return matchStatus && matchSearch;
    });

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        {/* Live Search */}
        <input
          type="search"
          placeholder="Cari Donasi..."
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
                    <th className="px-4 py-2 text-left min-w-[180px]">Judul Donasi</th>
                    <th className="px-4 py-2 text-left min-w-40">Kategori Donasi</th>
                    <th className="px-4 py-2 text-left min-w-40">Penerima Manfaat</th>
                    <th className="px-4 py-2 text-left min-w-[200px]">Deskripsi Donasi</th>
                    <th className="px-4 py-2 text-left min-w-[200px]">Dampak Donasi</th>
                    <th className="px-4 py-2 text-center min-w-[200px]">Tautan Resmi Donasi</th>
                    <th className="px-4 py-2 text-left min-w-[230px]">Penanggung Jawab Donasi</th>
                    <th className="px-4 py-2 text-left min-w-[150px]">Contact Person</th>
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
                <td className="px-4 py-2">{item.kategori}</td>
                <td className="px-4 py-2">{item.penerima}</td>
                <td className="px-4 py-2">{truncateWords (item.deskripsi, 15)}</td>
                <td className="px-4 py-2">{truncateWords (item.dampak, 15)}</td>
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
                <td className="px-4 py-2">{item.penanggungjawab}</td>
                <td className="px-4 py-2">{item.contactperson}</td>

                <td className="px-4 py-2">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-2">{item.tanggal}</td>

                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => setSelectedDonasi(item)}
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
      {selectedDonasi && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[700px] max-h-[90vh] overflow-y-auto relative">
            <button
              className="cursor-pointer absolute top-1 right-0.5 text-black hover:text-gray-700 text-4xl font-bold"
              onClick={() => setSelectedDonasi(null)}
            >
              ×
            </button>

            <div className="w-full h-48 ">
              <img
                src={selectedDonasi.gambar}
                alt=""
                className="object-cover h-full w-full rounded-xl"
              />
            </div>

            <div className="p-6 space-y-4 text-sm text-black">
                <div>
                    <p className="font-semibold">Judul Donasi</p>
                    <p className="text-[#B0AA9C]">{selectedDonasi.judul}</p>
                </div>
              
              <div>
                <p className="font-semibold">Penerima Manfaat</p>
                <p className="text-[#B0AA9C]">{selectedDonasi.penerima}</p>
              </div>

              <div>
                <p className="font-semibold">Jenis Donasi</p>
                <p className="mt-1 px-3 py-1 rounded-full font-semibold bg-[#317C76] text-[#FBF8F4] w-fit">{selectedDonasi.kategori}</p>
              </div>

              <div>
                <p className="font-semibold">Deskripsi Kebutuhan</p>
                <p className="text-[#B0AA9C]">{selectedDonasi.deskripsi}</p>
              </div>

              <div>
                <p className="font-semibold">Dampak Donasi</p>
                <p className="text-[#B0AA9C]">{selectedDonasi.dampak}</p>
              </div>

              <div>
                <p className="font-semibold">Penanggung Jawab Donasi</p>
                <p className="text-[#B0AA9C]">{selectedDonasi.penanggungjawab}</p>
              </div>

              <div>
                <p className="font-semibold">Contact Person</p>
                <p className="text-[#B0AA9C]">{selectedDonasi.contactperson}</p>
              </div>

              <div>
                <p className="font-semibold">Tautan Program</p>
                <a
                  href={selectedDonasi.tautan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF9500] underline"
                >
                  {selectedDonasi.tautan}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelDonasi;
