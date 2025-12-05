// src/components/riwayat_postingan/TabelCeritaLapangan.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import StatusBadge from "./StatusBadge";

const TabelCeritaLapangan = () => {
  const [stories, setStories] = useState([]);
  const [selectedCeritaLapangan, setSelectedCeritaLapangan] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [searchText, setSearchText] = useState("");

  const truncateWords = (text, limit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  // mapping status DB -> label Indonesia
  const mapStatusLabel = (status) => {
    switch (status) {
      case "approved":
        return "Disetujui";
      case "pending":
        return "Menunggu";
      case "rejected":
        return "Ditolak";
      default:
        return "Menunggu";
    }
  };

  // === AMBIL DATA RIWAYAT CERITA USER ===
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // sesuaikan key-nya

        const res = await axios.get("http://localhost:5000/api/cerita/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const mapped = res.data.map((item, index) => ({
          no: index + 1,
          id: item.id,
          judul: item.title,
          deskripsi: item.content,
          tanggal: new Date(item.created_at).toLocaleDateString("id-ID"),
          statusDb: item.status,
          statusLabel: mapStatusLabel(item.status),
        }));

        setStories(mapped);
      } catch (err) {
        console.error("Gagal mengambil riwayat cerita:", err);
        setStories([]);
      }
    };

    fetchHistory();
  }, []);

  // === FILTER STATUS + SEARCH ===
  const filteredData = useMemo(() => {
    const text = searchText.toLowerCase();

    return stories.filter((item) => {
      const matchStatus =
        filterStatus === "Semua" || item.statusLabel === filterStatus;

      const matchSearch = item.judul.toLowerCase().includes(text);

      return matchStatus && matchSearch;
    });
  }, [stories, filterStatus, searchText]);

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="search"
          placeholder="Cari Cerita Lapangan..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#FF9500] placeholder-[#6B7280]"
        />

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
              <th className="px-4 py-2 text-left min-w-[180px]">
                Judul Cerita
              </th>
              <th className="px-4 py-2 text-left min-w-[200px]">
                Deskripsi Cerita
              </th>
              <th className="px-4 py-2 text-left min-w-[150px]">
                Tanggal Submit
              </th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{item.no}</td>
                <td className="px-4 py-2">{item.judul}</td>
                <td className="px-4 py-2">
                  {truncateWords(item.deskripsi, 15)}
                </td>
                <td className="px-4 py-2">{item.tanggal}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={item.statusLabel} />
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Tidak ada data yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail (belum dipakai karena tidak ada kolom Detail) */}
      {selectedCeritaLapangan && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[420px] max-h-[90vh] overflow-y-auto relative">
            <button
              className="cursor-pointer absolute top-1 right-0.5 text-black hover:text-gray-700 text-4xl font-bold"
              onClick={() => setSelectedCeritaLapangan(null)}
            >
              ×
            </button>

            <h2 className="text-center text-lg font-semibold text-[#FF9500] underline py-2">
              Detail Cerita Lapangan
            </h2>

            <div className="p-6 space-y-4 text-sm text-black">
              <div>
                <p className="font-semibold">Judul Cerita</p>
                <p className="text-[#B0AA9C]">
                  {selectedCeritaLapangan.judul}
                </p>
              </div>

              <div>
                <p className="font-semibold">Deskripsi</p>
                <p className="text-[#B0AA9C]">
                  {selectedCeritaLapangan.deskripsi}
                </p>
              </div>

              <div>
                <p className="font-semibold">Tanggal Submit</p>
                <p className="text-[#B0AA9C]">
                  {selectedCeritaLapangan.tanggal}
                </p>
              </div>

              <div>
                <p className="font-semibold">Status</p>
                <StatusBadge status={selectedCeritaLapangan.statusLabel} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelCeritaLapangan;
