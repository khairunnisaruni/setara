import { useState } from "react";
import TableActions from "../../components/admin/TableActions";

// Semua modal (nanti kamu bisa ubah isinya seperti komponen buku)
import DetailMateri from "../../components/admin/modals/Materi/DetailMateri";
import DetailVerifikasiMateri from "../../components/admin/modals/Materi/DetailVerifikasiMateri";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditMateriModal from "../../components/admin/modals/Materi/EditMateri";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const MateriTableSection = ({ activeTab, search }) => {
  // State untuk modal dan data yang dipilih
  const [selectedMateri, setSelectedMateri] = useState(null);

  const [showDetailMateri, setShowDetailMateri] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditMateriModal, setShowEditMateriModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // ==== Data Dummy ====
  const daftarMateri = [
    { 
      id: 1, 
      judul: "Learning Past Tenses", 
      jenisFile: "PDF", 
      kategoriPelajar: "4 SD", 
      kategori: "Matematika" 
    },
    { 
      id: 2, 
      judul: "Belajar Mengeja, Menulis, dan Menghitung", 
      jenisFile: "AUDIO", 
      kategoriPelajar: "5 SD", 
      kategori: "Bahasa Indonesia" 
    },
    { 
      id: 3, 
      judul: "Fun Fact : Introduction to Dinosaurous", 
      jenisFile: "VIDEO", 
      kategoriPelajar: "1 SD", 
      kategori: "Bahasa Inggris" 
    },
    { 
      id: 4, 
      judul: "Pembelajaran Sains Dasar", 
      jenisFile: "VIDEO", 
      kategoriPelajar: "2 SD", 
      kategori: "Sains" 
    },
    { 
      id: 5, 
      judul: "Puisi", 
      jenisFile: "PDF", 
      kategoriPelajar: "4 SD", 
      kategori: "Bahasa Indonesia" 
    },
  ];

  const verifikasiMateri = daftarMateri.map((m) => ({
    ...m,
    submitter: "khairuntes",
    date: "16-09-2005",
  }));

  const data = activeTab === "daftar" ? daftarMateri : verifikasiMateri;

  // ==== Handlers ====
  const handleView = (materi) => {
    setSelectedMateri(materi);
    if (activeTab === "daftar") setShowDetailMateri(true);
    else setShowDetailVerifikasi(true);
  };

  const handleApprove = (materi) => {
    setSelectedMateri(materi);
    setShowAccepted(true);
  };

  const handleReject = (materi) => {
    setSelectedMateri(materi);
    setShowRejected(true);
  };

  const handleEdit = (materi) => {
    setSelectedMateri(materi);
    setShowEditMateriModal(true);
  };

  const handleDelete = (materi) => {
    setSelectedMateri(materi);
    setShowDeleteConfirm(true);
  };

  const handleUpdateSubmit = (updatedData) => {
    console.log("Materi diupdate:", updatedData);
    setShowEditMateriModal(false);
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
                <th className="p-3">Judul Materi</th>
                <th className="p-3">Jenis File</th>
                <th className="p-3">Kategori Pelajar</th>
                <th className="p-3">Kategori</th>
                <th className="p-3 text-center w-24">Aksi</th>
              </tr>
            ) : (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Materi</th>
                <th className="p-3">Jenis File</th>
                <th className="p-3">Kategori Pelajar</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Disubmit oleh</th>
                <th className="p-3">Tanggal Submit</th>
                <th className="p-3 text-center w-32">Aksi</th>
              </tr>
            )}
          </thead>

          <tbody>
            {data
              .filter((m) =>
                m.judul.toLowerCase().includes(search.toLowerCase())
              )
              .map((materi, i) => (
                <tr
                  key={materi.id}
                  className="border-b border-gray-200 hover:bg-amber-50 transition"
                >
                  <td className="py-3 px-3 text-center">{i + 1}</td>
                  <td className="py-3 px-3">{materi.judul}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        materi.jenisFile === "PDF"
                          ? "bg-green-100 text-green-700"
                          : materi.jenisFile === "AUDIO"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {materi.jenisFile}
                    </span>
                  </td>
                  <td className="py-3 px-3">{materi.kategoriPelajar}</td>
                  <td className="py-3 px-3">{materi.kategori}</td>

                  {activeTab === "verifikasi" && (
                    <>
                      <td className="py-3 px-3">{materi.submitter}</td>
                      <td className="py-3 px-3">{materi.date}</td>
                    </>
                  )}

                  <td className="py-3 px-3 text-center">
                    <TableActions
                      activeTab={activeTab}
                      onView={() => handleView(materi)}
                      onApprove={() => handleApprove(materi)}
                      onReject={() => handleReject(materi)}
                      onEdit={() => handleEdit(materi)}
                      onDelete={() => handleDelete(materi)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* === SEMUA MODAL === */}

      <DetailMateri
        isOpen={showDetailMateri}
        onClose={() => setShowDetailMateri(false)}
        materi={selectedMateri}
      />

      <DetailVerifikasiMateri
        isOpen={showDetailVerifikasi}
        onClose={() => setShowDetailVerifikasi(false)}
        materi={selectedMateri}
      />

      <AcceptedModal
        isOpen={showAccepted}
        onClose={() => setShowAccepted(false)}
      />
      <RejectedModal
        isOpen={showRejected}
        onClose={() => setShowRejected(false)}
      />

      <EditMateriModal
        isOpen={showEditMateriModal}
        onClose={() => setShowEditMateriModal(false)}
        onSubmit={handleUpdateSubmit}
        initialData={selectedMateri}
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

export default MateriTableSection;
