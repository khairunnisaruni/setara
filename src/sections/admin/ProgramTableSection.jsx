import { useState } from "react";
import TableActions from "../../components/admin/TableActions";

// Semua modal untuk Program
import DetailProgram from "../../components/admin/modals/Program/DetailProgram";
import DetailVerifikasiProgram from "../../components/admin/modals/Program/DetailVerifikasiProgram";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditProgramModal from "../../components/admin/modals/Program/EditProgram";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const ProgramTableSection = ({ activeTab, search }) => {
  // === State Modal ===
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showDetailProgram, setShowDetailProgram] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditProgramModal, setShowEditProgramModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // === Data Dummy Program (sesuai UI contoh) ===
  const daftarProgram = [
    {
      id: 1,
      title: "Learning Past Tenses",
      type: "Pengabdian Masyarakat",
      organizer: "Kemendikbud",
      period: "Januari - Juni 2025",
    },
    {
      id: 2,
      title: "Belajar Mengeja, Menulis, dan Menghitung",
      type: "Beasiswa",
      organizer: "Mandiri",
      period: "Januari - Juni 2025",
    },
    {
      id: 3,
      title: "Fun Fact : Introduction to Dinosaurous",
      type: "Volunteer",
      organizer: "Pusat Penelitian Kelapa Sawit",
      period: "Januari - Juni 2025",
    },
    {
      id: 4,
      title: "Pembelajaran Sains Dasar",
      type: "Volunteer",
      organizer: "Telkomsel",
      period: "Januari - Juni 2025",
    },
    {
      id: 5,
      title: "Puisi",
      type: "Pengabdian Masyarakat",
      organizer: "Djarum",
      period: "Januari - Juni 2025",
    },
  ];

  const verifikasiProgram = daftarProgram.map((p) => ({
    ...p,
    submitter: "user_tes",
    submittedAt: "01-11-2025",
  }));

  const data = activeTab === "daftar" ? daftarProgram : verifikasiProgram;

  // === Handler Aksi ===
  const handleView = (program) => {
    setSelectedProgram(program);
    if (activeTab === "daftar") setShowDetailProgram(true);
    else setShowDetailVerifikasi(true);
  };

  const handleApprove = (program) => {
    setSelectedProgram(program);
    setShowAccepted(true);
  };

  const handleReject = (program) => {
    setSelectedProgram(program);
    setShowRejected(true);
  };

  const handleEdit = (program) => {
    setSelectedProgram(program);
    setShowEditProgramModal(true);
  };

  const handleDelete = (program) => {
    setSelectedProgram(program);
    setShowDeleteConfirm(true);
  };

  const handleUpdateSubmit = (updatedData) => {
    console.log("Program diupdate:", updatedData);
    setShowEditProgramModal(false);
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
                <th className="p-3">Judul Program</th>
                <th className="p-3">Jenis Program</th>
                <th className="p-3">Penyelenggara</th>
                <th className="p-3">Periode</th>
                <th className="p-3 text-center w-24">Aksi</th>
              </tr>
            ) : (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Program</th>
                <th className="p-3">Jenis Program</th>
                <th className="p-3">Penyelenggara</th>
                <th className="p-3">Periode</th>
                <th className="p-3">Disubmit oleh</th>
                <th className="p-3">Tanggal Submit</th>
                <th className="p-3 text-center w-32">Aksi</th>
              </tr>
            )}
          </thead>

          <tbody>
            {data
              .filter((p) =>
                p.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((program, i) => (
                <tr
                  key={program.id}
                  className="border-b border-gray-200 hover:bg-amber-50 transition"
                >
                  <td className="py-3 px-3 text-center">{i + 1}</td>
                  <td className="py-3 px-3">{program.title}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                        program.type === "Pengabdian Masyarakat"
                          ? "bg-green-100 text-green-700"
                          : program.type === "Beasiswa"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {program.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">{program.organizer}</td>
                  <td className="py-3 px-3">{program.period}</td>

                  {activeTab === "verifikasi" && (
                    <>
                      <td className="py-3 px-3">{program.submitter}</td>
                      <td className="py-3 px-3">{program.submittedAt}</td>
                    </>
                  )}

                  <td className="py-3 px-3 text-center">
                    <TableActions
                      activeTab={activeTab}
                      onView={() => handleView(program)}
                      onApprove={() => handleApprove(program)}
                      onReject={() => handleReject(program)}
                      onEdit={() => handleEdit(program)}
                      onDelete={() => handleDelete(program)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* === SEMUA MODAL === */}
      <DetailProgram
        isOpen={showDetailProgram}
        onClose={() => setShowDetailProgram(false)}
        program={selectedProgram}
      />

      <DetailVerifikasiProgram
        isOpen={showDetailVerifikasi}
        onClose={() => setShowDetailVerifikasi(false)}
        program={selectedProgram}
      />

      <AcceptedModal
        isOpen={showAccepted}
        onClose={() => setShowAccepted(false)}
      />
      <RejectedModal
        isOpen={showRejected}
        onClose={() => setShowRejected(false)}
      />

      <EditProgramModal
        isOpen={showEditProgramModal}
        onClose={() => setShowEditProgramModal(false)}
        onSubmit={handleUpdateSubmit}
        initialData={selectedProgram}
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

export default ProgramTableSection;
