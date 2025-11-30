import { useState, useEffect } from "react";
import TableActions from "../../components/admin/TableActions";

// Modal
import DetailProgram from "../../components/admin/modals/Program/DetailProgram";
import DetailVerifikasiProgram from "../../components/admin/modals/Program/DetailVerifikasiProgram";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditProgramModal from "../../components/admin/modals/Program/EditProgram"; 
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const ProgramTableSection = ({ activeTab, search, refreshTrigger }) => {
  const [programList, setProgramList] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // State Modal
  const [showDetailProgram, setShowDetailProgram] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // 1. FETCH DATA
  const fetchPrograms = () => {
    fetch('http://localhost:3000/admin/programs')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setProgramList(data);
        else setProgramList([]);
      })
      .catch(err => console.error("Gagal ambil data:", err));
  };

  useEffect(() => {
    fetchPrograms();
  }, [refreshTrigger]);

  
  // === 🔥 BAGIAN BARU: FILTER DATA BERDASARKAN STATUS & TAB ===
  // Tab Daftar = Hanya yang statusnya 'approved'
  // Tab Verifikasi = Hanya yang statusnya 'pending'
  
  const data = programList.filter(p => {
    const matchesSearch = p.judul_program.toLowerCase().includes(search.toLowerCase());
    
    if (activeTab === "daftar") {
        return matchesSearch && p.status === 'approved'; 
    } else {
        return matchesSearch && p.status === 'pending';
    }
  });

  // === HANDLERS ===
  const handleAdd = () => { setSelectedProgram(null); setShowEditModal(true); };
  const handleEdit = (program) => { setSelectedProgram(program); setShowEditModal(true); };
  const handleDelete = (program) => { setSelectedProgram(program); setShowDeleteConfirm(true); };
  
  const handleView = (program) => {
    setSelectedProgram(program);
    if (activeTab === "daftar") setShowDetailProgram(true);
    else setShowDetailVerifikasi(true);
  };

  // Handler Buka Modal Approve/Reject
  const handleApproveClick = (program) => { setSelectedProgram(program); setShowAccepted(true); };
  const handleRejectClick = (program) => { setSelectedProgram(program); setShowRejected(true); };

  // === 🔥 BAGIAN BARU: LOGIKA UPDATE STATUS (PATCH) ===
  const updateStatus = (newStatus) => {
    if(!selectedProgram) return;

    fetch(`http://localhost:3000/admin/programs/${selectedProgram.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }) // Kirim status baru ('approved' / 'rejected')
    })
    .then(res => res.json())
    .then(() => {
        fetchPrograms(); // Refresh data
        setShowAccepted(false);
        setShowRejected(false);
    })
    .catch(err => console.error("Gagal update status:", err));
  };

  // === SUBMIT (CREATE & UPDATE) ===
  const handleFormSubmit = (formData) => {
    const isEditMode = !!selectedProgram;
    const url = isEditMode 
        ? `http://localhost:3000/admin/programs/${selectedProgram.id}` 
        : 'http://localhost:3000/admin/programs';
    const method = isEditMode ? 'PUT' : 'POST';

    const dataToSend = new FormData();
    dataToSend.append("judul_program", formData.judul_program);
    dataToSend.append("penyelenggara", formData.penyelenggara);
    dataToSend.append("jenis_program", formData.jenis_program);
    dataToSend.append("lokasi_program", formData.lokasi_program);
    dataToSend.append("deskripsi_program", formData.deskripsi_program);
    dataToSend.append("periode_tanggal", formData.periode_tanggal);
    dataToSend.append("deadline_pendaftaran", formData.deadline_pendaftaran);
    dataToSend.append("status_program", formData.status_program);
    dataToSend.append("tautan_sumber_resmi", formData.tautan_sumber_resmi);

    if (formData.poster_banner) {
        dataToSend.append("poster", formData.poster_banner);
    }

    fetch(url, { method: method, body: dataToSend })
      .then(res => res.json())
      .then(() => {
        fetchPrograms();
        setShowEditModal(false);
      });
  };

  // === DELETE ===
  const handleConfirmDelete = () => {
    if (!selectedProgram) return;
    fetch(`http://localhost:3000/admin/programs/${selectedProgram.id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        fetchPrograms();
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
      });
  };

  // Helper Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full">
      


      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Nama Program</th>
                <th className="p-3">Penyelenggara</th>
                <th className="p-3">Jenis</th>
                
                {/* 🔥 BAGIAN BARU: Kolom Berubah Sesuai Tab */}
                {activeTab === "daftar" ? (
                    <>
                        <th className="p-3">Deadline</th>
                        <th className="p-3">Status</th>
                    </>
                ) : (
                    <>
                        <th className="p-3">Disubmit Oleh</th>
                        <th className="p-3">Tanggal Submit</th>
                    </>
                )}
                
                <th className="p-3 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
                 <tr><td colSpan="7" className="text-center py-5 text-gray-500">Tidak ada data program.</td></tr>
            ) : (
                data.map((program, i) => (
                    <tr key={program.id} className="border-b border-gray-200 hover:bg-amber-50 transition">
                        <td className="py-3 px-3 text-center">{i + 1}</td>
                        <td className="py-3 px-3 font-medium">{program.judul_program}</td>
                        <td className="py-3 px-3">{program.penyelenggara}</td>
                        
                        <td className="py-3 px-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap capitalize ${
                                program.jenis_program === 'Volunteer' ? 'bg-blue-100 text-blue-600' :
                                program.jenis_program === 'Beasiswa' ? 'bg-orange-100 text-orange-600' :
                                'bg-green-100 text-green-600' 
                            }`}>
                                {program.jenis_program}
                            </span>
                        </td>

                        {/* 🔥 BAGIAN BARU: Isi Kolom Berubah Sesuai Tab */}
                        {activeTab === "daftar" ? (
                            <>
                                <td className="py-3 px-3">{formatDate(program.deadline_pendaftaran)}</td>
                                <td className="py-3 px-3">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                                        program.status_program === 'akan datang' ? 'bg-blue-100 text-blue-600' : 
                                        program.status_program === 'sedang dibuka' ? 'bg-green-100 text-green-600' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                        {program.status_program}
                                    </span>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="py-3 px-3">User {program.added_by}</td>
                                <td className="py-3 px-3">{formatDate(program.created_at)}</td>
                            </>
                        )}

                        <td className="py-3 px-3 text-center">
                            {/* 🔥 BAGIAN BARU: Tombol Aksi Berbeda Sesuai Tab */}
                            <TableActions
                                activeTab={activeTab} // Kirim props activeTab ke TableActions agar dia tau tombol apa yg ditampilkan
                                onView={() => handleView(program)}
                                onEdit={() => handleEdit(program)}
                                onDelete={() => handleDelete(program)}
                                onApprove={() => handleApproveClick(program)}
                                onReject={() => handleRejectClick(program)}
                            />
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* === SEMUA MODAL === */}
      <DetailProgram isOpen={showDetailProgram} onClose={() => setShowDetailProgram(false)} program={selectedProgram} />
      <DetailVerifikasiProgram isOpen={showDetailVerifikasi} onClose={() => setShowDetailVerifikasi(false)} program={selectedProgram} />
      
      {/* 🔥 BAGIAN BARU: Modal Approve/Reject panggil updateStatus */}
      <AcceptedModal 
        isOpen={showAccepted} 
        onClose={() => setShowAccepted(false)} 
        onConfirm={() => updateStatus('approved')} 
      />
      <RejectedModal 
        isOpen={showRejected} 
        onClose={() => setShowRejected(false)} 
        onConfirm={() => updateStatus('rejected')} 
      />

      <EditProgramModal
        key={selectedProgram ? selectedProgram.id : "add"}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedProgram}
      />

      <KonfirmasiHapus isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} onConfirm={handleConfirmDelete} />
      <SuccessDeleteModal isOpen={showDeleteSuccess} onClose={() => setShowDeleteSuccess(false)} />
    </div>
  );
};

export default ProgramTableSection;