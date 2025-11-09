import React, { useState } from "react";
import TabsMenu from "../../components/riwayat_postingan/TabsMenu";
import TabelKuisGame from "../../components/riwayat_postingan/TabelKuisGame";
import TabelRekomendasiBuku from "../../components/riwayat_postingan/TabelRekomendasiBuku";
import TabelMateriMultimedia from "../../components/riwayat_postingan/TabelMateriMultimedia";
import TabelCeritaLapangan from "../../components/riwayat_postingan/TabelCeritaLapangan";
import TabelProgram from "../../components/riwayat_postingan/TabelProgram";
import TabelDonasi from "../../components/riwayat_postingan/TabelDonasi";

const RiwayatPostingan = () => {
  const [activeTab, setActiveTab] = useState("kuis");

  const renderTable = () => {
    switch (activeTab) {
      case "kuis":
        return <TabelKuisGame />;
      case "buku":
        return <TabelRekomendasiBuku />;
      case "multimedia":
        return <TabelMateriMultimedia />;
      case "cerita":
        return <TabelCeritaLapangan />;
      case "program":
        return <TabelProgram />;
      case "donasi":
        return <TabelDonasi />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">Riwayat Postingan</h2>

      {/* TabsMenu */}
      <TabsMenu activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Konten tabel sesuai tab */}
      <div className="mt-6">{renderTable()}</div>
    </div>
  );
};

export default RiwayatPostingan;
