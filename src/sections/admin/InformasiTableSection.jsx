import { useState, useEffect } from "react";
import TableActionsOther from "../../components/admin/TableActionsOther";

// Import Modal Edit & Delete Saja (Add sudah di Parent)
import DetailInformasi from "../../components/admin/modals/Informasi/DetailInformasi"; 
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";
import EditInformasiModal from "../../components/admin/modals/Informasi/EditInformasi"; // Pastikan nama file edit ini benar

// 👇 TERIMA refreshTrigger DARI PARENT
const InformasiTableSection = ({ search, refreshTrigger }) => {
  const [panduanList, setPanduanList] = useState([]);
  const [selectedInformasi, setSelectedInformasi] = useState(null);

  // State Modal
  const [showDetailInformasi, setShowDetailInformasi] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // 1. FETCH DATA (GET)
  const fetchPanduan = () => {
    fetch('http://localhost:3000/admin/info')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
             // Mapping DB (judul_panduan) -> UI (judul)
             const formatted = data.map(item => ({
                 id: item.id,
                 judul: item.judul_panduan,
                 deskripsi: item.deskripsi_panduan,
                 
                 // Simpan data asli untuk keperluan Edit
                 judul_panduan: item.judul_panduan,
                 deskripsi_panduan: item.deskripsi_panduan
             }));
             setPanduanList(formatted);
        } else {
             setPanduanList([]);
        }
      })
      .catch(err => console.error("Gagal ambil panduan:", err));
  };

  // 👇 REFRESH DATA SAAT PARENT NAMBAH DATA
  useEffect(() => {
    fetchPanduan();
  }, [refreshTrigger]);

  // Filter berdasarkan pencarian
  const filteredInformasi = panduanList.filter((info) =>
    info.judul.toLowerCase().includes(search.toLowerCase())
  );

  // === HANDLERS ===
  const handleView = (info) => {
    setSelectedInformasi(info);
    setShowDetailInformasi(true);
  };

  const handleEdit = (info) => {
    setSelectedInformasi(info);
    setShowEditModal(true);
  };

  const handleDelete = (info) => {
    setSelectedInformasi(info);
    setShowDeleteConfirm(true);
  };

  // === 🔥 LOGIKA UPDATE (EDIT ONLY) ===
  const handleEditSubmit = (formData) => {
    if (!selectedInformasi) return;

    // Mapping balik ke nama kolom DB
    const dataToSend = {
        judul_panduan: formData.judul_panduan, 
        deskripsi_panduan: formData.deskripsi_panduan
    };
    
    const url = `http://localhost:3000/admin/info/${selectedInformasi.id}`;

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
    })
    .then(res => res.json())
    .then(() => {
        console.log("Sukses Update");
        fetchPanduan(); // Refresh tabel lokal
        setShowEditModal(false);
    })
    .catch(console.error);
  };

  // === 🔥 LOGIKA DELETE ===
  const handleConfirmDelete = () => {
    if (!selectedInformasi) return;

    fetch(`http://localhost:3000/admin/info/${selectedInformasi.id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => {
        setPanduanList(panduanList.filter(p => p.id !== selectedInformasi.id));
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
    })
    .catch(console.error);
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
            {filteredInformasi.length === 0 ? (
                 <tr><td colSpan="4" className="text-center py-6 text-gray-500">Tidak ada panduan ditemukan.</td></tr>
            ) : (
                filteredInformasi.map((info, i) => (
                <tr
                    key={info.id}
                    className="border-b border-gray-200 last:border-none hover:bg-amber-50 transition-colors duration-150"
                >
                    <td className="py-4 px-3 text-gray-600 text-center">{i + 1}</td>
                    <td className="py-4 px-3 text-gray-800 font-medium">{info.judul}</td>
                    <td className="py-4 px-3 text-gray-600">
                    {info.deskripsi.length > 70
                        ? info.deskripsi.slice(0, 70) + "..."
                        : info.deskripsi}
                    </td>
                    <td className="py-4 px-3 text-center">
                    <TableActionsOther
                        onView={() => handleView(info)}
                        onEdit={() => handleEdit(info)} 
                        onDelete={() => handleDelete(info)}
                    />
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* === MODAL DETAIL === */}
      <DetailInformasi
        isOpen={showDetailInformasi}
        onClose={() => setShowDetailInformasi(false)}
        informasi={selectedInformasi}
      />

      {/* === MODAL EDIT (Hanya Edit) === */}
      <EditInformasiModal
        key={selectedInformasi ? selectedInformasi.id : "edit"}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedInformasi}
      />

      {/* === MODAL HAPUS === */}
      <KonfirmasiHapus
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
      />

      <SuccessDeleteModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />
    </>
  );
};

export default InformasiTableSection;