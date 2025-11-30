import { useState, useEffect } from "react";
import TableActions from "../../components/admin/TableActions";

// Modal
import DetailDonasi from "../../components/admin/modals/Donasi/DetailDonasi";
import DetailVerifikasiDonasi from "../../components/admin/modals/Donasi/DetailVerifikasiDonasi";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditDonasiModal from "../../components/admin/modals/Donasi/EditDonasi"; // Pastikan path benar
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const DonasiTableSection = ({ activeTab, search, refreshTrigger, setRefreshTrigger }) => {
  const [donasiList, setDonasiList] = useState([]);
  const [selectedDonasi, setSelectedDonasi] = useState(null);

  // State Modal
  const [showDetailDonasi, setShowDetailDonasi] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditDonasiModal, setShowEditDonasiModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // 1. FETCH DATA
  const fetchDonasi = () => {
    fetch('http://localhost:3000/admin/donations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDonasiList(data);
        else setDonasiList([]);
      })
      .catch(err => console.error("Gagal ambil data:", err));
  };

  useEffect(() => {
    fetchDonasi();
  }, [refreshTrigger]);

  // Filter Data
  const data = donasiList.filter(d => {
      const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
      if (activeTab === "daftar") return matchSearch && d.status === 'approved';
      return matchSearch && d.status === 'pending';
  });

  // === HANDLERS ===
  const handleEdit = (donasi) => { setSelectedDonasi(donasi); setShowEditDonasiModal(true); };
  const handleDelete = (donasi) => { setSelectedDonasi(donasi); setShowDeleteConfirm(true); };
  
  const handleView = (donasi) => {
    setSelectedDonasi(donasi);
    if (activeTab === "daftar") setShowDetailDonasi(true);
    else setShowDetailVerifikasi(true);
  };

  const handleApprove = (donasi) => { setSelectedDonasi(donasi); setShowAccepted(true); };
  const handleReject = (donasi) => { setSelectedDonasi(donasi); setShowRejected(true); };

  // === 1. LOGIKA EDIT (PUT) ===
  const handleEditSubmit = (formData) => {
    if (!selectedDonasi) return;

    const url = `http://localhost:3000/admin/donations/${selectedDonasi.id}`;
    const dataToSend = new FormData();

    dataToSend.append("title", formData.title);
    dataToSend.append("kategori", formData.kategori);
    dataToSend.append("penerima_manfaat", formData.penerima_manfaat);
    dataToSend.append("description", formData.description);
    dataToSend.append("dampak", formData.dampak);
    dataToSend.append("link", formData.link);
    dataToSend.append("penanggung_jawab", formData.penanggung_jawab);
    dataToSend.append("contact_person", formData.contact_person);
    
    if (formData.poster) {
        dataToSend.append("poster", formData.poster);
    }

    fetch(url, { method: 'PUT', body: dataToSend })
      .then(res => res.json())
      .then(() => {
        console.log("Berhasil Update Donasi");
        fetchDonasi();
        setShowEditDonasiModal(false);
      })
      .catch(err => console.error("Gagal Update:", err));
  };

  // === 2. LOGIKA DELETE ===
  const handleConfirmDelete = () => {
    if (!selectedDonasi) return;
    fetch(`http://localhost:3000/admin/donations/${selectedDonasi.id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setDonasiList(donasiList.filter(d => d.id !== selectedDonasi.id));
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
      })
      .catch(err => console.error("Gagal Hapus:", err));
  };

  // === 3. LOGIKA STATUS (APPROVE/REJECT) ===
  const updateStatus = (newStatus) => {
    if(!selectedDonasi) return;
    fetch(`http://localhost:3000/admin/donations/${selectedDonasi.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(() => {
        fetchDonasi();
        if(setRefreshTrigger) setRefreshTrigger(prev => prev + 1); // Update badge parent
        setShowAccepted(false);
        setShowRejected(false);
    })
    .catch(err => console.error("Gagal update status:", err));
  };

  // Helper Date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full">
      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Donasi</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Penerima</th>
                <th className="p-3">Penanggung Jawab</th>
                <th className="p-3">Kontak</th>
                {activeTab === "verifikasi" && (
                    <>
                        <th className="p-3">Disubmit oleh</th>
                        <th className="p-3">Tanggal Submit</th>
                    </>
                )}
                <th className="p-3 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
                 <tr><td colSpan="8" className="text-center py-5 text-gray-500">Tidak ada data donasi.</td></tr>
            ) : (
                data.map((donasi, i) => (
                    <tr key={donasi.id} className="border-b border-gray-200 hover:bg-amber-50 transition">
                        <td className="py-3 px-3 text-center">{i + 1}</td>
                        <td className="py-3 px-3 font-medium">{donasi.title}</td>
                        <td className="py-3 px-3">{donasi.kategori}</td>
                        <td className="py-3 px-3">{donasi.penerima_manfaat}</td>
                        <td className="py-3 px-3">{donasi.penanggung_jawab}</td>
                        <td className="py-3 px-3">{donasi.contact_person}</td>
                        
                        {activeTab === "verifikasi" && (
                            <>
                            <td className="py-3 px-3">{donasi.submitter || 'Admin'}</td>
                            <td className="py-3 px-3">{formatDate(donasi.created_at)}</td>
                            </>
                        )}

                        <td className="py-3 px-3 text-center">
                            <TableActions
                                activeTab={activeTab}
                                onView={() => handleView(donasi)}
                                onEdit={() => handleEdit(donasi)}
                                onDelete={() => handleDelete(donasi)}
                                onApprove={() => handleApprove(donasi)}
                                onReject={() => handleReject(donasi)}
                            />
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals Detail */}
      <DetailDonasi isOpen={showDetailDonasi} onClose={() => setShowDetailDonasi(false)} donasi={selectedDonasi} />
      <DetailVerifikasiDonasi isOpen={showDetailVerifikasi} onClose={() => setShowDetailVerifikasi(false)} donasi={selectedDonasi} />

      {/* Modal Status (Approve/Reject) */}
      <AcceptedModal isOpen={showAccepted} onClose={() => setShowAccepted(false)} onConfirm={() => updateStatus('approved')} />
      <RejectedModal isOpen={showRejected} onClose={() => setShowRejected(false)} onConfirm={() => updateStatus('rejected')} />

      {/* Modal Edit (Khusus Edit) */}
      <EditDonasiModal
        key={selectedDonasi ? selectedDonasi.id : "edit"}
        isOpen={showEditDonasiModal}
        onClose={() => setShowEditDonasiModal(false)}
        onSubmit={handleEditSubmit} 
        initialData={selectedDonasi}
      />

      {/* Modal Hapus */}
      <KonfirmasiHapus isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} onConfirm={handleConfirmDelete} />
      <SuccessDeleteModal isOpen={showDeleteSuccess} onClose={() => setShowDeleteSuccess(false)} />
    </div>
  );
};

export default DonasiTableSection;