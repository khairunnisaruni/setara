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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // ✅ Handle submit dari modal tambah informasi
  const handleAddSubmit = async (formData) => {
    try {
      console.log("Data informasi baru:", formData);

      // Simulasi delay request API
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
        {/* === HEADER === */}
        <h2 className="text-2xl font-bold text-gray-800">Informasi</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data informasi yang dibagikan kepada pengguna.
        </p>

        {/* === TOOLBAR === */}
        <InformasiToolbarSection
          search={search}
          setSearch={setSearch}
          onAddClick={() => setIsAddModalOpen(true)} // buka modal tambah
        />

        {/* === TABEL INFORMASI === */}
        <InformasiTableSection search={search} />

        {/* === PAGINATION === */}
        <Pagination />

        {/* === MODAL TAMBAH INFORMASI === */}
        <AddInformasiModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
        />

        {/* === MODAL SUKSES === */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />

        {/* === MODAL GAGAL === */}
        <FailedModal
          isOpen={showFailedModal}
          onClose={() => setShowFailedModal(false)}
        />
      </div>
    </AdminLayout>
  );
};

export default Informasi;
