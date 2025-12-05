import { useState, useEffect } from "react";
import TableActions from "../../components/admin/TableActions";

// Import Semua Modal
import DetailBuku from "../../components/admin/modals/Buku/DetailBuku";
import DetailVerifikasiBuku from "../../components/admin/modals/Buku/DetailVerifikasiBuku";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditBookModal from "../../components/admin/modals/Buku/EditBuku";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const BookTableSection = ({ activeTab, search }) => {
  // State Modal
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailBuku, setShowDetailBuku] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // State Data
  const [books, setBooks] = useState([]);

  // 1. FETCH & MAPPING DATA
  const fetchBooks = () => {
    // 🔥 PERHATIKAN: Endpoint di sini adalah 'buku'
    fetch('http://localhost:5000/admin/buku')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.error("Data bukan array:", data);
          setBooks([]);
          return;
        }

        const formattedData = data.map(item => ({
          id: item.id,
          title: item.title,
          penulis: item.author,       // Untuk tampilan tabel
          kategori: item.nama_kategori, // Untuk tampilan tabel
          tautan: item.link,
          submitter: item.nama_pengupload || "Admin",
          date: item.created_at,
          
          // Field untuk Form Edit (Sesuaikan dengan nama field database)
          kategori_id: item.kategori_id, 
          author: item.author, 
          description: item.description, 
          link: item.link,
          status: item.status || 'pending'
        }));

        setBooks(formattedData);
      })
      .catch(err => console.error("Gagal ambil buku:", err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // === FILTER DATA ===
  const data = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "daftar") return matchSearch && b.status === 'approved';
    return matchSearch && b.status === 'pending';
  });

  // === HANDLERS UI ===
  const handleView = (book) => {
    setSelectedBook(book);
    if (activeTab === "daftar") setShowDetailBuku(true);
    else setShowDetailVerifikasi(true);
  };

  const handleEdit = (book) => { setSelectedBook(book); setShowEditBookModal(true); };
  const handleDelete = (book) => { setSelectedBook(book); setShowDeleteConfirm(true); };
  
  const handleApprove = (book) => { setSelectedBook(book); setShowAccepted(true); };
  const handleReject = (book) => { setSelectedBook(book); setShowRejected(true); };


  // === 1. LOGIKA UPDATE / EDIT (PUT) ===
  const handleEditSubmit = (formData) => {
    if (!selectedBook) return;

    // 🔥 FIX: Ubah endpoint dari 'books' ke 'buku' agar konsisten dengan fetch
    const url = `http://localhost:5000/admin/buku/${selectedBook.id}`;
    
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("author", formData.author); // Pastikan backend terima field 'author' (bukan 'penulis')
    dataToSend.append("description", formData.description);
    dataToSend.append("link", formData.link);
    dataToSend.append("kategori_id", formData.kategori_id);

    if (formData.gambar) {
      dataToSend.append("gambar", formData.gambar);
    }

    console.log("Mengirim data update ke:", url); // Debugging

    fetch(url, { method: 'PUT', body: dataToSend })
      .then(res => {
        if (!res.ok) throw new Error("Gagal melakukan update");
        return res.json();
      })
      .then(() => {
        console.log("Berhasil Update Buku");
        fetchBooks(); // Refresh Data
        setShowEditBookModal(false);
      })
      .catch(err => {
        console.error("Gagal Update:", err);
        alert("Gagal update buku. Cek console untuk detail.");
      });
  };


  // === 2. LOGIKA DELETE ===
  const handleConfirmDelete = () => {
    if (!selectedBook) return;

    // 🔥 FIX: Ubah endpoint dari 'books' ke 'buku'
    const url = `http://localhost:5000/admin/buku/${selectedBook.id}`;

    fetch(url, { method: 'DELETE' })
      .then(res => {
        // Handle response jika backend tidak mengembalikan JSON (misal status 204)
        if (res.ok) {
            return res.text().then(text => text ? JSON.parse(text) : {});
        }
        throw new Error("Gagal menghapus data");
      })
      .then(() => {
        setBooks(books.filter(b => b.id !== selectedBook.id));
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
      })
      .catch(err => {
        console.error("Gagal Hapus:", err);
        alert("Gagal menghapus buku. Cek console.");
      });
  };


  // === 3. LOGIKA UPDATE STATUS ===
  const updateStatus = (newStatus) => {
    if (!selectedBook) return;

    // 🔥 FIX: Endpoint disamakan ke 'buku'
    fetch(`http://localhost:5000/admin/buku/${selectedBook.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(() => {
        fetchBooks();
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
              <th className="p-3">Judul</th>
              <th className="p-3">Penulis Buku</th>
              <th className="p-3">Kategori Buku</th>
              <th className="p-3">Tautan</th>

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
              <tr><td colSpan="8" className="text-center py-5 text-gray-500">Tidak ada data buku.</td></tr>
            ) : (
              data.map((buku, i) => (
                <tr key={buku.id} className="border-b border-gray-200 hover:bg-amber-50">
                  <td className="py-3 px-3 text-center">{i + 1}</td>
                  <td className="py-3 px-3 font-medium">{buku.title}</td>
                  <td className="py-3 px-3">{buku.penulis}</td>

                  <td className="py-3 px-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs whitespace-nowrap">
                      {buku.kategori || '-'}
                    </span>
                  </td>

                  <td className="py-3 px-3 break-all max-w-[180px]">
                    <a href={buku.tautan} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Link
                    </a>
                  </td>

                  {activeTab === "verifikasi" && (
                    <>
                      <td className="py-3 px-3">{buku.submitter}</td>
                      <td className="py-3 px-3">{formatDate(buku.date)}</td>
                    </>
                  )}

                  <td className="py-3 px-3 text-center">
                    <TableActions
                      activeTab={activeTab}
                      onView={() => handleView(buku)}
                      onEdit={() => handleEdit(buku)}
                      onDelete={() => handleDelete(buku)}
                      onApprove={() => handleApprove(buku)}
                      onReject={() => handleReject(buku)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <DetailBuku isOpen={showDetailBuku} onClose={() => setShowDetailBuku(false)} book={selectedBook} />
      <DetailVerifikasiBuku isOpen={showDetailVerifikasi} onClose={() => setShowDetailVerifikasi(false)} book={selectedBook} />

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

      <EditBookModal
        key={selectedBook ? selectedBook.id : "edit"}
        isOpen={showEditBookModal}
        onClose={() => setShowEditBookModal(false)}
        onSubmit={handleEditSubmit} 
        initialData={selectedBook}
      />

      <KonfirmasiHapus isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} onConfirm={handleConfirmDelete} />
      <SuccessDeleteModal isOpen={showDeleteSuccess} onClose={() => setShowDeleteSuccess(false)} />
    </div>
  );
};

export default BookTableSection;