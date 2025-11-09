import React from "react";
import { FiClock, FiCalendar, FiVideo } from "react-icons/fi";

export default function CardAgenda({ title, date, time, method }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>

      {/* Tanggal */}
      <div className="flex items-center gap-2 mt-3 text-gray-700 text-sm">
        <FiCalendar size={16} />
        {date}
      </div>

      {/* Waktu */}
      <div className="flex items-center gap-2 mt-2 text-gray-700 text-sm">
        <FiClock size={16} />
        {time}
      </div>

      {/* Cara / Metode */}
      <div className="flex items-center gap-2 mt-2 text-gray-700 text-sm">
        <FiVideo size={16} />
        {method}
      </div>
    </div>
  );
}
