import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import QuizTableSection from "../../sections/admin/QuizTableSection"; 
import Pagination from "../../components/admin/Pagination";

// ✅ 1. Import Modal-modalnya
import AddQuizModal from "../../components/admin/modals/Quiz/AddQuiz"; // Pastikan path benar
import SuccessModal from "../../components/admin/modals/Success";
import FailedModal from "../../components/admin/modals/Failed";

const KuisGame = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  
  const [pendingCount, setPendingCount] = useState(0);
  
  // ✅ 2. Tambahkan State Modal & Refresh
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch Pending Count
  useEffect(() => {
    fetch('http://localhost:3000/admin/quiz')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const count = data.filter(item => item.status === 'pending').length;
          setPendingCount(count);
        }
      })
      .catch(err => console.error("Gagal hitung pending kuis:", err));
  }, [activeTab, refreshTrigger]);

  // ✅ 3. Fungsi Submit ke Backend
  const handleAddSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/admin/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal tambah kuis");

      // Jika Sukses
      setRefreshTrigger(prev => prev + 1);
      setIsAddModalOpen(false);
      setShowSuccessModal(true);

    } catch (error) {
      console.error(error);
      setIsAddModalOpen(false);
      setShowFailedModal(true);
    }
  };

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
              badge={pendingCount > 0 ? pendingCount : null}
            >
              Verifikasi Kuis & Game
            </TabButton>
          </div>
        </div>

        {/* ✅ 4. Toolbar: Pasang onAddClick */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          onAddClick={() => setIsAddModalOpen(true)} // Pemicu Modal
        />

        {/* Table */}
        <QuizTableSection 
            activeTab={activeTab} 
            search={search} 
            refreshTrigger={refreshTrigger}
        />

        <Pagination />
        
        {/* ✅ 5. Render Modal Disini */}
        <AddQuizModal 
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

export default KuisGame;