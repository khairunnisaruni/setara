// src/components/NavbarVolunteer.jsx
import React, { useState, useEffect } from "react";
import { HiChevronDown, HiHome, HiBell, HiMenu, HiX } from "react-icons/hi";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function NavbarVolunteer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ambil data user dari localStorage saat navbar dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Gagal parse user dari localStorage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const displayName = user?.username || "User";
  const displayRole =
    user?.profesi === "pelajar"
      ? "Pelajar"
      : user?.profesi === "umum"
      ? "Volunteer"
      : user?.profesi || "Volunteer";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="w-full bg-[#F4F0EC] py-4 px-6 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT — LOGO */}
        <div className="flex items-center gap-2 cursor-pointer">
          <h1 className="text-xl font-bold text-[#2C2C2C]">SETARA</h1>
        </div>

        {/* HAMBURGER MOBILE */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* CENTER — NAVIGATION (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-[#2C2C2C]">
          <Dropdown
            label="Edukasi Interaktif"
            items={[
              { label: "Chatbot", link: "/edukasi-chatbot" },
              { label: "Kuis & Game", link: "/edukasi-kuis" },
            ]}
          />

          <Dropdown
            label="Ruang Volunteer"
            items={[
              { label: "Panduan Mengajar", link: "/volunteer-panduan-mengajar" },
              { label: "Pojok Buku", link: "/volunteer-pojok-buku" },
              { label: "Materi Multimedia", link: "/volunteer-materi-mengajar" },
              { label: "Agenda", link: "/volunteer-agenda" },
              { label: "Cerita Lapangan", link: "/volunteer-cerita-lapangan" },
            ]}
          />

          <Dropdown
            label="Referensi & Aksi"
            items={[
              { label: "Program Tersedia", link: "/referensi_aksi-program_tersedia" },
              { label: "Donasi", link: "/donasi" },
            ]}
          />

          {/* BERANDA */}
          <a
            href="/beranda"
            className={`flex items-center gap-1 ${
              location.pathname === "/beranda"
                ? "text-[#FE9015]"
                : "hover:text-[#FE9015]"
            }`}
          >
            <HiHome size={16} /> Beranda
          </a>

          {/* NOTIF */}
          <a
            href="#"
            className="flex items-center gap-1 hover:text-[#FE9015]"
          >
            <HiBell size={16} /> Notifikasi
          </a>
        </div>

        {/* RIGHT — PROFILE */}
        <div className="hidden lg:flex items-center gap-3 relative group cursor-pointer">
          <div className="flex flex-col text-right leading-tight">
            <span className="font-semibold">{displayName}</span>
            <span className="text-xs text-gray-500">{displayRole}</span>
          </div>

          <div
            className="w-10 h-10 rounded-full bg-linear-to-br 
        from-[#FFB54D] to-[#317B74] text-white flex items-center 
        justify-center font-bold"
          >
            {initial}
          </div>

          <div
            className="absolute right-0 top-12 invisible opacity-0 translate-y-2
            group-hover:visible group-hover:opacity-100 
            group-hover:translate-y-0 transition-all duration-200 
            bg-white shadow-xl rounded-lg p-3 w-40 z-20"
          >
            <Link to="/profile" className="block py-1 hover:text-[#FE9015]">
              Profil Saya
            </Link>

            <button
              onClick={handleLogout}
              className="block py-1 w-full text-left hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden mt-4 border-t border-gray-300 pt-4 space-y-4">
          <MobileDropdown
            label="Edukasi Interaktif"
            items={[
              { label: "Chatbot", link: "/edukasi-chatbot" },
              { label: "Kuis & Game", link: "/edukasi-kuis" },
              { label: "Donasi", link: "/donasi" },
            ]}
          />

          <MobileDropdown
            label="Ruang Volunteer"
            items={[
              { label: "Panduan Mengajar", link: "/volunteer-panduan-mengajar" },
              { label: "Pojok Buku", link: "/volunteer-pojok-buku" },
              { label: "Materi Multimedia", link: "/volunteer-materi-mengajar" },
              { label: "Agenda", link: "/volunteer-agenda" },
              { label: "Cerita Lapangan", link: "/volunteer-cerita-lapangan" },
            ]}
          />

          <MobileDropdown
            label="Referensi & Aksi"
            items={[
              { label: "Program Tersedia", link: "/program-terse-dia" },
              { label: "Peta Persebaran", link: "/peta-persebaran" },
              { label: "Donasi", link: "/donasi" },
            ]}
          />

          <a
            href="/"
            className={`block py-1 ${
              location.pathname === "/" ? "text-[#FE9015]" : ""
            }`}
          >
            Beranda
          </a>
          <a href="#" className="block py-1">
            Notifikasi
          </a>
        </div>
      )}
    </nav>
  );
}

/* ====================================================================================
   COMPONENT: DROPDOWN DESKTOP (ACTIVE + SMOOTH)
==================================================================================== */
function Dropdown({ label, items }) {
  const location = useLocation();

  const isActive = items.some((item) => item.link === location.pathname);

  return (
    <div className="relative group cursor-pointer">
      <div
        className={`flex items-center gap-1 ${
          isActive ? "text-[#FE9015]" : "hover:text-[#FE9015]"
        }`}
      >
        {label} <HiChevronDown size={16} />
      </div>

      <div
        className="absolute left-0 mt-2 invisible opacity-0 translate-y-2
          group-hover:visible group-hover:opacity-100 
          group-hover:translate-y-0 transition-all duration-200 
          bg-white shadow-xl rounded-lg p-3 w-56 z-20"
      >
        {items.map((item, i) => {
          const active = location.pathname === item.link;

          return (
            <a
              key={i}
              href={item.link}
              className={`block py-1 ${
                active
                  ? "text-[#FE9015] font-semibold"
                  : "hover:text-[#FE9015]"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
