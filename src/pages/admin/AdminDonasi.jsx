import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import DonasiTableSection from "../../sections/admin/DonasiTableSection"; 
import Pagination from "../../components/admin/Pagination";

const DonasiAdmin = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  
  // 1. State untuk Badge Notifikasi
  const [pendingCount, setPendingCount] = useState(0);

  // 2. Fetch Data untuk hitung Badge (Real-time)
  const fetchPendingCount = () => {
    // Pastikan endpoint sesuai backend (/admin/donations)
    fetch('http://localhost:3000/admin/donations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Hitung data yang statusnya 'pending' (jika ada kolom status)
          // Jika donasi tidak ada status, logic ini bisa disesuaikan
          const count = data.filter(d => d.status === 'pending').length;
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
        {/* ===== Header Halaman ===== */}
        <h2 className="text-2xl font-bold text-gray-800">Donasi</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data donasi yang masuk ke sistem
        </p>

        {/* ===== Tabs ===== */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-wrap border-b border-gray-100 gap-x-5 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Donasi
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              // 👇 Tampilkan Badge sesuai jumlah pending
              badge={pendingCount > 0 ? pendingCount : null}
            >
              Verifikasi Donasi
            </TabButton>
          </div>
        </div>

        {/* ===== Toolbar: Search Only ===== */}
        {/* Tombol Tambah sudah ada di dalam DonasiTableSection */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
        />

        {/* ===== Tabel Donasi (Semua Logika CRUD ada di sini) ===== */}
        <DonasiTableSection activeTab={activeTab} search={search} />

        {/* ===== Pagination ===== */}
        <Pagination />

      </div>
    </AdminLayout>
  );
};

export default DonasiAdmin;