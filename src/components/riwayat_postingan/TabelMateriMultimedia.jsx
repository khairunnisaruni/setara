// src/components/riwayat_postingan/TabelMateriMultimedia.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";

const TabelMateriMultimedia = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMateri, setSelectedMateri] = useState(null);
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

  // mapping kategori_kelas_id -> label kategori pelajar
  const mapKelas = (id) => {
    switch (id) {
      case 1:
        return "SD 1-3";
      case 2:
        return "SD 4-6";
      case 3:
        return "SMP";
      case 4:
        return "SMA";
      default:
        return "-";
    }
  };

  // mapping kategori_id -> label jenis kategori
  const mapKategori = (id) => {
    switch (id) {
      case 1:
        return "Materi Utama";
      case 2:
        return "Materi Pendukung";
      default:
        return "-";
    }
  };

  // === AMBIL DATA RIWAYAT MATERI USER ===
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // sesuaikan key-nya dengan login-mu

        const res = await axios.get("http://localhost:5000/api/materials/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const mapped = res.data.map((item, index) => {
          const rawPath = item.file_path || "";
          const fileName = rawPath.split("/").pop() || "-";
          const fileUrl = rawPath ? `http://localhost:5000${rawPath}` : null;

          return {
            no: index + 1,
            id: item.id,
            judul: item.title,
            jenisfile: (item.file_type || "").toUpperCase(),
            kategori: mapKelas(item.kategori_kelas_id),   // Kategori Pelajar
            jeniskategori: mapKategori(item.kategori_id), // Jenis Kategori
            deskripsi: item.description,
            tanggal: new Date(item.created_at).toLocaleDateString("id-ID"),
            statusDb: item.status,
            statusLabel: mapStatusLabel(item.status),
            fileUrl,
            fileName,
          };
        });

        setMaterials(mapped);
      } catch (err) {
        console.error("Gagal mengambil riwayat materi:", err);
        setMaterials([]);
      }
    };

    fetchHistory();
  }, []);

  // === FILTER STATUS + SEARCH ===
  const filteredData = useMemo(() => {
    const text = searchText.toLowerCase();

    return materials.filter((item) => {
      const matchStatus =
        filterStatus === "Semua" || item.statusLabel === filterStatus;

      const matchSearch =
        item.judul.toLowerCase().includes(text) ||
        (item.kategori || "").toLowerCase().includes(text) ||
        (item.jeniskategori || "").toLowerCase().includes(text);

      return matchStatus && matchSearch;
    });
  }, [materials, filterStatus, searchText]);

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="search"
          placeholder="Cari Materi..."
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
                Judul Materi
              </th>
              <th className="px-4 py-2 text-left min-w-[100px]">Jenis File</th>
              <th className="px-4 py-2 text-left min-w-[150px]">
                Kategori Pelajar
              </th>
              <th className="px-4 py-2 text-left min-w-[150px]">
                Jenis Kategori
              </th>
              <th className="px-4 py-2 text-left min-w-[200px]">Deskripsi</th>
              <th className="px-4 py-2 text-left min-w-[150px]">
                Tanggal Submit
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
                <td className="px-4 py-2">{item.jenisfile}</td>
                <td className="px-4 py-2">{item.kategori}</td>
                <td className="px-4 py-2">{item.jeniskategori}</td>
                <td className="px-4 py-2">
                  {truncateWords(item.deskripsi, 15)}
                </td>
                <td className="px-4 py-2">{item.tanggal}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={item.statusLabel} />
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
                {selectedMateri.fileUrl ? (
                  <a
                    href={selectedMateri.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF9500] underline cursor-pointer break-all"
                  >
                    {selectedMateri.fileName}
                  </a>
                ) : (
                  <p className="text-[#B0AA9C]">-</p>
                )}
              </div>

              <div>
                <p className="font-semibold">Status</p>
                <StatusBadge status={selectedMateri.statusLabel} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelMateriMultimedia;
