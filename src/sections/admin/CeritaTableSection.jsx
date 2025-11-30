import { useState, useEffect } from "react";
import TableActions from "../../components/admin/TableActions";

import DetailCerita from "../../components/admin/modals/Cerita/DetailCerita";
import DetailVerifikasiCerita from "../../components/admin/modals/Cerita/DetailVerifikasiCerita";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditCeritaModal from "../../components/admin/modals/Cerita/EditCerita";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const CeritaTableSection = ({ activeTab, search, refreshTrigger, setRefreshTrigger }) => {
  const [selectedCerita, setSelectedCerita] = useState(null);
  

  const [showDetailCerita, setShowDetailCerita] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditCeritaModal, setShowEditCeritaModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/admin/stories')
      .then(res => res.json())
      .then(data => {
        setStories(data);
      })
      .catch(err => console.error(err));
  }, []);


  const fetchStories = () => {
    fetch('http://localhost:3000/admin/stories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            // Mapping Data (DB -> UI)
            const formatted = data.map(item => ({
                id: item.id,
                title: item.title,
                content: item.content,
                nama_penulis: item.nama_penulis || "Admin",
                submitter: item.nama_penulis || "Admin",
                created_at: item.created_at,
                status: item.status || "pending"
            }));
            setStories(formatted);
        } else {
            setStories([]);
        }
      })
      .catch(err => console.error("Gagal ambil cerita:", err));
  };
  const data = stories.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      if (activeTab === "daftar") return matchSearch && c.status === 'approved';
      return matchSearch && c.status === 'pending';
  });

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

  
  const handleApproveClick = (cerita) => { setSelectedCerita(cerita); setShowAccepted(true); };
  const handleRejectClick = (cerita) => { setSelectedCerita(cerita); setShowRejected(true); };

  const handleConfirmDelete = () => {
    if (!selectedCerita) return;

    fetch(`http://localhost:3000/admin/stories/${selectedCerita.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        // Hapus dari state (biar tabel update tanpa refresh)
        const sisaStories = stories.filter(s => s.id !== selectedCerita.id);
        setStories(sisaStories);

        // Tutup modal konfirmasi & Buka modal sukses hapus
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
      })
      .catch((err) => console.error("Gagal menghapus:", err));
  };
  const handleUpdateSubmit = (formData) => {
    if (!selectedCerita) return; // Jaga-jaga

    // Kirim data ke Backend
    fetch(`http://localhost:3000/admin/stories/${selectedCerita.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // Kirim {title, description}
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Sukses update:", data);
        fetch('http://localhost:3000/admin/stories')
          .then(res => res.json())
          .then(data => setStories(data));

        setShowEditCeritaModal(false);
      })
      .catch((err) => console.error("Gagal update:", err));
  };

  useEffect(() => {
    fetchStories();
  }, [refreshTrigger]);
  const updateStatus = (newStatus) => {
    if(!selectedCerita) return;
    fetch(`http://localhost:3000/admin/stories/${selectedCerita.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(() => {
        fetchStories();
        if(setRefreshTrigger) setRefreshTrigger(prev => prev + 1);
        setShowAccepted(false);
        setShowRejected(false);
    })
    .catch(console.error);
  };

  // Helper Date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long", // Pakai 'short' kalau mau 'Nov', pakai 'long' kalau 'November'
      year: "numeric",
      // hour: "2-digit", // Hapus komen ini kalau mau tampilkan jam
      // minute: "2-digit"
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full">
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
            {data.length === 0 ? (
              <tr><td colSpan="8" className="text-center py-5">Tidak ada data cerita.</td></tr>
            ) : (
              data.filter((c) =>
                c.title.toLowerCase().includes(search.toLowerCase())
              )
                .map((cerita, i) => (
                  <tr
                    key={cerita.id}
                    className="border-b border-gray-200 hover:bg-amber-50 transition"
                  >
                    <td className="py-3 px-3 text-center">{i + 1}</td>

                    <td className="py-3 px-3">{cerita.title}</td>

                    <td className="py-3 px-3 text-gray-600 max-w-[300px] truncate">
                      {cerita.content}
                    </td>

                    <td className="py-3 px-3">
                      {cerita.nama_penulis || `User ID: ${cerita.user_id}`}
                    </td>

                    {activeTab === "verifikasi" && (
                      <>
                        <td className="py-3 px-3">{cerita.submitter || '-'}</td>
                        <td className="py-3 px-3">{formatDate(cerita.created_at)}</td>
                      </>
                    )}

                    <td className="py-3 px-3 text-center">
                      <TableActions
                        activeTab={activeTab}
                        onView={() => handleView(cerita)}
                        onEdit={() => handleEdit(cerita)}
                        onDelete={() => handleDelete(cerita)}
                        onApprove={() => handleApproveClick(cerita)}
                        onReject={() => handleRejectClick(cerita)}
                      />
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

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
        onConfirm={() => updateStatus('approved')}
      />

      <RejectedModal
        isOpen={showRejected}
        onClose={() => setShowRejected(false)}
        onConfirm={() => updateStatus('rejected')}
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
        onConfirm={handleConfirmDelete} // <--- Panggil fungsi API Delete
      />

      <SuccessDeleteModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
};

export default CeritaTableSection;