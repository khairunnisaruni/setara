import { useState } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import CeritaTableSection from "../../sections/admin/CeritaTableSection";
import Pagination from "../../components/admin/Pagination";
import AddCeritaModal from "../../components/admin/modals/Cerita/AddCerita";
import Success from "../../components/admin/modals/Success";
import Failed from "../../components/admin/modals/Failed";

const Cerita = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // ✅ Handle submit dari modal tambah cerita
  const handleAddSubmit = async (formData) => {
    try {
      console.log("Data cerita baru:", formData);

      // Simulasi request ke API
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Jika berhasil
      setShowSuccessModal(true);
      setIsAddModalOpen(false);
    } catch (error) {
      // Jika gagal
      setShowFailedModal(true);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800">Cerita Inspiratif</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data cerita inspiratif yang dikirim oleh pengguna
        </p>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-wrap border-b border-gray-100 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Cerita
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge="3"
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
          onAddClick={() => setIsAddModalOpen(true)} // buka modal tambah
        />

        {/* Table Cerita */}
        <CeritaTableSection activeTab={activeTab} search={search} />

        {/* Pagination */}
        <Pagination />

        {/* Modal Tambah Cerita */}
        <AddCeritaModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
        />

        {/* Modal Sukses */}
        {showSuccessModal && (
          <Success onClose={() => setShowSuccessModal(false)} />
        )}

        {/* Modal Gagal */}
        {showFailedModal && (
          <Failed onClose={() => setShowFailedModal(false)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default Cerita;
