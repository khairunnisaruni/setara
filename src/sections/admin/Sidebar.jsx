import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  LogOut,
  FileText,
  Gamepad2,
  Heart,
  Layers,
  Info,
  DollarSign,
} from "lucide-react";

const Sidebar = () => {
  const sections = [
    {
      title: "Menu Utama",
      items: [
        { name: "Dashboard Utama", icon: <Home size={18} />, path: "/admin", exact: true },
        { name: "User Management", icon: <Users size={18} />, path: "/admin/users" },
      ],
    },
    {
      title: "Manajemen Konten",
      items: [
        { name: "Kuis & Game", icon: <Gamepad2 size={18} />, path: "/admin/quiz" },
        { name: "Rekomendasi Buku", icon: <BookOpen size={18} />, path: "/admin/buku" },
        { name: "Materi Multimedia", icon: <FileText size={18} />, path: "/admin/materials" },
        { name: "Cerita Lapangan", icon: <Layers size={18} />, path: "/admin/stories" },
        { name: "Program", icon: <Heart size={18} />, path: "/admin/programs" },
        { name: "Donasi", icon: <DollarSign size={18} />, path: "/admin/donations" },
      ],
    },
    {
      title: "Sistem",
      items: [
        { name: "Manajemen Informasi", icon: <Info size={18} />, path: "/admin/info" },
      ],
    },
  ];

  return (
    <aside className="min-w-64 bg-white border-r border-gray-200 h-screen flex flex-col justify-between shadow-sm">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 p-5 border-b border-gray-100">
          <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow">
            S
          </div>
          <div>
            <p className="font-semibold text-gray-800 leading-tight">SETARA</p>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-6 px-3">
          {sections.map((section, i) => (
            <div key={i}>
              <p className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item, j) => (
                  <NavLink
                    key={j}
                    to={item.path}
                    end={item.exact || false} // 🔹 Tambahkan "end" di sini
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-amber-50 text-amber-600 font-semibold border-l-4 border-amber-500"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-all">
          <LogOut size={18} /> Keluar
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
