import { useState, useEffect } from "react";
import TableActions from "../../components/admin/TableActions";

// Semua modal
import DetailMateri from "../../components/admin/modals/Materi/DetailMateri";
import DetailVerifikasiMateri from "../../components/admin/modals/Materi/DetailVerifikasiMateri";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditMateriModal from "../../components/admin/modals/Materi/EditMateri"; 
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const MateriTableSection = ({ activeTab, search, refreshTrigger, setRefreshTrigger }) => {
  const [selectedMateri, setSelectedMateri] = useState(null);
  const [materiList, setMateriList] = useState([]);

  // State Modal
  const [showDetailMateri, setShowDetailMateri] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditMateriModal, setShowEditMateriModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // 1. FETCH DATA
  const fetchMateri = () => {
    fetch('http://localhost:3000/admin/materials')
      .then(res => res.json())
      .then(data => {
        // Validasi: Pastikan data adalah array
        if (!Array.isArray(data)) {
            console.error("Data bukan array:", data);
            setMateriList([]);
            return;
        }

        const formattedData = data.map(item => ({
            // === 1. DATA UNTUK TAMPILAN TABEL (JANGAN DIUBAH SEMBARANGAN) ===
            // Pastikan key ini sesuai dengan yang dipanggil di <tbody> tabel kamu
            id: item.id,
            title: item.title,      // Tabel biasanya butuh 'title'
            judul: item.title,      // Cadangan jika tabel pakai 'judul'
            
            kategori: item.nama_kategori || "-",
            kelas: item.nama_kelas || "-",          // Tabel biasanya butuh 'kelas'
            kategoriPelajar: item.nama_kelas || "-", // Cadangan jika tabel pakai ini
            
            jenisFile: item.file_type ? item.file_type.toUpperCase() : "-", // Untuk Label Kuning/Biru di tabel
            submitter: item.nama_pengupload || "Admin",
            date: item.created_at,
            status: item.status || "pending",

            // === 2. DATA UNTUK MODAL EDIT (WAJIB ADA) ===
            // Nama key ini HARUS SAMA dengan yang dicari di EditMateriModal
            description: item.description,
            file_type: item.file_type,        // Penting untuk logic Video/PDF
            file_path: item.file_path,        // Penting untuk link Youtube
            kategori_id: item.kategori_id,    // Penting untuk Dropdown Mapel
            kategori_kelas_id: item.kategori_kelas_id // Penting untuk Dropdown Kelas
        }));

        setMateriList(formattedData);
      })
      .catch(err => console.error("Gagal ambil materi:", err));
  };

  useEffect(() => {
    fetchMateri();
  }, [refreshTrigger]); 

  const data = materiList.filter(m => {
      const matchSearch = m.judul.toLowerCase().includes(search.toLowerCase());
      if (activeTab === "daftar") return matchSearch && m.status === 'approved';
      return matchSearch && m.status === 'pending';
  });

  // ==== HANDLERS ====
  
  // Handle View
  const handleView = (materi) => {
    setSelectedMateri(materi);
    if (activeTab === "daftar") setShowDetailMateri(true);
    else setShowDetailVerifikasi(true);
  };

  // Handle Edit (Buka Modal Edit)
  const handleEdit = (materi) => { 
      setSelectedMateri(materi); 
      setShowEditMateriModal(true); 
  };

  // Handle Delete (Buka Modal Delete)
  const handleDelete = (materi) => { 
      setSelectedMateri(materi); 
      setShowDeleteConfirm(true); 
  };

  // Handle Status
  const handleApproveClick = (materi) => { setSelectedMateri(materi); setShowAccepted(true); };
  const handleRejectClick = (materi) => { setSelectedMateri(materi); setShowRejected(true); };


  // =========================================
  // 🔥 HANDLER KHUSUS UPDATE/EDIT (PUT) 
  // =========================================
  const handleUpdateSubmit = (formData) => {
    if (!selectedMateri) return; 

    const url = `http://localhost:3000/admin/materials/${selectedMateri.id}`;
    const dataToSend = new FormData();

    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("file_type", formData.file_type);
    dataToSend.append("kategori_id", formData.kategori_id);
    dataToSend.append("kategori_kelas_id", formData.kategori_kelas_id);

    // Cek logika file/link untuk Update
    if (formData.file_type === 'video') {
        dataToSend.append("youtube_link", formData.youtube_link);
    } else {
        // Hanya kirim file jika user mengganti file baru (tidak null)
        if (formData.file_material) {
            dataToSend.append("file_material", formData.file_material);
        }
    }

    fetch(url, { method: 'PUT', body: dataToSend })
      .then(res => res.json())
      .then(() => {
        console.log("Sukses Update Materi");
        fetchMateri();
        setShowEditMateriModal(false);
      })
      .catch(console.error);
  };

  // === LOGIKA DELETE ===
  const handleConfirmDelete = () => {
    if (!selectedMateri) return;
    fetch(`http://localhost:3000/admin/materials/${selectedMateri.id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => {
        setMateriList(materiList.filter(m => m.id !== selectedMateri.id));
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
    })
    .catch(console.error);
  };

  // === LOGIKA UPDATE STATUS ===
  const updateStatus = (newStatus) => {
    if(!selectedMateri) return;
    fetch(`http://localhost:3000/admin/materials/${selectedMateri.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(() => {
        fetchMateri();
        if(setRefreshTrigger) setRefreshTrigger(prev => prev + 1);
        setShowAccepted(false);
        setShowRejected(false);
    })
    .catch(err => console.error("Gagal update status:", err));
  };

  // Helper Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full">
      
      {/* Tabel Data */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Materi</th>
                <th className="p-3">Jenis File</th>
                <th className="p-3">Kelas</th>
                <th className="p-3">Mapel</th>
                {activeTab === "verifikasi" && (
                    <>
                        <th className="p-3">Disubmit Oleh</th>
                        <th className="p-3">Tanggal</th>
                    </>
                )}
                <th className="p-3 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
             {data.length === 0 ? (
                 <tr><td colSpan="8" className="text-center py-5 text-gray-500">Tidak ada data materi.</td></tr>
            ) : (
                data.map((materi, i) => (
                <tr key={materi.id} className="border-b border-gray-200 hover:bg-amber-50 transition">
                  <td className="p-3 text-center">{i + 1}</td>
                  <td className="p-3 font-medium">{materi.judul}</td>
                  <td className="p-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        materi.jenisFile === "PDF" ? "bg-red-100 text-red-700" :
                        materi.jenisFile === "AUDIO" ? "bg-orange-100 text-orange-700" :
                        "bg-purple-100 text-purple-700"
                    }`}>{materi.jenisFile}</span>
                  </td>
                  <td className="p-3">{materi.kategoriPelajar}</td>
                  <td className="p-3">{materi.kategori}</td>
                  
                  {activeTab === "verifikasi" && (
                    <>
                      <td className="p-3">{materi.submitter}</td>
                      <td className="p-3">{formatDate(materi.date)}</td>
                    </>
                  )}

                  <td className="p-3 text-center">
                    <TableActions
                      activeTab={activeTab}
                      onView={() => handleView(materi)}
                      onEdit={() => handleEdit(materi)}
                      onDelete={() => handleDelete(materi)}
                      onApprove={() => handleApproveClick(materi)}
                      onReject={() => handleRejectClick(materi)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* === MODAL === */}
      <DetailMateri isOpen={showDetailMateri} onClose={() => setShowDetailMateri(false)} materi={selectedMateri} />
      <DetailVerifikasiMateri isOpen={showDetailVerifikasi} onClose={() => setShowDetailVerifikasi(false)} materi={selectedMateri} />

      <AcceptedModal 
        isOpen={showAccepted} onClose={() => setShowAccepted(false)} 
        onConfirm={() => updateStatus('approved')} 
      />
      <RejectedModal 
        isOpen={showRejected} onClose={() => setShowRejected(false)} 
        onConfirm={() => updateStatus('rejected')} 
      />

      <EditMateriModal
        key={selectedMateri ? selectedMateri.id : "edit"}
        isOpen={showEditMateriModal}
        onClose={() => setShowEditMateriModal(false)}
        // HANYA SUBMIT EDIT
        onSubmit={handleUpdateSubmit}
        initialData={selectedMateri}
      />

      <KonfirmasiHapus 
        isOpen={showDeleteConfirm} 
        onClose={() => setShowDeleteConfirm(false)} 
        onConfirm={handleConfirmDelete} 
      />

      <SuccessDeleteModal isOpen={showDeleteSuccess} onClose={() => setShowDeleteSuccess(false)} />
    </div>
  );
};

export default MateriTableSection;