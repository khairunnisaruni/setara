import Sidebar from "../../sections/admin/Sidebar";
import Header from "../../sections/admin/Header";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col  bg-amber-50 min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
