import { useState } from "react";
import TableActionsUser from "../../components/admin/TableActionsOther";
import DetailUser from "../../components/admin/modals/UserManagement/DetailUser";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const UserTableSection = ({ search = "" }) => {
  const [showDetailUser, setShowDetailUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // 🧩 Data dummy
  const users = [
    {
      id: 1,
      name: "Khairunnisa",
      username: "khairuntes",
      email: "khairunnisa@gmail.com",
      gender: "Perempuan",
      profession: "Pelajar",
      bio: "Passionate about learning new things and gaining new experiences",
      date: "16 September 2025",
    },
    {
      id: 2,
      name: "Budi Santoso",
      username: "budisantoso",
      email: "budi.santoso@email.com",
      gender: "Laki-laki",
      profession: "Guru",
      bio: "Helping students grow through education.",
      date: "20 Oktober 2025",
    },
  ];

  // 🔍 Filter berdasarkan search
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Saat klik tombol lihat detail
  const handleView = (user) => {
    setSelectedUser(user);
    setShowDetailUser(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

   const handleConfirmDelete = () => {
    setShowDeleteConfirm(false);
    setShowDeleteSuccess(true);
    console.log("User dihapus:", selectedBook);
  };

  return (
    <>
      {/* === TABEL USER === */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="border-b border-gray-100">
              <th className="p-3 w-12 font-semibold text-center">No</th>
              <th className="p-3 w-1/4 font-semibold">Nama Lengkap</th>
              <th className="p-3 w-1/3 font-semibold">Email</th>
              <th className="p-3 w-1/4 font-semibold">Tanggal Daftar</th>
              <th className="p-3 w-24 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 last:border-none hover:bg-amber-50 transition-colors duration-150"
              >
                <td className="py-4 px-3 text-gray-600 text-center">{i + 1}</td>
                <td className="py-4 px-3 text-gray-600">{user.name}</td>
                <td className="py-4 px-3 text-gray-600">{user.email}</td>
                <td className="py-4 px-3 text-gray-600">{user.date}</td>
                <td className="py-4 px-3 text-center">
                  <TableActionsUser 
                  onView={() => handleView(user)} 
                  onDelete={() => handleDelete(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === MODAL DETAIL USER === */}
      <DetailUser
        isOpen={showDetailUser}
        onClose={() => setShowDetailUser(false)}
        user={selectedUser}
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
    </>
  );
};

export default UserTableSection;
