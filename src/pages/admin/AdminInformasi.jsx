import { useState } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import InformasiToolbarSection from "../../sections/admin/InformasiToolbarSection";
import InformasiTableSection from "../../sections/admin/InformasiTableSection";
import Pagination from "../../components/admin/Pagination";

import AddInformasiModal from "../../components/admin/modals/Informasi/AddInformasi";
import SuccessModal from "../../components/admin/modals/Success";
import FailedModal from "../../components/admin/modals/Failed";

const Informasi = () => {
  const [search, setSearch] = useState("");
  
  // State Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // State Refresh
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddSubmit = async (dataInput) => {
    try {
      console.log("📦 Mengirim...", dataInput);

      const response = await fetch('http://localhost:5000/admin/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataInput),
      });

      if (!response.ok) throw new Error("Gagal menambah panduan");

      console.log("✅ Berhasil! Membuka modal sukses..."); // Cek log ini di browser

      // Update State
      setRefreshTrigger(prev => prev + 1); 
      setIsAddModalOpen(false); 
      setShowSuccessModal(true); // Logic sudah benar di sini

    } catch (error) {
      console.error("❌ Error:", error);
      setIsAddModalOpen(false);
      setShowFailedModal(true);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Informasi & Panduan</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data informasi.
        </p>

        <InformasiToolbarSection
          search={search}
          setSearch={setSearch}
          onAddClick={() => setIsAddModalOpen(true)} 
        />

        <InformasiTableSection 
            search={search} 
            refreshTrigger={refreshTrigger} 
        />

        <Pagination />

        <AddInformasiModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
        />

        {/* 👇 PERBAIKAN DI SINI: Tambahkan props isOpen */}
        {showSuccessModal && (
            <SuccessModal 
                isOpen={showSuccessModal}  // <--- TAMBAHKAN INI
                onClose={() => setShowSuccessModal(false)} 
            />
        )}

        {/* 👇 PERBAIKAN DI SINI: Tambahkan props isOpen */}
        {showFailedModal && (
            <FailedModal 
                isOpen={showFailedModal}   // <--- TAMBAHKAN INI
                onClose={() => setShowFailedModal(false)} 
            />
        )}
      </div>
    </AdminLayout>
  );
};

export default Informasi;