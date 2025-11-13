import { useState } from "react";
import TableActions from "../../components/admin/TableActions";

// Semua modal untuk Donasi
import DetailDonasi from "../../components/admin/modals/Donasi/DetailDonasi";
import DetailVerifikasiDonasi from "../../components/admin/modals/Donasi/DetailVerifikasiDonasi";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditDonasiModal from "../../components/admin/modals/Donasi/EditDonasi";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const DonasiTableSection = ({ activeTab, search }) => {
  // === State Modal ===
  const [selectedDonasi, setSelectedDonasi] = useState(null);
  const [showDetailDonasi, setShowDetailDonasi] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditDonasiModal, setShowEditDonasiModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // === Data Dummy Donasi ===
  const daftarDonasi = [
    {
      id: 1,
      title: "Donasi Buku untuk Sekolah Pedalaman",
      category: "Kebutuhan Dasar Siswa",
      recipient: "SD Negeri 5 Humbang",
      responsible: "Komunitas BacaMedan",
      contact: "0812-9876-5432",
    },
    {
      id: 2,
      title: "Donasi Pakaian Layak Pakai",
      category: "Beasiswa dan Bantuan Pendidikan",
      recipient: "Yayasan Kasih Ibu",
      responsible: "Pemuda Mandiri",
      contact: "0821-2345-6789",
    },
    {
      id: 3,
      title: "Donasi Peralatan Belajar",
      category: "Kegiatan Relawan & Volunteer",
      recipient: "SD Negeri 1 Binjai",
      responsible: "Mahasiswa Telkom",
      contact: "0813-5555-2222",
    },
    {
      id: 4,
      title: "Bantuan Sembako untuk Panti Asuhan",
      category: "Fasilitas Belajar dan Infrastruktur",
      recipient: "Panti Asuhan Nur Hidayah",
      responsible: "Relawan Berbagi",
      contact: "0813-9876-4321",
    },
  ];

  const verifikasiDonasi = daftarDonasi.map((d) => ({
    ...d,
    submitter: "user_tes",
    submittedAt: "05-11-2025",
  }));

  const data = activeTab === "daftar" ? daftarDonasi : verifikasiDonasi;

  // === Handler Aksi ===
  const handleView = (donasi) => {
    setSelectedDonasi(donasi);
    if (activeTab === "daftar") setShowDetailDonasi(true);
    else setShowDetailVerifikasi(true);
  };

  const handleApprove = (donasi) => {
    setSelectedDonasi(donasi);
    setShowAccepted(true);
  };

  const handleReject = (donasi) => {
    setSelectedDonasi(donasi);
    setShowRejected(true);
  };

  const handleEdit = (donasi) => {
    setSelectedDonasi(donasi);
    setShowEditDonasiModal(true);
  };

  const handleDelete = (donasi) => {
    setSelectedDonasi(donasi);
    setShowDeleteConfirm(true);
  };

  const handleUpdateSubmit = (updatedData) => {
    console.log("📦 Donasi diupdate:", updatedData);
    setShowEditDonasiModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full">
      {/* === TABEL === */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            {activeTab === "daftar" ? (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Donasi</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Penerima</th>
                <th className="p-3">Penanggung Jawab</th>
                <th className="p-3">Kontak</th>
                <th className="p-3 text-center w-24">Aksi</th>
              </tr>
            ) : (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Donasi</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Penerima</th>
                <th className="p-3">Penanggung Jawab</th>
                <th className="p-3">Kontak</th>
                <th className="p-3">Disubmit oleh</th>
                <th className="p-3">Tanggal Submit</th>
                <th className="p-3 text-center w-32">Aksi</th>
              </tr>
            )}
          </thead>

          <tbody>
            {data
              .filter((d) =>
                d.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((donasi, i) => (
                <tr
                  key={donasi.id}
                  className="border-b border-gray-200 hover:bg-amber-50 transition"
                >
                  <td className="py-3 px-3 text-center">{i + 1}</td>
                  <td className="py-3 px-3">{donasi.title}</td>
                  <td className="py-3 px-3">{donasi.category}</td>
                  <td className="py-3 px-3">{donasi.recipient}</td>
                  <td className="py-3 px-3">{donasi.responsible}</td>
                  <td className="py-3 px-3">{donasi.contact}</td>

                  {activeTab === "verifikasi" && (
                    <>
                      <td className="py-3 px-3">{donasi.submitter}</td>
                      <td className="py-3 px-3">{donasi.submittedAt}</td>
                    </>
                  )}

                  <td className="py-3 px-3 text-center">
                    <TableActions
                      activeTab={activeTab}
                      onView={() => handleView(donasi)}
                      onApprove={() => handleApprove(donasi)}
                      onReject={() => handleReject(donasi)}
                      onEdit={() => handleEdit(donasi)}
                      onDelete={() => handleDelete(donasi)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* === SEMUA MODAL === */}
      <DetailDonasi
        isOpen={showDetailDonasi}
        onClose={() => setShowDetailDonasi(false)}
        donasi={selectedDonasi}
      />

      <DetailVerifikasiDonasi
        isOpen={showDetailVerifikasi}
        onClose={() => setShowDetailVerifikasi(false)}
        donasi={selectedDonasi}
      />

      <AcceptedModal
        isOpen={showAccepted}
        onClose={() => setShowAccepted(false)}
      />
      <RejectedModal
        isOpen={showRejected}
        onClose={() => setShowRejected(false)}
      />

      <EditDonasiModal
        isOpen={showEditDonasiModal}
        onClose={() => setShowEditDonasiModal(false)}
        onSubmit={handleUpdateSubmit}
        initialData={selectedDonasi}
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

export default DonasiTableSection;
