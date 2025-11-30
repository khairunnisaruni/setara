import { useState, useEffect } from "react";
import TableActions from "../../components/admin/TableActions";

// Semua modal untuk Quiz
import DetailQuiz from "../../components/admin/modals/Quiz/DetailQuiz";
import DetailVerifikasiQuiz from "../../components/admin/modals/Quiz/DetailVerifikasiQuiz";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditQuizModal from "../../components/admin/modals/Quiz/EditQuiz";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";
import SuccessUpdateModal from "../../components/admin/modals/SuccessUpdate";

const QuizTableSection = ({ activeTab, search }) => {
  // State global untuk semua modal
  const [quizzes, setQuizzes] = useState([]);

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showDetailQuiz, setShowDetailQuiz] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditQuizModal, setShowEditQuizModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/admin/quiz')
      .then(response => response.json())
      .then(data => {
        console.log("Data Quiz:", data);
        setQuizzes(data);
      })
      .catch(error => console.error("Error fetching quiz:", error));
  }, []);

  const data = quizzes.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase());

    if (activeTab === "daftar") {
      return matchSearch && q.status === 'approved';
    } else {
      return matchSearch && q.status === 'pending';
    }
  });

  // Logic Eksekusi Approve/Reject
  const updateStatus = (newStatus) => {
    if (!selectedQuiz) return;

    fetch(`http://localhost:3000/admin/quiz/${selectedQuiz.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(() => {
        // Refresh data tanpa reload page
        // Pastikan kamu punya fungsi fetchQuizzes() di file ini
        fetch('http://localhost:3000/admin/quiz')
          .then(res => res.json())
          .then(data => setQuizzes(data));

        setShowAccepted(false);
        setShowRejected(false);
      })
      .catch(console.error);
  };

  const handleView = (quiz) => {
    setSelectedQuiz(quiz);
    if (activeTab === "daftar") setShowDetailQuiz(true);
    else setShowDetailVerifikasi(true);
  };

  const handleApprove = (quiz) => {
    setSelectedQuiz(quiz);
    setShowAccepted(true);
  };

  const handleReject = (quiz) => {
    setSelectedQuiz(quiz);
    setShowRejected(true);
  };

  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz);
    setShowEditQuizModal(true);
  };

  const handleDelete = (quiz) => {
    setSelectedQuiz(quiz);
    setShowDeleteConfirm(true);
  };



  const handleConfirmDelete = () => {
    if (!selectedQuiz) return;

    fetch(`http://localhost:3000/admin/quiz/${selectedQuiz.id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        // 1. Update tampilan (hapus dari state)
        const sisaQuiz = quizzes.filter(q => q.id !== selectedQuiz.id);
        setQuizzes(sisaQuiz);

        // 2. Tutup modal konfirmasi & Buka modal sukses
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
      })
      .catch(err => console.error("Gagal menghapus:", err));
  };

  const handleUpdateSubmit = (updatedData) => {
    if (!selectedQuiz) return;

    const payload = {
      title: updatedData.title,
      description: updatedData.description,
      platform: updatedData.platform,
      link: updatedData.link,
      kategori_id: parseInt(updatedData.kategori_id),
      kategori_kelas_id: parseInt(updatedData.kategori_kelas_id)
    };

    console.log("Sedang mengirim data ke Backend...", payload); // Cek ini nanti

    // 3. Kirim ke Backend
    fetch(`http://localhost:3000/admin/quiz/${selectedQuiz.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Sukses update:", data);


        fetch('http://localhost:3000/admin/quiz')
          .then(res => res.json())
          .then(data => setQuizzes(data));

        // 5. Tutup Modal
        setShowEditQuizModal(false);

        setShowUpdateSuccess(true);
      })
      .catch((err) => console.error("Gagal update:", err));
  };

  // Helper untuk format tanggal
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
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-full">
      {/* === TABEL === */}
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            {activeTab === "daftar" ? (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Quiz</th>
                <th className="p-3">Deskripsi</th>
                <th className="p-3">Platform</th>
                <th className="p-3">Tautan</th>
                <th className="p-3">Kategori Mapel</th>
                <th className="p-3">Kategori Kelas</th>
                <th className="p-3 text-center w-24">Aksi</th>
              </tr>
            ) : (
              <tr>
                <th className="p-3 text-center w-12">No</th>
                <th className="p-3">Judul Quiz</th>
                <th className="p-3">Deskripsi</th>
                <th className="p-3">Platform</th>
                <th className="p-3">Tautan</th>
                <th className="p-3">Kategori Mapel</th>
                <th className="p-3">Kategori Kelas</th>
                <th className="p-3">Disubmit oleh</th>
                <th className="p-3">Tanggal Submit</th>
                <th className="p-3 text-center w-32">Aksi</th>
              </tr>
            )}
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan="8" className="text-center py-5">Tidak ada data quiz.</td></tr>
            ) : (
              data
                .filter((q) => q.title.toLowerCase().includes(search.toLowerCase()))
                .map((quiz, i) => (
                  <tr
                    key={quiz.id}
                    className="border-b border-gray-200 hover:bg-amber-50 transition"
                  >
                    <td className="py-3 px-3 text-center">{i + 1}</td>
                    <td className="py-3 px-3">{quiz.title}</td>
                    <td className="py-3 px-3">{quiz.description}</td>
                    <td className="py-3 px-3">{quiz.platform}</td>
                    <td className="py-3 px-3 break-all max-w-[180px]">
                      <a
                        href={`https://${quiz.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {quiz.link}
                      </a>
                    </td>
                    <td className="py-3 px-3">{quiz.nama_kategori || '-'}</td>
                    <td className="py-3 px-3">{quiz.nama_kelas || '-'}</td>

                    {activeTab === "verifikasi" && (
                      <>
                        <td className="py-3 px-3">{quiz.nama_pengupload || '-'}</td>
                        <td className="py-3 px-3">{formatDate(quiz.created_at)}</td>
                      </>
                    )}

                    <td className="py-3 px-3 text-center">
                      <TableActions
                        activeTab={activeTab}
                        onView={() => handleView(quiz)}
                        onApprove={() => handleApprove(quiz)}
                        onReject={() => handleReject(quiz)}
                        onEdit={() => handleEdit(quiz)}
                        onDelete={() => handleDelete(quiz)}
                      />
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* === SEMUA MODAL DI SINI === */}

      {/* Detail Quiz */}
      <DetailQuiz
        isOpen={showDetailQuiz}
        onClose={() => setShowDetailQuiz(false)}
        quiz={selectedQuiz}
      />

      {/* Detail Verifikasi Quiz */}
      <DetailVerifikasiQuiz
        isOpen={showDetailVerifikasi}
        onClose={() => setShowDetailVerifikasi(false)}
        quiz={selectedQuiz}
      />

      {/* Accepted / Rejected */}
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

      {/* Edit Quiz */}
      <EditQuizModal
        isOpen={showEditQuizModal}
        onClose={() => setShowEditQuizModal(false)}
        onSubmit={handleUpdateSubmit}
        initialData={selectedQuiz}
        isEdit={true}
      />

      {/* Konfirmasi Hapus */}
      <KonfirmasiHapus
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Success Delete */}
      <SuccessDeleteModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />

      <SuccessUpdateModal
        isOpen={showUpdateSuccess}
        onClose={() => setShowUpdateSuccess(false)}
      />
    </div>
  );
};

export default QuizTableSection;
