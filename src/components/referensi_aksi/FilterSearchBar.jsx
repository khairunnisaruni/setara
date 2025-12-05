import React from "react";
import { Search } from "lucide-react";

const FilterSearchBar = () => {
  return (
    <div className="w-full flex items-center gap-2">
      {/* Search Input */}
      <div className="flex-1 relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari Sekolah..."
          className="w-full bg-white border border-[#E5E7EB] rounded-lg pl-10 pr-4 py-3
          text-black placeholder-[#6B7280]
          focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400
          hover:border-orange-400 transition"
        />
      </div>

      {/* Filter Select */}
      <select
        className="border border-[#E5E7EB] rounded-lg px-3 py-3 w-56
        text-[#6B7280] bg-white
        focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400
        hover:border-orange-400 transition"
      >
        <option>Filter</option>
        <option>Telah dikunjungi Volunteer</option>
        <option>Belum ada aktivitas Volunteer</option>
      </select>
    </div>
  );
};

export default FilterSearchBar;
