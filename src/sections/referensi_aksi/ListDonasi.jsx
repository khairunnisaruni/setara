// src/sections/referensi_aksi/ListDonasi.jsx
import React, { useEffect, useState } from "react";
import DonasiCard from "../../components/referensi_aksi/DonasiCard";

// fallback kalau fetch error / belum ada data
const DONASI_DUMMY = [
  {
    id: 1,
    title: "Donasi Buku & Alat Tulis SD SDN 09 Sipirok",
    location: "SDN 09 Sipirok Tapanuli Selatan, Sumatera Utara",
    description:
      "Banyak sekolah belum memiliki sarapan, peralatan belajar lengkap dan alat olahraga. Donasi ini bertujuan mendukung partisipasi mereka.",
    category: "Edukasi dan Literasi",
    status: "Sedang Berjalan",
    link: "#",
    image: "src/assets/DonasiBuku.png",
  },
];

const mapKategoriLabel = (kategori) => {
  // kolom enum di DB sudah pakai teks lengkap, kita pakai langsung saja
  return kategori || "Edukasi dan Literasi";
};

const mapStatusLabel = (rowStatus) => {
  // status di DB: pending / approved / rejected
  // status yang tampil di kartu: Sedang Berjalan / Akan Datang / Selesai
  if (rowStatus === "approved") return "Sedang Berjalan";
  if (rowStatus === "pending") return "Akan Datang";
  if (rowStatus === "rejected") return "Selesai";
  return "Sedang Berjalan";
};

const ListDonasi = ({
  searchText = "",
  jenis = "Semua",
  status = "Semua",
}) => {
  const [donasi, setDonasi] = useState([]);

  // ambil donasi yang sudah approved dari backend
  useEffect(() => {
    const fetchApprovedDonasi = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donasi/approved");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal mengambil donasi approved");
        }

        const mapped = data.map((row) => ({
          id: row.id,
          title: row.title,
          location: row.penerima_manfaat || "",
          description: row.description || "",
          category: mapKategoriLabel(row.kategori),
          status: mapStatusLabel(row.status),
          link: row.link || "#",
          // kalau sudah implement upload poster: sesuaikan path-nya
          image: row.poster
            ? `http://localhost:5000/uploads/donasi/${row.poster}`
            : "src/assets/DonasiBuku.png",
        }));

        setDonasi(mapped);
      } catch (err) {
        console.error("Gagal fetch donasi approved:", err);
        // fallback ke dummy kalau error
        setDonasi(DONASI_DUMMY);
      }
    };

    fetchApprovedDonasi();
  }, []);

  const source = donasi.length > 0 ? donasi : DONASI_DUMMY;

  const filteredDonasi = source.filter((item) => {
    // filter dropdown jenis
    const matchJenis = jenis === "Semua" || item.category === jenis;
    // filter dropdown status
    const matchStatus = status === "Semua" || item.status === status;

    // filter teks (judul, lokasi, deskripsi, kategori)
    const q = searchText.trim().toLowerCase();
    const matchSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);

    return matchJenis && matchStatus && matchSearch;
  });

  return (
    <section id="daftar-donasi" className="max-w-7xl mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 justify-items-center">
        {filteredDonasi.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500">
            Tidak ada program donasi yang cocok dengan filter ini.
          </div>
        ) : (
          filteredDonasi.map((item) => <DonasiCard key={item.id} data={item} />)
        )}
      </div>
    </section>
  );D
};

export default ListDonasi;
