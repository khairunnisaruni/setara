// src/components/riwayat_postingan/TabelDonasi.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { HiLink, HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";

const TabelDonasi = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonasi, setSelectedDonasi] = useState(null);
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

  // === AMBIL DATA RIWAYAT DONASI USER ===
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // sesuaikan nama key

        const res = await axios.get("http://localhost:5000/api/donasi/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const mapped = res.data.map((item, index) => {
          const posterUrl = item.poster
            ? `http://localhost:5000/uploads/donasi/${item.poster}`
            : null;

          return {
            no: index + 1,
            id: item.id,
            judul: item.title,
            kategori: item.kategori,
            penerima: item.penerima_manfaat,
            deskripsi: item.description,
            dampak: item.dampak,
            tautan: item.link,
            penanggungjawab: item.penanggung_jawab,
            contactperson: item.contact_person,
            tanggal: new Date(item.created_at).toLocaleDateString("id-ID"),
            statusDb: item.status,
            statusLabel: mapStatusLabel(item.status),
            gambar: posterUrl,
          };
        });

        setDonations(mapped);
      } catch (err) {
        console.error("Gagal mengambil riwayat donasi:", err);
        setDonations([]);
      }
    };

    fetchHistory();
  }, []);

  //  FILTER STATUS + SEARCH
  const filteredData = useMemo(() => {
    const text = searchText.toLowerCase();

    return donations.filter((item) => {
      const matchStatus =
        filterStatus === "Semua" || item.statusLabel === filterStatus;

      const matchSearch =
        item.judul.toLowerCase().includes(text) ||
        (item.kategori || "").toLowerCase().includes(text) ||
        (item.penerima || "").toLowerCase().includes(text) ||
        (item.dampak || "").toLowerCase().includes(text) ||
        (item.penanggungjawab || "").toLowerCase().includes(text) ||
        (item.contactperson || "").toLowerCase().includes(text);

      return matchStatus && matchSearch;
    });
  }, [donations, filterStatus, searchText]);

  return (
    <>
      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="search"
          placeholder="Cari Donasi..."
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
                Judul Donasi
              </th>
              <th className="px-4 py-2 text-left min-w-40">
                Kategori Donasi
              </th>
              <th className="px-4 py-2 text-left min-w-40">
                Penerima Manfaat
              </th>
              <th className="px-4 py-2 text-left min-w-[200px]">
                Deskripsi Donasi
              </th>
              <th className="px-4 py-2 text-left min-w-[200px]">
                Dampak Donasi
              </th>
              <th className="px-4 py-2 text-center min-w-[200px]">
                Tautan Resmi Donasi
              </th>
              <th className="px-4 py-2 text-left min-w-[230px]">
                Penanggung Jawab Donasi
              </th>
              <th className="px-4 py-2 text-left min-w-[150px]">
                Contact Person
              </th>
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
                <td className="px-4 py-2">{item.kategori}</td>
                <td className="px-4 py-2">{item.penerima}</td>
                <td className="px-4 py-2">
                  {truncateWords(item.deskripsi, 15)}
                </td>
                <td className="px-4 py-2">
                  {truncateWords(item.dampak, 15)}
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
                <td className="px-4 py-2">{item.penanggungjawab}</td>
                <td className="px-4 py-2">{item.contactperson}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={item.statusLabel} />
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

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center py-4 text-gray-500">
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

            {selectedDonasi.gambar && (
              <div className="w-full h-48 ">
                <img
                  src={selectedDonasi.gambar}
                  alt=""
                  className="object-cover h-full w-full rounded-xl"
                />
              </div>
            )}

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
                <p className="mt-1 px-3 py-1 rounded-full font-semibold bg-[#317C76] text-[#FBF8F4] w-fit">
                  {selectedDonasi.kategori}
                </p>
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
                <p className="text-[#B0AA9C]">
                  {selectedDonasi.penanggungjawab}
                </p>
              </div>

              <div>
                <p className="font-semibold">Contact Person</p>
                <p className="text-[#B0AA9C]">
                  {selectedDonasi.contactperson}
                </p>
              </div>

              <div>
                <p className="font-semibold">Tautan Program</p>
                {selectedDonasi.tautan ? (
                  <a
                    href={
                      selectedDonasi.tautan.startsWith("http")
                        ? selectedDonasi.tautan
                        : `https://${selectedDonasi.tautan}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF9500] underline"
                  >
                    {selectedDonasi.tautan}
                  </a>
                ) : (
                  <p className="text-[#B0AA9C]">-</p>
                )}
              </div>

              <div>
                <p className="font-semibold">Status</p>
                <StatusBadge status={selectedDonasi.statusLabel} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TabelDonasi;
