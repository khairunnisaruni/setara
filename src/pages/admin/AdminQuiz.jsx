import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import QuizTableSection from "../../sections/admin/QuizTableSection"; 
import Pagination from "../../components/admin/Pagination";

const KuisGame = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  
  // 1. State untuk Badge & Refresh Trigger
  const [pendingCount, setPendingCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Sinyal update dari child

  // 2. Fetch Jumlah Pending (Real-time dari DB)
  useEffect(() => {
    fetch('http://localhost:3000/admin/quiz') // Pastikan endpoint backend benar
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Hitung data yang statusnya 'pending'
          const count = data.filter(item => item.status === 'pending').length;
          setPendingCount(count);
        }
      })
      .catch(err => console.error("Gagal hitung pending kuis:", err));
  }, [activeTab, refreshTrigger]); // Refresh saat tab ganti atau ada trigger baru

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Kuis & Game</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data kuis dan game dalam sistem
        </p>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-wrap border-b border-gray-100 gap-x-5 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Kuis & Game
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              // 🔥 Badge Dinamis (Bukan angka 5 lagi)
              badge={pendingCount > 0 ? pendingCount : null}
            >
              Verifikasi Kuis & Game
            </TabButton>
          </div>
        </div>

        {/* Toolbar: Tombol Tambah diurus oleh TableSection */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
        />

        {/* Table: Mengurus semua CRUD (Add, Edit, Delete) */}
        {/* Kita kirim setRefreshTrigger agar tabel bisa update badge di sini */}
        <QuizTableSection 
            activeTab={activeTab} 
            search={search} 
            refreshTrigger={refreshTrigger}
            setRefreshTrigger={setRefreshTrigger}
        />

        <Pagination />
        
      </div>
    </AdminLayout>
  );
};

export default KuisGame;