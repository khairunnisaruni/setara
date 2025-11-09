import React from "react";

const TabsMenu = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "kuis", label: "Kuis & Game Interaktif" },
    { id: "buku", label: "Rekomendasi Buku" },
    { id: "multimedia", label: "Materi Multimedia" },
    { id: "cerita", label: "Cerita Lapangan" },
    { id: "program", label: "Program" },
    { id: "donasi", label: "Donasi" },
  ];

  return (
    <div className="flex gap-6 border-b border-gray-200 mb-4 text-sm font-semibold">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-2 transition ${
            activeTab === tab.id
              ? "text-[#FF9500] border-b-2 border-[#FF9500]"
              : "text-gray-600 hover:text-[#FF9500]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsMenu;
