import React, { useState } from "react";
import { HiFilter, HiLink, HiEye } from "react-icons/hi";
import StatusBadge from "./StatusBadge";

const TabelRekomendasiBuku = () => {
    const [selectedBuku, setSelectedBuku] = useState(null);
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
            penulis: "Fildza rasyika",
            kategori: "Matematika",
            deskripsi: "Buku ini mengajarkan tentang latihan soal",
            tautan: " www.bukunasional.com", 
            tanggal: "16-09-2025",
            status: "Disetujui",
            gambar:"./src/assets/buku.jpg"
        },
        {
            no: 2,
            judul: "IPA Dasar",
            penulis: "Fildza rasyika",
            kategori: "Matematika",
            deskripsi: "Buku ini mengajarkan tentang latihan soal",
            tautan: " www.bukunasional.com", 
            tanggal: "16-09-2025",
            status: "Menunggu",
            gambar:"./src/assets/buku.jpg"
        },
        {
            no: 3,
            judul: "inggris Dasar",
            penulis: "Fildza rasyika",
            kategori: "Matematika",
            deskripsi: "Buku ini mengajarkan tentang latihan soal",
            tautan: " www.bukunasional.com", 
            tanggal: "16-09-2025",
            status: "Ditolak",
            gambar:"./src/assets/buku.jpg"
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
        item.penulis.toLowerCase().includes(text) ||
        item.kategori.toLowerCase().includes(text);

        return matchStatus && matchSearch;
    });

    return(
        <>
            {/* Search and Filter */}
            <div className="flex justify-between items-center mb-4 gap-4">
                {/* Live Search */}
                <input
                    type="search"
                    placeholder="Cari buku..."
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
                    <th className="px-4 py-2 text-left min-w-[180px]">Judul Buku</th>
                    <th className="px-4 py-2 text-left min-w-[180px]">Penulis Buku</th>
                    <th className="px-4 py-2 text-left min-w-40">Kategori Buku</th>
                    <th className="px-4 py-2 text-left min-w-[200px]">Deskripsi</th>
                    <th className="px-4 py-2 text-left min-w-[150px]">Tanggal Submit</th>
                    <th className="px-4 py-2 text-center min-w-[150px]">Tautan Buku</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-center">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                    <tr key={index} className="border-t border-gray-200">
                        <td className="px-4 py-2">{item.no}</td>
                        <td className="px-4 py-2">{item.judul}</td>
                        <td className="px-4 py-2">{item.penulis}</td>
                        <td className="px-4 py-2">{item.kategori}</td>
                        <td className="px-4 py-2">{truncateWords (item.deskripsi, 15)}</td>
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
                                onClick={() => setSelectedBuku(item)}
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
            {selectedBuku && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl w-[420px] max-h-[90vh] overflow-y-auto relative">
                        <button
                            className="cursor-pointer absolute top-1 right-0.5 text-black hover:text-gray-700 text-4xl font-bold"
                            onClick={() => setSelectedBuku(null)}
                        >
                            ×
                        </button>

                        <h2 className="p-1 text-center text-lg font-semibold text-[#FF9500] underline">
                            Detail Rekomendasi Buku
                        </h2>

                        <div className="p-1 h-52 w-full flex justify-center items-center">
                            <img
                                src={selectedBuku.gambar}
                                alt=""
                                className="max-h-full object-contain rounded-xl"
                            />
                        </div>


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
                                <a
                                href={selectedBuku.tautan}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#FF9500] underline"
                                >
                                {selectedBuku.tautan}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </>
    )
}
export default TabelRekomendasiBuku