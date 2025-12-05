// src/pages/referensi_aksi/ProgramTersedia.jsx
import React, { useState } from "react";
import NavbarVolunteer from "../../components/NavbarVolunteer";
import HeaderProgramSection from "../../sections/referensi_aksi/HeaderProgramSection";
import FilterProgramSection from "../../sections/referensi_aksi/FilterProgramSection";
import ProgramListSection from "../../sections/referensi_aksi/ProgramListSection";

export default function ProgramTersedia() {
  const [searchText, setSearchText] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [status, setStatus] = useState("Semua");

  return (
    <div className="bg-[#FAF8F4] min-h-screen text-[#323230]">
      <NavbarVolunteer />
      <HeaderProgramSection />

      <FilterProgramSection
        searchText={searchText}
        onSearchChange={setSearchText}
        kategori={kategori}
        onKategoriChange={setKategori}
        status={status}
        onStatusChange={setStatus}
      />

      <ProgramListSection
        searchText={searchText}
        kategori={kategori}
        status={status}
      />

      {/* Catatan */}
      <div className="text-center text-sm text-gray-600 pb-10">
        *Catatan: SETARA bertindak sebagai penghubung informasi. Semua proses
        pendaftaran dilakukan di situs resmi penyelenggara.
      </div>
    </div>
  );
}