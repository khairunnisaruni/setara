// src/components/ruang_volunteer/notification/NotificationDropdown.jsx
import React, { useEffect, useState } from "react";
import { HiBell } from "react-icons/hi";

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil notifikasi dari backend saat navbar ditampilkan
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Tidak ada token, user belum login");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/notifications", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal mengambil notifikasi");
        }

        // pastikan notifikasi terbaru di paling atas
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setNotifications(sorted);
      } catch (err) {
        console.error("Gagal ambil notifikasi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const badgeCount = notifications.length;

  return (
    <div className="relative group">
      {/* TEXT + ICON */}
      <div className="flex items-center gap-1 cursor-pointer hover:text-[#FE9015]">
        <HiBell size={18} className="relative" />

        <span className="text-[15px] font-medium">Notifikasi</span>

        {/* BADGE */}
        {badgeCount > 0 && (
          <span className="bg-red-500 text-white text-[10px] px-1.5 py-px rounded-full">
            {badgeCount}
          </span>
        )}
      </div>

      {/* DROPDOWN */}
      <div
        className="
          absolute right-0 mt-3 w-80 
          bg-white shadow-xl rounded-xl p-3 
          z-50 border border-gray-100 
          opacity-0 invisible translate-y-2
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
          transition-all duration-200
        "
        style={{ animation: "fadeIn 0.25s ease-out" }}
      >
        {/* INTERNAL ANIMATION */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <h3 className="font-semibold text-gray-700 mb-2">Notifikasi</h3>

        <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
          {loading && (
            <p className="text-xs text-gray-500">Memuat notifikasi...</p>
          )}

          {!loading && notifications.length === 0 && (
            <p className="text-xs text-gray-500">
              Belum ada notifikasi untukmu.
            </p>
          )}

          {!loading &&
            notifications.map((notif, i) => (
              <div
                key={i}
                className="p-3 bg-[#F8F5F2] rounded-lg border border-gray-200 hover:bg-[#F1ECE8] transition"
              >
                <p className="font-semibold text-sm text-[#000000]">
                  {notif.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
