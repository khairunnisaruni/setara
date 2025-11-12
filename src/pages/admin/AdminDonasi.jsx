import { useState } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import DonasiTableSection from "../../sections/admin/DonasiTableSection"; // 🔸 tabel donasi
import Pagination from "../../components/admin/Pagination";
import AddDonasiModal from "../../components/admin/modals/Donasi/AddDonasi"; // 🔸 modal tambah donasi
import Success from "../../components/admin/modals/Success";
import Failed from "../../components/admin/modals/Failed";

const DonasiAdmin = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // ✅ Handle submit dari modal tambah donasi
  const handleAddSubmit = async (formData) => {
    try {
      console.log("📦 Data donasi baru:", formData);

      // Simulasi delay API request
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Tampilkan popup sukses
      setShowSuccessModal(true);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("❌ Gagal menambahkan donasi:", error);
      setShowFailedModal(true);
    }
  };

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
          <div className="flex flex-wrap border-b border-gray-100 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Donasi
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge="4"
            >
              Verifikasi Donasi
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

        {/* ===== Tabel Donasi ===== */}
        <DonasiTableSection activeTab={activeTab} search={search} />

        {/* ===== Pagination ===== */}
        <Pagination />

        {/* ===== Modal Tambah Donasi ===== */}
        <AddDonasiModal
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

export default DonasiAdmin;
