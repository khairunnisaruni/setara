// src/components/riwayat_postingan/TabelProgram.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { HiLink, HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";
import JenisProgramBadge from "./JenisProgramBadge";
import StatusProgramBadge from "./StatusProgramBadge";

const TabelProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [searchText, setSearchText] = useState("");

  const truncateWords = (text, limit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  // mapping status verifikasi (kolom 'status') ke label Indonesia
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

  // mapping jenis_program ke label
  const mapJenisLabel = (jenis) => {
    if (!jenis) return "-";
    const lower = jenis.toLowerCase();
    if (lower === "volunteer") return "Volunteer";
    if (lower === "pengabdian") return "Pengabdian Masyarakat";
    if (lower === "beasiswa") return "Beasiswa";
    return jenis;
  };

  // mapping status_program ke label
  const mapStatusProgramLabel = (statusProgram) => {
    if (!statusProgram) return "-";
    const lower = statusProgram.toLowerCase();
    if (lower.includes("akan")) return "Akan Datang";
    if (lower.includes("sedang")) return "Sedang Dibuka";
    if (lower.includes("selesai")) return "Selesai";
    return statusProgram;
  };

  // === AMBIL DATA RIWAYAT PROGRAM USER ===
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // sesuaikan dengan key yang kamu pakai

        const res = await axios.get("http://localhost:5000/api/programs/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const mapped = res.data.map((item, index) => {
          const rawPoster = item.poster_banner || "";
          const posterUrl = rawPoster
            ? `http://localhost:5000${rawPoster}`
            : null;

          return {
            no: index + 1,
            id: item.id,
            judul: item.judul_program,
            penyelenggara: item.penyelenggara,
            jenis: mapJenisLabel(item.jenis_program),
            lokasi: item.lokasi_program || "-",
            deskripsi: item.deskripsi_program,
            periode: item.periode_tanggal || "-",
            deadline: item.deadline_pendaftaran
              ? new Date(item.deadline_pendaftaran).toLocaleDateString("id-ID")
              : "-",
            statusprogram: mapStatusProgramLabel(item.status_program),
            tautan: item.tautan_sumber_resmi,
            tanggal: new Date(item.created_at).toLocaleDateString("id-ID"),
            statusDb: item.status,
            statusLabel: mapStatusLabel(item.status),
            gambar: posterUrl,
          };
        });

        setPrograms(mapped);
      } catch (err) {
        console.error("Gagal mengambil riwayat program:", err);
        setPrograms([]);
      }
    };

    fetchHistory();
  }, []);

  // FILTER STATUS + SEARCH
  const filteredData = useMemo(() => {
    const text = searchText.toLowerCase();

    return programs.filter((item) => {
      const matchStatus =
        filterStatus === "Semua" || item.statusLabel === filterStatus;

      if (!text.trim()) return matchStatus;

      const matchSearch =
        item.judul.toLowerCase().includes(text) ||
        (item.penyelenggara || "").toLowerCase().includes(text) ||
        (item.jenis || "").toLowerCase().includes(text) ||
        (item.lokasi || "").toLowerCase().includes(text) ||
        (item.periode || "").toLowerCase().includes(text) ||
        (item.deadline || "").toLowerCase().includes(text) ||
        (item.statusprogram || "").toLowerCase().includes(text) ||
        (item.statusLabel || "").toLowerCase().includes(text);

      return matchStatus && matchSearch;
    });
  }, [programs, filterStatus, searchText]);

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="search"
          placeholder="Cari Program..."
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
                Judul Program
              </th>
              <th className="px-4 py-2 text-left min-w-[150px]">
                Penyelenggara
              </th>
              <th className="px-4 py-2 text-left">Jenis Program</th>
              <th className="px-4 py-2 text-left min-w-[150px]">
                Lokasi Program
              </th>
              <th className="px-4 py-2 text-left min-w-[200px]">
                Deskripsi Program
              </th>
              <th className="px-4 py-2 text-left min-w-[150px]">Periode</th>
              <th className="px-4 py-2 text-left min-w-[180px]">
                Deadline Pendaftaran
              </th>
              <th className="px-4 py-2 text-left">Status Program</th>
              <th className="px-4 py-2 text-center">Tautan</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left min-w-[150px]">
                Tanggal Submit
              </th>
              <th className="px-4 py-2 text-center">Detail</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{item.no}</td>
                <td className="px-4 py-2">{item.judul}</td>
                <td className="px-4 py-2">{item.penyelenggara}</td>
                <td className="px-4 py-2">
                  <JenisProgramBadge jenis={item.jenis} />
                </td>
                <td className="px-4 py-2">{item.lokasi}</td>
                <td className="px-4 py-2">
                  {truncateWords(item.deskripsi, 15)}
                </td>
                <td className="px-4 py-2">{item.periode}</td>
                <td className="px-4 py-2">{item.deadline}</td>
                <td className="px-4 py-2">
                  <StatusProgramBadge status={item.statusprogram} />
                </td>
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

            {filteredData.length === 0 && (
              <tr>
                <td colSpan={13} className="text-center py-4 text-gray-500">
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

            {selectedProgram.gambar && (
              <div className="w-full h-48 ">
                <img
                  src={selectedProgram.gambar}
                  alt=""
                  className="object-cover h-full w-full rounded-xl"
                />
              </div>
            )}

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
                <p className="text-[#B0AA9C]">
                  {selectedProgram.penyelenggara}
                </p>
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
                <p className="mt-1 px-3 py-1 rounded-full font-semibold bg-[#317C76] text-[#FBF8F4] w-fit">
                  {selectedProgram.deadline}
                </p>
              </div>

              <div>
                <p className="font-semibold">Tautan Resmi</p>
                {selectedProgram.tautan ? (
                  <a
                    href={
                      selectedProgram.tautan.startsWith("http")
                        ? selectedProgram.tautan
                        : `https://${selectedProgram.tautan}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF9500] underline break-all"
                  >
                    {selectedProgram.tautan}
                  </a>
                ) : (
                  <p className="text-[#B0AA9C]">-</p>
                )}
              </div>

              <div>
                <p className="font-semibold">Status Verifikasi</p>
                <StatusBadge status={selectedProgram.statusLabel} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelProgram;
