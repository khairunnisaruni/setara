import React from "react"
import NavbarVolunteer from '../../components/NavbarVolunteer';
import HeaderProgramSection from "../../sections/referensi_aksi/HeaderProgramSection";
import FilterProgramSection from "../../sections/referensi_aksi/FilterProgramSection";
import ProgramListSection from "../../sections/referensi_aksi/ProgramListSection";

export default function ProgramTersedia() {
  return (
    <div className="bg-[#FAF8F4] min-h-screen text-[#323230]">
      <NavbarVolunteer />
      <HeaderProgramSection />
      <FilterProgramSection />
      <ProgramListSection />

      {/* Catatan */}
      <div className="text-center text-sm text-gray-600 pb-10">
        *Catatan: SETARA bertindak sebagai penghubung informasi. Semua proses
        pendaftaran dilakukan di situs resmi penyelenggara.
      </div>
    </div>
  );
}
