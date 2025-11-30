import { useState, useEffect } from "react";
import TableActionsUser from "../../components/admin/TableActionsOther";
import DetailUser from "../../components/admin/modals/UserManagement/DetailUser";
import KonfirmasiHapus from "../../components/admin/modals/KonfirmasiHapus";
import SuccessDeleteModal from "../../components/admin/modals/SuccessDelete";

const UserTableSection = ({ search = "" }) => {
  const [users, setUsers] = useState([]);

  const [showDetailUser, setShowDetailUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  useEffect(() => {
    // UBAH URL DISINI:
    fetch('http://localhost:3000/admin/users') // <--- Tambahkan /admin
      .then(response => response.json())
      .then(data => {
        console.log("Data dari DB:", data);
        setUsers(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);


  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "-"; 
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowDetailUser(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    // 1. Cek apakah ada user yang dipilih
    if (!selectedUser) return;

    // 2. Kirim perintah DELETE ke Backend
    fetch(`http://localhost:3000/admin/users/${selectedUser.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Berhasil hapus:", data);

        // 3. Update tampilan Tabel secara langsung (tanpa refresh halaman)
        // Kita buang user yang id-nya sama dengan yang dihapus
        const sisaUser = users.filter(u => u.id !== selectedUser.id);
        setUsers(sisaUser);

        // 4. Tutup modal konfirmasi & Buka modal sukses
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
      })
      .catch((err) => console.error("Gagal menghapus:", err));
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
                <td className="py-4 px-3 text-gray-600">{formatDate(user.created_at)}</td>
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
        onConfirm={handleConfirmDelete} 
      />

      <SuccessDeleteModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />
    </>
  );
};

export default UserTableSection;
