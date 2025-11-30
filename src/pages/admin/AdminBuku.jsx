import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import BookTableSection from "../../sections/admin/BookTableSection"; // Tabel yang sudah ada CRUD-nya
import Pagination from "../../components/admin/Pagination";

const Buku = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  
  // 1. State untuk Badge Notifikasi
  const [pendingCount, setPendingCount] = useState(0);

  // 2. Fungsi Hitung Data Pending
  const fetchPendingCount = () => {
    fetch('http://localhost:3000/admin/buku') // Endpoint Buku
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter hanya yang statusnya 'pending'
          const count = data.filter(b => b.status === 'pending').length;
          setPendingCount(count);
        }
      })
      .catch(err => console.error("Gagal hitung pending:", err));
  };

  // 3. Jalankan saat halaman dibuka atau tab berubah
  useEffect(() => {
    fetchPendingCount();
  }, [activeTab]); 

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Rekomendasi Buku</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data rekomendasi buku dalam sistem
        </p>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-wrap border-b border-gray-100 gap-x-5 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Rekomendasi Buku
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              // 👇 Tampilkan Badge sesuai jumlah pending (hanya jika > 0)
              badge={pendingCount > 0 ? pendingCount : null}
            >
              Verifikasi Rekomendasi Buku
            </TabButton>
          </div>
        </div>

        {/* Toolbar: Search Only (Tombol Tambah sudah ada di dalam TableSection) */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
        />

        {/* Table: Mengurus semua CRUD (Add, Edit, Delete) */}
        <BookTableSection activeTab={activeTab} search={search} />

        {/* Pagination */}
        <Pagination />

      </div>
    </AdminLayout>
  );
};

export default Buku;