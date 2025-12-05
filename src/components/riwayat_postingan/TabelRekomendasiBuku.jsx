// src/components/riwayat_postingan/TabelRekomendasiBuku.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { HiLink, HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";

const TabelRekomendasiBuku = () => {
  const [books, setBooks] = useState([]);
  const [selectedBuku, setSelectedBuku] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [searchText, setSearchText] = useState("");

  const truncateWords = (text, limit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  // mapping status DB -> label Indonesia (buat StatusBadge)
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

  // === AMBIL DATA RIWAYAT REKOMENDASI BUKU USER ===
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Ambil token dari localStorage (SESUIKAN KEY-NYA sesuai login-mu)
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/books/me", {
          headers: {
            Authorization: `Bearer ${token}`, // penting untuk middleware protect
          },
          withCredentials: true, // kalau kamu juga pakai cookie, ini boleh tetap
        });

        const mapped = res.data.map((item, index) => ({
          no: index + 1,
          id: item.id,
          judul: item.title,
          penulis: item.author,
          kategori: item.kategori_nama || item.kategori_id || "-",
          deskripsi: item.description,
          tautan: item.link,
          tanggal: new Date(item.created_at).toLocaleDateString("id-ID"),
          statusDb: item.status,
          statusLabel: mapStatusLabel(item.status),
        }));

        setBooks(mapped);
      } catch (err) {
        console.error("Gagal mengambil riwayat buku:", err);
        setBooks([]);
      }
    };

    fetchHistory();
  }, []);

  // === FILTER STATUS + SEARCH ===
  const filteredData = useMemo(() => {
    const text = searchText.toLowerCase();

    return books.filter((item) => {
      const matchStatus =
        filterStatus === "Semua" || item.statusLabel === filterStatus;

      const matchSearch =
        item.judul.toLowerCase().includes(text) ||
        item.penulis.toLowerCase().includes(text) ||
        (item.kategori || "").toLowerCase().includes(text);

      return matchStatus && matchSearch;
    });
  }, [books, filterStatus, searchText]);

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="search"
          placeholder="Cari buku..."
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
              <th className="px-4 py-2 text-left min-w-[180px]">Judul Buku</th>
              <th className="px-4 py-2 text-left min-w-[160px]">
                Penulis Buku
              </th>
              <th className="px-4 py-2 text-left min-w-[140px]">
                Kategori Buku
              </th>
              <th className="px-4 py-2 text-left min-w-[220px]">Deskripsi</th>
              <th className="px-4 py-2 text-left min-w-[130px]">
                Tanggal Submit
              </th>
              <th className="px-4 py-2 text-center min-w-[130px]">
                Tautan Buku
              </th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Detail</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{item.no}</td>
                <td className="px-4 py-2">{item.judul}</td>
                <td className="px-4 py-2">{item.penulis}</td>
                <td className="px-4 py-2">{item.kategori}</td>
                <td className="px-4 py-2">
                  {truncateWords(item.deskripsi, 15)}
                </td>
                <td className="px-4 py-2">{item.tanggal}</td>
                <td className="px-4 py-2 text-center">
                  {item.tautan && (
                    <a
                      href={
                        item.tautan.startsWith("http")
                          ? item.tautan
                          : `https://${item.tautan}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF9500] hover:text-[#e68a00]"
                    >
                      <HiLink className="w-5 h-5 inline" />
                    </a>
                  )}
                </td>
                <td className="px-4 py-2">
                  <StatusBadge status={item.statusLabel} />
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => setSelectedBuku(item)}
                    className="text-[#FF9500] hover:text-[#e68a00] cursor-pointer"
                  >
                    <HiEye className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  Tidak ada data yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail */}
      {selectedBuku && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-[420px] max-h-[90vh] overflow-y-auto relative">
            <button
              className="cursor-pointer absolute top-1 right-0.5 text-black hover:text-gray-700 text-4xl font-bold"
              onClick={() => setSelectedBuku(null)}
            >
              ×
            </button>

            <h2 className="p-3 text-center text-lg font-semibold text-[#FF9500] underline">
              Detail Rekomendasi Buku
            </h2>

            <div className="p-6 space-y-4 text-sm text-black">
              <div>
                <p className="font-semibold">Judul Buku</p>
                <p className="text-[#B0AA9C]">{selectedBuku.judul}</p>
              </div>

              <div>
                <p className="font-semibold">Penulis Buku</p>
                <p className="text-[#B0AA9C]">{selectedBuku.penulis}</p>
              </div>

              <div>
                <p className="font-semibold">Kategori Buku</p>
                <p className="text-[#B0AA9C]">{selectedBuku.kategori}</p>
              </div>

              <div>
                <p className="font-semibold">Deskripsi</p>
                <p className="text-[#B0AA9C]">{selectedBuku.deskripsi}</p>
              </div>

              <div>
                <p className="font-semibold">Tautan Buku</p>
                {selectedBuku.tautan ? (
                  <a
                    href={
                      selectedBuku.tautan.startsWith("http")
                        ? selectedBuku.tautan
                        : `https://${selectedBuku.tautan}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF9500] underline break-all"
                  >
                    {selectedBuku.tautan}
                  </a>
                ) : (
                  <p className="text-[#B0AA9C]">-</p>
                )}
              </div>

              <div>
                <p className="font-semibold">Status</p>
                <StatusBadge status={selectedBuku.statusLabel} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelRekomendasiBuku;
