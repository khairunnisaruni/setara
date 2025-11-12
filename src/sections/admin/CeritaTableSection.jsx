import { useState } from "react";
import TableActions from "../../components/admin/TableActions";

// Semua modal
import DetailCerita from "../../components/admin/modals/Cerita/DetailCerita";
import DetailVerifikasiCerita from "../../components/admin/modals/Cerita/DetailVerifikasiCerita";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditCeritaModal from "../../components/admin/modals/Cerita/EditCerita";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const CeritaTableSection = ({ activeTab, search }) => {
  const [selectedCerita, setSelectedCerita] = useState(null);

  // Semua state modal
  const [showDetailCerita, setShowDetailCerita] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditCeritaModal, setShowEditCeritaModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // ====== Data Dummy ======
  const daftarCerita = [
    {
      id: 1,
      judul: "Langkah Kecil Menuju Mimpi",
      deskripsi:
        "Cerita inspiratif tentang seorang anak kecil yang berjuang menggapai mimpinya di tengah keterbatasan.",
      penulis: "Agus Saputra",
    },
    {
      id: 2,
      judul: "Hujan di Kota Sunyi",
      deskripsi:
        "Kisah tentang rindu, kehilangan, dan pertemuan kembali di bawah rintik hujan.",
      penulis: "Rara Febriyanti",
    },
    {
      id: 3,
      judul: "Cahaya di Balik Gelap",
      deskripsi:
        "Sebuah kisah yang menggambarkan perjuangan seseorang menemukan arti harapan dalam masa-masa sulit.",
      penulis: "Bima Alamsyah",
    },
  ];

  const verifikasiCerita = daftarCerita.map((c) => ({
    ...c,
    submitter: "khairuntes", // otomatis dari akun yang submit
    date: "12-11-2025",
  }));

  const data = activeTab === "daftar" ? daftarCerita : verifikasiCerita;

  // ====== Handler ======
  const handleView = (cerita) => {
    setSelectedCerita(cerita);
    if (activeTab === "daftar") setShowDetailCerita(true);
    else setShowDetailVerifikasi(true);
  };

  const handleApprove = (cerita) => {
    setSelectedCerita(cerita);
    setShowAccepted(true);
  };

  const handleReject = (cerita) => {
    setSelectedCerita(cerita);
    setShowRejected(true);
  };

  const handleEdit = (cerita) => {
    setSelectedCerita(cerita);
    setShowEditCeritaModal(true);
  };

  const handleDelete = (cerita) => {
    setSelectedCerita(cerita);
    setShowDeleteConfirm(true);
  };

  const handleUpdateSubmit = (updatedData) => {
    console.log("Cerita diupdate:", updatedData);
    setShowEditCeritaModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full">
      {/* === TABEL === */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            {activeTab === "daftar" ? (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Cerita</th>
                <th className="p-3">Deskripsi Cerita</th>
                <th className="p-3">Penulis</th>
                <th className="p-3 text-center w-24">Aksi</th>
              </tr>
            ) : (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Cerita</th>
                <th className="p-3">Deskripsi Cerita</th>
                <th className="p-3">Penulis</th>
                <th className="p-3">Disubmit oleh</th>
                <th className="p-3">Tanggal Submit</th>
                <th className="p-3 text-center w-32">Aksi</th>
              </tr>
            )}
          </thead>

          <tbody>
            {data
              .filter((c) =>
                c.judul.toLowerCase().includes(search.toLowerCase())
              )
              .map((cerita, i) => (
                <tr
                  key={cerita.id}
                  className="border-b border-gray-200 hover:bg-amber-50 transition"
                >
                  <td className="py-3 px-3 text-center">{i + 1}</td>
                  <td className="py-3 px-3">{cerita.judul}</td>
                  <td className="py-3 px-3 text-gray-600 max-w-[300px] truncate">
                    {cerita.deskripsi}
                  </td>
                  <td className="py-3 px-3">{cerita.penulis}</td>

                  {activeTab === "verifikasi" && (
                    <>
                      <td className="py-3 px-3">{cerita.submitter}</td>
                      <td className="py-3 px-3">{cerita.date}</td>
                    </>
                  )}

                  <td className="py-3 px-3 text-center">
                    <TableActions
                      activeTab={activeTab}
                      onView={() => handleView(cerita)}
                      onApprove={() => handleApprove(cerita)}
                      onReject={() => handleReject(cerita)}
                      onEdit={() => handleEdit(cerita)}
                      onDelete={() => handleDelete(cerita)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* === SEMUA MODAL === */}
      <DetailCerita
        isOpen={showDetailCerita}
        onClose={() => setShowDetailCerita(false)}
        cerita={selectedCerita}
      />

      <DetailVerifikasiCerita
        isOpen={showDetailVerifikasi}
        onClose={() => setShowDetailVerifikasi(false)}
        cerita={selectedCerita}
      />

      <AcceptedModal
        isOpen={showAccepted}
        onClose={() => setShowAccepted(false)}
      />
      <RejectedModal
        isOpen={showRejected}
        onClose={() => setShowRejected(false)}
      />

      <EditCeritaModal
        isOpen={showEditCeritaModal}
        onClose={() => setShowEditCeritaModal(false)}
        onSubmit={handleUpdateSubmit}
        initialData={selectedCerita}
        isEdit={true}
      />

      <KonfirmasiHapus
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          setShowDeleteSuccess(true);
        }}
      />

      <SuccessDeleteModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
};

export default CeritaTableSection;
