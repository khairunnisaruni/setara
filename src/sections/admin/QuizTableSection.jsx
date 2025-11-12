import { useState } from "react";
import TableActions from "../../components/admin/TableActions";

// Semua modal untuk Quiz
import DetailQuiz from "../../components/admin/modals/Quiz/DetailQuiz";
import DetailVerifikasiQuiz from "../../components/admin/modals/Quiz/DetailVerifikasiQuiz";
import AcceptedModal from "../../components/admin/modals/Accepted";
import RejectedModal from "../../components/admin/modals/Rejected";
import EditQuizModal from "../../components/admin/modals/Quiz/EditQuiz";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const QuizTableSection = ({ activeTab, search }) => {
  // State global untuk semua modal
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [showDetailQuiz, setShowDetailQuiz] = useState(false);
  const [showDetailVerifikasi, setShowDetailVerifikasi] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showEditQuizModal, setShowEditQuizModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // === Data Dummy Quiz ===
  const daftarQuiz = [
    {
      id: 1,
      title: "Grammar Challenge",
      description: "Latihan dasar tata bahasa Inggris",
      platform: "Kahoot",
      link: "kahoot.com/grammar-101",
      subjectCategory: "Bahasa Inggris",
      classCategory: "Kelas 7",
    },
    {
      id: 2,
      title: "Hitung Cepat",
      description: "Tes kecepatan perhitungan dasar matematika",
      platform: "Quizizz",
      link: "quizizz.com/math-fast",
      subjectCategory: "Matematika",
      classCategory: "Kelas 6",
    },
    {
      id: 3,
      title: "Mengenal Tubuh Manusia",
      description: "Kuis tentang organ dan sistem tubuh manusia",
      platform: "Google Form",
      link: "forms.gle/sciencequiz",
      subjectCategory: "IPA",
      classCategory: "Kelas 8",
    },
    {
      id: 4,
      title: "Sejarah Indonesia",
      description: "Pertanyaan seputar perjuangan kemerdekaan Indonesia",
      platform: "Kahoot",
      link: "kahoot.com/sejarah-indo",
      subjectCategory: "IPS",
      classCategory: "Kelas 9",
    },
    {
      id: 5,
      title: "Puisi dan Maknanya",
      description: "Uji pemahaman terhadap karya sastra puisi",
      platform: "Quizizz",
      link: "quizizz.com/puisi",
      subjectCategory: "Sastra",
      classCategory: "Kelas 10",
    },
  ];

  const verifikasiQuiz = daftarQuiz.map((q) => ({
    ...q,
    submitter: "user_tes",
    date: "16-09-2005",
  }));

  const data = activeTab === "daftar" ? daftarQuiz : verifikasiQuiz;

  // ==== Handlers untuk aksi tombol ====
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

  const handleUpdateSubmit = (updatedData) => {
    console.log("Quiz diupdate:", updatedData);
    setShowEditQuizModal(false);
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
            {data
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
                  <td className="py-3 px-3">{quiz.subjectCategory}</td>
                  <td className="py-3 px-3">{quiz.classCategory}</td>

                  {activeTab === "verifikasi" && (
                    <>
                      <td className="py-3 px-3">{quiz.submitter}</td>
                      <td className="py-3 px-3">{quiz.date}</td>
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
              ))}
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
      />
      <RejectedModal
        isOpen={showRejected}
        onClose={() => setShowRejected(false)}
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
        onConfirm={() => {
          setShowDeleteConfirm(false);
          setShowDeleteSuccess(true);
        }}
      />

      {/* Success Delete */}
      <SuccessDeleteModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
};

export default QuizTableSection;
