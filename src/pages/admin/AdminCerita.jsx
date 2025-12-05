import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import CeritaTableSection from "../../sections/admin/CeritaTableSection";
import Pagination from "../../components/admin/Pagination";

// ✅ 1. Import Modal
import AddCeritaModal from "../../components/admin/modals/Cerita/AddCerita"; // Sesuaikan path
import SuccessModal from "../../components/admin/modals/Success";
import FailedModal from "../../components/admin/modals/Failed";

const Cerita = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  
  // State Badge
  const [pendingCount, setPendingCount] = useState(0);

  // ✅ 2. State untuk Modal & Refresh
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch Badge
  const fetchPendingCount = () => {
    fetch('http://localhost:5000/admin/stories')
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
  }, [activeTab, refreshTrigger]); // Update badge jika ada data baru

  // ✅ 3. Fungsi Submit ke Backend
  const handleAddSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/admin/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal upload cerita");

      // Jika Sukses
      setRefreshTrigger(prev => prev + 1); // Refresh tabel
      setIsAddModalOpen(false);            // Tutup form
      setShowSuccessModal(true);           // Munculkan sukses

    } catch (error) {
      console.error(error);
      setIsAddModalOpen(false);
      setShowFailedModal(true);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Cerita Lapangan</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data cerita lapangan.
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
              badge={pendingCount > 0 ? pendingCount : null}
            >
              Verifikasi Cerita
            </TabButton>
          </div>
        </div>

        {/* Toolbar */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          // ✅ 4. Pasang Trigger Buka Modal Disini
          onAddClick={() => setIsAddModalOpen(true)}
        />

        {/* Table - Jangan lupa kirim refreshTrigger */}
        <CeritaTableSection 
            activeTab={activeTab} 
            search={search} 
            refreshTrigger={refreshTrigger} 
        />

        <Pagination />

        {/* ✅ 5. Pasang Komponen Modal Disini */}
        <AddCeritaModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
        />

        {showSuccessModal && (
          <SuccessModal 
            isOpen={showSuccessModal} 
            onClose={() => setShowSuccessModal(false)} 
          />
        )}

        {showFailedModal && (
          <FailedModal 
            isOpen={showFailedModal} 
            onClose={() => setShowFailedModal(false)} 
          />
        )}

      </div>
    </AdminLayout>
  );
};

export default Cerita;