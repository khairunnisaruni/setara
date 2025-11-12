import { useState } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import QuizTableSection from "../../sections/admin/QuizTableSection"; // 🔸 ganti dari BookTableSection
import Pagination from "../../components/admin/Pagination";
import AddQuizModal from "../../components/admin/modals/Quiz/AddQuiz"; // 🔸 modal baru
import Success from "../../components/admin/modals/Success";
import Failed from "../../components/admin/modals/Failed";

const KuisGame = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // ✅ handle submit dari modal tambah kuis
  const handleAddSubmit = async (formData) => {
    try {
      console.log("Data kuis & game baru:", formData);

      // simulasi request API
      await new Promise((resolve) => setTimeout(resolve, 800));

      setShowSuccessModal(true);
      setIsAddModalOpen(false);
    } catch (error) {
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
          <div className="flex flex-wrap border-b border-gray-100 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Kuis & Game
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge="5"
            >
              Verifikasi Kuis & Game
            </TabButton>
          </div>
        </div>

        {/* Toolbar: Search + Filter + Tambah */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        {/* Tabel Daftar / Verifikasi */}
        <QuizTableSection activeTab={activeTab} search={search} />

        {/* Pagination */}
        <Pagination />

        {/* Modal Tambah Kuis & Game */}
        <AddQuizModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
        />

        {/* Modal Sukses */}
        {showSuccessModal && (
          <Success onClose={() => setShowSuccessModal(false)} />
        )}

        {/* Modal Gagal */}
        {showFailedModal && <Failed onClose={() => setShowFailedModal(false)} />}
      </div>
    </AdminLayout>
  );
};

export default KuisGame;
