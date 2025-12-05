// src/components/DropDown.jsx
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const DropDown = ({ name, paths, item1, item2, item3 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // pastikan paths selalu array
  const normalizedPaths = Array.isArray(paths) ? paths : paths ? [paths] : [];

  // warna aktif kalau URL sekarang cocok salah satu path
  const isActive = normalizedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // susun daftar item + rutenya (maks 3)
  const items = [
    item1 && { label: item1, to: normalizedPaths[0] || "#" },
    item2 && { label: item2, to: normalizedPaths[1] || "#" },
    item3 && { label: item3, to: normalizedPaths[2] || "#" },
  ].filter(Boolean);

  const handleItemClick = (to) => {
    if (to && to !== "#") {
      navigate(to);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Tombol utama dropdown */}
      <div
        className={`flex items-center gap-x-2 cursor-pointer ${
          isActive ? "text-[#FF9500]" : "text-black"
        }`}
        onClick={toggleDropdown}
      >
        <div className="font-medium text-sm">{name}</div>
        <FaChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Isi dropdown */}
      {isOpen && (
        <div className="origin-top-left absolute left-0 mt-4 rounded-b-md shadow-lg bg-[#E7E1DA]">
          <div role="menu">
            {items.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleItemClick(item.to)}
                className="block w-full text-left py-2 px-5 text-sm font-medium hover:bg-gray-100 whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;