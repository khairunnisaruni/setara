// pages/UserManagement.jsx
import { useState } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";
import UserToolbarSection from "../../sections/admin/UserToolbarSection";
import UserTableSection from "../../sections/admin/UserTableSection";
import Pagination from "../../components/admin/Pagination";

const UserManagement = () => {
  const [search, setSearch] = useState("");

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-gray-600 mt-1 mb-4">
          Kelola dan pantau data seluruh pengguna terdaftar
        </p>

        <UserToolbarSection search={search} setSearch={setSearch} />
        <UserTableSection search={search}/>

       {/* Pagination */}
        <Pagination />
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
