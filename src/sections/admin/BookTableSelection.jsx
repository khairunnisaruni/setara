import { useState } from "react";
import TableActions from "../../components/admin/TableActions";

// Import modal yang sudah kamu buat
import AddBuku from "../../components/admin/modals/AddBuku";
import Success from "../../components/admin/modals/Success";
import Failed from "../../components/admin/modals/Failed";

const BookTableSection = ({ activeTab, search }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

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
                <tr key={buku.id} className="border-b border-gray-200 hover:bg-amber-50 transition">
                  <td className="py-3 px-3 text-center">{i + 1}</td>
                  <td className="py-3 px-3">{buku.title}</td>
                  <td className="py-3 px-3">{buku.penulis}</td>
                  <td className="py-3 px-3">{buku.kategori}</td>
                  <td className="py-3 px-3 break-all max-w-[180px]">
                    <a href={`https://${buku.tautan}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
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
                      onApprove={() => setShowSuccessModal(true)}
                      onReject={() => setShowFailedModal(true)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {showAddModal && <AddBuku onClose={() => setShowAddModal(false)} />}
      {showSuccessModal && <Success onClose={() => setShowSuccessModal(false)} />}
      {showFailedModal && <Failed onClose={() => setShowFailedModal(false)} />}
    </div>
  );
};

export default BookTableSection;
