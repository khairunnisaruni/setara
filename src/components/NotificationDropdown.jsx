import React from "react";
import { HiBell } from "react-icons/hi";

export default function NotificationDropdown() {
  const notifications = [
    {
      title: "Materi Multimedia kamu telah diverifikasi Admin.",
      desc: "Materi kamu sudah terpublikasi dan dapat diakses.",
    },
    {
      title: "Program telah diverifikasi Admin.",
      desc: "Program kamu sudah terpublikasi dan siap diikuti peserta.",
    },
    {
      title: "Agenda Pelatihan Volunteer kamu telah tiba!",
      desc: "Ayo ikuti Agenda Pelatihan Volunteer kamu hari ini pada pukul 09:00–12:00 WIB • Zoom Meeting",
    },
  ];

  return (
    <div className="relative group">
      {/* TEXT + ICON */}
      <div className="flex items-center gap-1 cursor-pointer hover:text-[#FE9015]">
        <HiBell size={18} className="relative" />

        <span className="text-[15px] font-medium">Notifikasi</span>

        {/* BADGE */}
        <span className="bg-red-500 text-white text-[10px] px-1.5 py-px rounded-full">
          {notifications.length}
        </span>
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
          {notifications.map((notif, i) => (
            <div
              key={i}
              className="p-3 bg-[#F8F5F2] rounded-lg border border-gray-200 hover:bg-[#F1ECE8] transition"
            >
              <p className="font-semibold text-sm text-[#000000]">
                {notif.title}
              </p>
              <p className="text-xs text-gray-600 mt-1">{notif.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
