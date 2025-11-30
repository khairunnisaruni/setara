import { useState, useEffect } from "react";
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

  const [pendingCount, setPendingCount] = useState(0);

  // Fungsi untuk mengambil jumlah data pending (Buat Badge)
  const fetchPendingCount = () => {
    fetch('http://localhost:3000/admin/programs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Hitung data yang statusnya 'pending'
          const count = data.filter(p => p.status === 'pending').length;
          setPendingCount(count);
        }
      })
      .catch(err => console.error("Gagal ambil count:", err));
  };

  useEffect(() => {
    fetchPendingCount();
  }, [activeTab]);

  // ✅ Handle submit dari modal tambah program
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // ✅ Handle submit dari modal tambah program
  const handleAddSubmit = async (formData) => {
    try {
      console.log("📦 Mengirim data program baru...", formData);

      // 1. Gunakan FormData untuk kirim file & teks
      const dataToSend = new FormData();

      // 2. Mapping Nama (Frontend English -> Backend Indo)
      // Pastikan nama di kiri sama persis dengan kolom Database
      dataToSend.append("judul_program", formData.title);
      dataToSend.append("penyelenggara", formData.organizer);
      dataToSend.append("jenis_program", formData.programType);
      dataToSend.append("lokasi_program", formData.location);
      dataToSend.append("deskripsi_program", formData.description);
      dataToSend.append("periode_tanggal", formData.period);
      dataToSend.append("deadline_pendaftaran", formData.deadline);
      dataToSend.append("status_program", formData.status || "Akan Datang");
      dataToSend.append("tautan_sumber_resmi", formData.link);

      // Cek file banner (poster)
      if (formData.banner) {
        dataToSend.append("poster", formData.banner);
      }

      // 3. Kirim ke Backend
      const response = await fetch('http://localhost:3000/admin/programs', {
        method: 'POST',
        // Jangan set Content-Type header manual untuk FormData
        body: dataToSend,
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan data ke server");
      }

      const result = await response.json();
      console.log("✅ Sukses:", result);

      // 4. Tampilkan Sukses & Trigger Refresh Tabel
      setShowSuccessModal(true);
      setIsAddModalOpen(false);
      setRefreshTrigger(prev => prev + 1); // <--- Tabel akan reload otomatis

    } catch (error) {
      console.error("❌ Gagal menambahkan donasi:", error);
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
          <div className="flex flex-wrap border-b border-gray-100 gap-x-5 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Program
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge={pendingCount > 0 ? pendingCount : null} // Tampilkan badge dinamis
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
        <ProgramTableSection activeTab={activeTab} search={search} refreshTrigger={refreshTrigger} />

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
