import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import DonasiTableSection from "../../sections/admin/DonasiTableSection";
import Pagination from "../../components/admin/Pagination";
// Import Modal yang baru kita buat (kode ada di bawah)
import AddDonasiModal from "../../components/admin/modals/Donasi/AddDonasi"; 
import Success from "../../components/admin/modals/Success";
import Failed from "../../components/admin/modals/Failed";

const DonasiAdmin = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  
  // State Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // State Data & Trigger
  const [pendingCount, setPendingCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Supaya tabel refresh setelah tambah

  // 1. Hitung Badge Pending
  useEffect(() => {
    fetch('http://localhost:3000/admin/donations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const count = data.filter(d => d.status === 'pending').length;
          setPendingCount(count);
        }
      })
      .catch(console.error);
  }, [activeTab, refreshTrigger]);

  // ✅ Handle submit dari modal tambah donasi (POST API)
  const handleAddSubmit = async (formDataFromModal) => {
    try {
      console.log("📦 Mengirim Data Donasi...", formDataFromModal);

      // Gunakan FormData karena ada upload file (poster)
      const dataToSend = new FormData();
      
      // Append semua text field
      dataToSend.append("title", formDataFromModal.title);
      dataToSend.append("kategori", formDataFromModal.kategori);
      dataToSend.append("penerima_manfaat", formDataFromModal.penerima_manfaat);
      dataToSend.append("description", formDataFromModal.description);
      dataToSend.append("dampak", formDataFromModal.dampak);
      dataToSend.append("link", formDataFromModal.link);
      dataToSend.append("penanggung_jawab", formDataFromModal.penanggung_jawab);
      dataToSend.append("contact_person", formDataFromModal.contact_person);

      // Append File (Poster) - Pastikan key 'poster' sesuai dengan backend upload.single('poster')
      if (formDataFromModal.poster) {
        dataToSend.append("poster", formDataFromModal.poster);
      }

      // Fetch POST
      const response = await fetch('http://localhost:3000/admin/donations', {
        method: 'POST',
        body: dataToSend, // Header Content-Type akan otomatis di-set browser
      });

      if (!response.ok) throw new Error("Gagal upload donasi");

      // Jika berhasil
      setRefreshTrigger(prev => prev + 1); // Trigger tabel biar update
      setShowSuccessModal(true);
      setIsAddModalOpen(false); // Tutup modal tambah

    } catch (error) {
      console.error("❌ Gagal menambahkan donasi:", error);
      setShowFailedModal(true);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Donasi</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data donasi yang masuk ke sistem
        </p>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-wrap border-b border-gray-100 gap-x-5 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Donasi
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge={pendingCount > 0 ? pendingCount : null}
            >
              Verifikasi Donasi
            </TabButton>
          </div>
        </div>

        {/* Toolbar - onAddClick membuka modal */}
        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          onAddClick={() => setIsAddModalOpen(true)} 
        />

        {/* Table - Menerima refreshTrigger */}
        <DonasiTableSection 
            activeTab={activeTab} 
            search={search} 
            refreshTrigger={refreshTrigger} 
        />

        {/* Pagination */}
        <Pagination />

        {/* ✅ Modal Tambah Donasi */}
        <AddDonasiModal
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

export default DonasiAdmin;