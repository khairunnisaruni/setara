import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import ToolbarSection from "../../sections/admin/ToolbarSection";
import BookTableSection from "../../sections/admin/BookTableSection"; 
import Pagination from "../../components/admin/Pagination";

// Import Modal
import AddBookModal from "../../components/admin/modals/Buku/AddBuku"; 
import SuccessModal from "../../components/admin/modals/Success";
import FailedModal from "../../components/admin/modals/Failed";

const Buku = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  const [pendingCount, setPendingCount] = useState(0);

  // State Modal & Refresh
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  
  // Refresh Trigger untuk memberitahu TableSection agar reload data
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch Pending Count
  useEffect(() => {
    fetch('http://localhost:3000/admin/buku') 
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const count = data.filter(b => b.status === 'pending').length;
          setPendingCount(count);
        }
      })
      .catch(err => console.error("Gagal hitung pending:", err));
  }, [activeTab, refreshTrigger]); 

  // ✅ FUNGSI SUBMIT YANG SUDAH DIPERBAIKI
  const handleAddSubmit = async (formData) => {
    try {
      console.log("📦 Mengirim Data Buku...", formData);

      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("author", formData.author);
      dataToSend.append("description", formData.description);
      dataToSend.append("link", formData.link);
      
      // 🔥 PERBAIKAN: Gunakan 'kategori_id' (bukan category)
      if(formData.kategori_id) {
          dataToSend.append("kategori_id", formData.kategori_id);
      } else {
          alert("Pilih kategori dulu!");
          return;
      }
      
      // 🔥 PERBAIKAN: Gunakan 'gambar' (bukan cover/file)
      if (formData.gambar) {
        dataToSend.append("gambar", formData.gambar); 
      }

      const response = await fetch('http://localhost:3000/admin/buku', {
        method: 'POST',
        body: dataToSend, 
      });

      if (!response.ok) throw new Error("Gagal upload buku");

      // Jika Sukses:
      setRefreshTrigger(prev => prev + 1); // Refresh Tabel
      setIsAddModalOpen(false); // Tutup Modal Form
      setShowSuccessModal(true); // Tampilkan Modal Sukses

    } catch (error) {
      console.error(error);
      setIsAddModalOpen(false); // Tutup Modal Form
      setShowFailedModal(true); // Tampilkan Modal Gagal
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Rekomendasi Buku</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau seluruh data rekomendasi buku dalam sistem
        </p>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 w-full">
          <div className="flex flex-wrap border-b border-gray-100 gap-x-5 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Rekomendasi Buku
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge={pendingCount > 0 ? pendingCount : null}
            >
              Verifikasi Rekomendasi Buku
            </TabButton>
          </div>
        </div>

        <ToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          onAddClick={() => setIsAddModalOpen(true)} 
        />

        {/* Kirim refreshTrigger ke TableSection */}
        <BookTableSection 
            activeTab={activeTab} 
            search={search} 
            key={refreshTrigger} // Trik React: Ganti key agar komponen re-render/fetch ulang
        />

        <Pagination />

        {/* Modal Tambah */}
        <AddBookModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onSubmit={handleAddSubmit}
        />

        {/* Modal Notifikasi */}
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

export default Buku;