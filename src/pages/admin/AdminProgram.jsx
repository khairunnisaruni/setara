import { useState } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import ProgramTableSection from "../../sections/admin/ProgramTableSection"; // 🔸 tabel program
import Pagination from "../../components/admin/Pagination";
import AddProgramModal from "../../components/admin/modals/Program/AddProgram"; // 🔸 modal tambah program
import Success from "../../components/admin/modals/Success";
import Failed from "../../components/admin/modals/Failed";

const ProgramAdmin = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // ✅ Handle submit dari modal tambah program
  const handleAddSubmit = async (formData) => {
    try {
      console.log("📦 Data program baru:", formData);

      // Simulasi delay API request
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Tampilkan popup sukses
      setShowSuccessModal(true);
      setIsAddModalOpen(false);
    } catch (error) {
      setShowFailedModal(true);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* ===== Header Halaman ===== */}
        <h2 className="text-2xl font-bold text-gray-800">Program</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data program dalam sistem
        </p>

        {/* ===== Tabs ===== */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-wrap border-b border-gray-100 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Program
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge="3"
            >
              Verifikasi Program
            </TabButton>
          </div>
        </div>

        {/* ===== Toolbar: Search + Filter + Tambah ===== */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          onAddClick={() => setIsAddModalOpen(true)}
        />

        {/* ===== Tabel Program ===== */}
        <ProgramTableSection activeTab={activeTab} search={search} />

        {/* ===== Pagination ===== */}
        <Pagination />

        {/* ===== Modal Tambah Program ===== */}
        <AddProgramModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
        />

        {/* ===== Modal Sukses ===== */}
        {showSuccessModal && (
          <Success onClose={() => setShowSuccessModal(false)} />
        )}

        {/* ===== Modal Gagal ===== */}
        {showFailedModal && (
          <Failed onClose={() => setShowFailedModal(false)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default ProgramAdmin;
