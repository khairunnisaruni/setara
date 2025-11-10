import { useState } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import TabButton from "../../components/admin/TabButton";
import BookToolbarSection from "../../sections/admin/BookToolbarSection";
import BookTableSection from "../../sections/admin/BookTableSelection";
import Pagination from "../../components/admin/Pagination";
import AddBookModal from "../../components/admin/modals/AddBuku"; // ✅ pastikan path ini benar

const Buku = () => {
  const [activeTab, setActiveTab] = useState("daftar");
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // ✅ modal state

  // ✅ handle submit dari modal
  const handleAddSubmit = (formData) => {
    console.log("Data buku baru:", formData);
    setIsAddModalOpen(false);
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
          <div className="flex flex-wrap border-b border-gray-100 px-4 py-2">
            <TabButton
              active={activeTab === "daftar"}
              onClick={() => setActiveTab("daftar")}
            >
              Daftar Rekomendasi Buku
            </TabButton>
            <TabButton
              active={activeTab === "verifikasi"}
              onClick={() => setActiveTab("verifikasi")}
              badge="5"
            >
              Verifikasi Rekomendasi Buku
            </TabButton>
          </div>
        </div>

        {/* Toolbar */}
        <BookToolbarSection
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          onAddClick={() => setIsAddModalOpen(true)} // ✅ buka modal
        />

        {/* Table */}
        <BookTableSection activeTab={activeTab} search={search} />

        {/* Pagination */}
        <Pagination />

        {/* ✅ Modal Tambah Buku */}
        <AddBookModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default Buku;
