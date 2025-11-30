import Sidebar from "../../sections/admin/Sidebar";
import Header from "../../sections/admin/Header";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col bg-amber-50 min-h-screen overflow-hidden">
        {/* Header */}
        <div className="shrink-0 w-full max-w-full">
          <Header />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
