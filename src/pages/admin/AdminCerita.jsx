import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import CeritaTableSection from "../../sections/admin/CeritaTableSection";
import Pagination from "../../components/admin/Pagination";

const Cerita = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  
  // 1. State untuk Badge Notifikasi (Pending Count)
  const [pendingCount, setPendingCount] = useState(0);

  // 2. Fetch Data untuk menghitung Badge
  const fetchPendingCount = () => {
    fetch('http://localhost:3000/admin/stories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const count = data.filter(c => c.status === 'pending').length;
          setPendingCount(count);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchPendingCount();
  }, [activeTab]); // Refresh saat tab berubah

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800">Cerita Lapangan</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data cerita lapangan yang masuk
        </p>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-wrap border-b border-gray-100 gap-x-5 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Cerita
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              // Badge Dinamis
              badge={pendingCount > 0 ? pendingCount : null}
            >
              Verifikasi Cerita
            </TabButton>
          </div>
        </div>

        {/* Toolbar: Search Only (Tombol Tambah ada di TableSection) */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
        />

        {/* Table Cerita (Mengurus semua CRUD: Add, Edit, Delete, Status) */}
        <CeritaTableSection activeTab={activeTab} search={search} />

        {/* Pagination */}
        <Pagination />

      </div>
    </AdminLayout>
  );
};

export default Cerita;