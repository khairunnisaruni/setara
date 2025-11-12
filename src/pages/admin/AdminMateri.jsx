import { useState } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import MateriTableSection from "../../sections/admin/MateriTableSection";
import Pagination from "../../components/admin/Pagination";
import AddMateriModal from "../../components/admin/modals/Materi/AddMateri";
import Success from "../../components/admin/modals/Success";
import Failed from "../../components/admin/modals/Failed";

const Materi = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // ✅ handle submit dari modal tambah materi
  const handleAddSubmit = async (formData) => {
    try {
      console.log("Data materi baru:", formData);

      // simulasi proses API
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
        <h2 className="text-2xl font-bold text-gray-800">Materi Multimedia</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data materi dalam sistem
        </p>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-wrap border-b border-gray-100 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Materi
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge="5"
            >
              Verifikasi Materi
            </TabButton>
          </div>
        </div>

        {/* Toolbar */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          onAddClick={() => setIsAddModalOpen(true)} // buka modal
        />

        {/* Table */}
        <MateriTableSection activeTab={activeTab} search={search} />

        {/* Pagination */}
        <Pagination />

        {/* ✅ Modal Tambah Materi */}
        <AddMateriModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
        />

        {/* ✅ Modal Sukses */}
        {showSuccessModal && (
          <Success onClose={() => setShowSuccessModal(false)} />
        )}

        {/* ✅ Modal Gagal */}
        {showFailedModal && (
          <Failed onClose={() => setShowFailedModal(false)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default Materi;
