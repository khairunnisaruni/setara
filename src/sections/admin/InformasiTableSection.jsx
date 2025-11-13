import { useState } from "react";
import TableActionsOther from "../../components/admin/TableActionsOther";
import DetailInformasi from "../../components/admin/modals/Informasi/DetailInformasi";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";
import AddInformasiModal from "../../components/admin/modals/Informasi/AddInformasi";

const InformasiTableSection = ({ search = "" }) => {
  const [showDetailInformasi, setShowDetailInformasi] = useState(false);
  const [selectedInformasi, setSelectedInformasi] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // 🧩 Data dummy
  const informasiList = [
    {
      id: 1,
      judul: "Cara Menggunakan Aplikasi BoycottBuddy",
      deskripsi:
        "Panduan ini menjelaskan langkah-langkah menggunakan fitur utama aplikasi, mulai dari pencarian produk hingga memahami hasil deteksi merek.",
    },
    {
      id: 2,
      judul: "Menambahkan Produk ke Daftar Boikot",
      deskripsi:
        "Langkah-langkah untuk menambahkan produk baru ke daftar boikot agar pengguna lain juga dapat mengetahuinya.",
    },
  ];

  // 🔍 Filter berdasarkan pencarian
  const filteredInformasi = informasiList.filter((info) =>
    info.judul.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Saat klik tombol lihat detail
  const handleView = (info) => {
    setSelectedInformasi(info);
    setShowDetailInformasi(true);
  };

  // 🗑️ Saat klik tombol hapus
  const handleDelete = (info) => {
    setSelectedInformasi(info);
    setShowDeleteConfirm(true);
  };

  // ✅ Konfirmasi hapus
  const handleConfirmDelete = () => {
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
    console.log("Informasi dihapus:", selectedInformasi);
  };

  // ➕ Tambah informasi baru
  const handleAddInformasi = (newInfo) => {
    console.log("Informasi baru ditambahkan:", newInfo);
    setShowAddModal(false);
  };

  return (
    <>
      {/* === TABEL INFORMASI === */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="border-b border-gray-100">
              <th className="p-3 w-12 font-semibold text-center">No</th>
              <th className="p-3 w-1/3 font-semibold">Judul Panduan</th>
              <th className="p-3 w-1/2 font-semibold">Deskripsi</th>
              <th className="p-3 w-24 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredInformasi.map((info, i) => (
              <tr
                key={info.id}
                className="border-b border-gray-200 last:border-none hover:bg-amber-50 transition-colors duration-150"
              >
                <td className="py-4 px-3 text-gray-600 text-center">{i + 1}</td>
                <td className="py-4 px-3 text-gray-800 font-medium">
                  {info.judul}
                </td>
                <td className="py-4 px-3 text-gray-600">
                  {info.deskripsi.length > 70
                    ? info.deskripsi.slice(0, 70) + "..."
                    : info.deskripsi}
                </td>
                <td className="py-4 px-3 text-center">
                  <TableActionsOther
                    onView={() => handleView(info)}
                    onDelete={() => handleDelete(info)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredInformasi.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm">
            Tidak ada panduan ditemukan.
          </div>
        )}
      </div>

      {/* === MODAL DETAIL INFORMASI === */}
      <DetailInformasi
        isOpen={showDetailInformasi}
        onClose={() => setShowDetailInformasi(false)}
        informasi={selectedInformasi}
      />

      {/* === MODAL KONFIRMASI HAPUS === */}
      <KonfirmasiHapus
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* === MODAL BERHASIL DIHAPUS === */}
      <SuccessDeleteModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />

      {/* === MODAL TAMBAH INFORMASI === */}
      <AddInformasiModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddInformasi}
      />
    </>
  );
};

export default InformasiTableSection;
