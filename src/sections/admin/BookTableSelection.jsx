import { useState } from "react";
import TableActions from "../../components/admin/TableActions";

// Semua modal
import DetailBuku from "../../components/admin/modals/Buku/DetailBuku";
import DetailVerifikasiBuku from "../../components/admin/modals/Buku/DetailVerifikasiBuku";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditBookModal from "../../components/admin/modals/Buku/EditBuku";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const BookTableSection = ({ activeTab, search }) => {
  // state global untuk semua modal
  const [selectedBook, setSelectedBook] = useState(null);

  const [showDetailBuku, setShowDetailBuku] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // contoh data dummy
  const daftarBuku = [
    { id: 1, title: "Learning Past Tenses", penulis: "Khairunnisa", kategori: "Bahasa Inggris", tautan: "www.bukunasional.com" },
    { id: 2, title: "Belajar Mengeja, Menulis, dan Menghitung", penulis: "Sadtria Prasetio", kategori: "Pelajaran Dasar", tautan: "www.bukunasional.com" },
    { id: 3, title: "Fun Fact: Introduction to Dinosaurus", penulis: "Janita Shanda", kategori: "Bahasa Inggris", tautan: "www.bukunasional.com" },
    { id: 4, title: "Pembelajaran Sains Dasar", penulis: "Pelangi S.S", kategori: "IPA", tautan: "www.bukunasional.com" },
    { id: 5, title: "Puisi", penulis: "Chika Ijah", kategori: "M. Nayaka P", tautan: "www.bukunasional.com" },
  ];

  const verifikasiBuku = daftarBuku.map((b) => ({
    ...b,
    submitter: "khairuntes",
    date: "16-09-2005",
  }));

  const data = activeTab === "daftar" ? daftarBuku : verifikasiBuku;

  // ==== Handlers untuk aksi tombol ====
  const handleView = (book) => {
    setSelectedBook(book);
    if (activeTab === "daftar") setShowDetailBuku(true);
    else setShowDetailVerifikasi(true);
  };

  const handleApprove = (book) => {
    setSelectedBook(book);
    setShowAccepted(true);
  };

  const handleReject = (book) => {
    setSelectedBook(book);
    setShowRejected(true);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowEditBookModal(true);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
    console.log("Buku dihapus:", selectedBook);
  };

  const handleUpdateSubmit = (updatedData) => {
    console.log("Buku diupdate:", updatedData);
    setShowEditBookModal(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full">
      {/* TABEL */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            {activeTab === "daftar" ? (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul</th>
                <th className="p-3">Penulis Buku</th>
                <th className="p-3">Kategori Buku</th>
                <th className="p-3">Tautan</th>
                <th className="p-3 text-center w-24">Aksi</th>
              </tr>
            ) : (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul</th>
                <th className="p-3">Penulis Buku</th>
                <th className="p-3">Kategori Buku</th>
                <th className="p-3">Tautan</th>
                <th className="p-3">Disubmit oleh</th>
                <th className="p-3">Tanggal Submit</th>
                <th className="p-3 text-center w-32">Aksi</th>
              </tr>
            )}
          </thead>

          <tbody>
            {data
              .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
              .map((buku, i) => (
                <tr
                  key={buku.id}
                  className="border-b border-gray-200 hover:bg-amber-50 transition"
                >
                  <td className="py-3 px-3 text-center">{i + 1}</td>
                  <td className="py-3 px-3">{buku.title}</td>
                  <td className="py-3 px-3">{buku.penulis}</td>
                  <td className="py-3 px-3">{buku.kategori}</td>
                  <td className="py-3 px-3 break-all max-w-[180px]">
                    <a
                      href={`https://${buku.tautan}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {buku.tautan}
                    </a>
                  </td>

                  {activeTab === "verifikasi" && (
                    <>
                      <td className="py-3 px-3">{buku.submitter}</td>
                      <td className="py-3 px-3">{buku.date}</td>
                    </>
                  )}

                  <td className="py-3 px-3 text-center">
                    <TableActions
                      activeTab={activeTab}
                      onView={() => handleView(buku)}
                      onApprove={() => handleApprove(buku)}
                      onReject={() => handleReject(buku)}
                      onEdit={() => handleEdit(buku)}
                      onDelete={() => handleDelete(buku)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* === SEMUA MODAL DI SINI === */}

      {/* Detail Buku */}
      <DetailBuku
        isOpen={showDetailBuku}
        onClose={() => setShowDetailBuku(false)}
        book={selectedBook}
      />

      {/* Detail Verifikasi */}
      <DetailVerifikasiBuku
        isOpen={showDetailVerifikasi}
        onClose={() => setShowDetailVerifikasi(false)}
        book={selectedBook}
      />

      {/* Accepted / Rejected */}
      <AcceptedModal
        isOpen={showAccepted}
        onClose={() => setShowAccepted(false)}
      />
      <RejectedModal
        isOpen={showRejected}
        onClose={() => setShowRejected(false)}
      />

      {/* Edit Buku */}
      <EditBookModal
        isOpen={showEditBookModal}
        onClose={() => setShowEditBookModal(false)}
        onSubmit={handleUpdateSubmit}
        initialData={selectedBook}
        isEdit={true}
      />

      {/* Konfirmasi Hapus */}
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

export default BookTableSection;
