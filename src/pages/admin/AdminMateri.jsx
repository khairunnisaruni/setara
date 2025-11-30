import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import MateriTableSection from "../../sections/admin/MateriTableSection";
import Pagination from "../../components/admin/Pagination";
import AddMateriModal from "../../components/admin/modals/Materi/AddMateri"; // Gunakan EditMateriModal yang kita buat tadi (bisa untuk Add)
import Success from "../../components/admin/modals/Success";
import Failed from "../../components/admin/modals/Failed";

const Materi = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  
  // State Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  // State Data & Trigger
  const [pendingCount, setPendingCount] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Agar tabel refresh setelah tambah

  // 1. Hitung Badge Pending
  useEffect(() => {
    fetch('http://localhost:3000/admin/materials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const count = data.filter(m => m.status === 'pending').length;
          setPendingCount(count);
        }
      })
      .catch(console.error);
  }, [activeTab, refreshTrigger]);

  // ✅ Handle submit dari modal tambah materi (POST API)
  const handleAddSubmit = async (formData) => {
    try {
      console.log("📦 Mengirim Data Baru...", formData);

      // Gunakan FormData karena ada upload file
      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("description", formData.description);
      dataToSend.append("file_type", formData.file_type);
      dataToSend.append("kategori_id", formData.kategori_id);
      dataToSend.append("kategori_kelas_id", formData.kategori_kelas_id);

      // Logika File vs Link
      if (formData.file_type === 'video') {
          dataToSend.append("youtube_link", formData.youtube_link);
      } else if (formData.file_material) {
          dataToSend.append("file_material", formData.file_material);
      }

      // Fetch POST
      const response = await fetch('http://localhost:3000/admin/materials', {
        method: 'POST',
        body: dataToSend,
      });

      if (!response.ok) throw new Error("Gagal upload");

      // Jika berhasil
      setRefreshTrigger(prev => prev + 1); // Trigger tabel biar update
      setShowSuccessModal(true);
      setIsAddModalOpen(false);

    } catch (error) {
      console.error("❌ Gagal menambahkan materi:", error);
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
          <div className="flex flex-wrap border-b border-gray-100 gap-x-5 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Materi
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge={pendingCount > 0 ? pendingCount : null}
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

        {/* Table - Kirim refreshTrigger agar tabel update saat data ditambah */}
        <MateriTableSection activeTab={activeTab} search={search} refreshTrigger={refreshTrigger} />

        {/* Pagination */}
        <Pagination />

        {/* ✅ Modal Tambah Materi (Pakai komponen EditMateriModal yg kita buat tpi dipanggil sebagai Add) */}
        <AddMateriModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
          initialData={null} // Null artinya mode Tambah
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