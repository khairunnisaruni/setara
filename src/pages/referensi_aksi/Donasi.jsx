// src/pages/referensi_aksi/Donasi.jsx
import React, { useState } from "react";
import NavbarVolunteer from "../../components/NavbarVolunteer";
import HeroDonasi from "../../sections/referensi_aksi/HeroDonasi";
import DonasiFilterBar from "../../sections/referensi_aksi/DonasiFilterBar";
import ListDonasi from "../../sections/referensi_aksi/ListDonasi";

const Donasi = () => {
  // state untuk search dan dropdown
  const [searchText, setSearchText] = useState("");
  const [jenis, setJenis] = useState("Semua");
  const [status, setStatus] = useState("Semua");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar & Hero tetap seperti desain awal */}
      <NavbarVolunteer />
      <HeroDonasi />

      {/* Filter bar terhubung ke state di atas */}
      <DonasiFilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        jenis={jenis}
        onJenisChange={setJenis}
        status={status}
        onStatusChange={setStatus}
      />

      {/* List donasi menerima nilai filter & search */}
      <ListDonasi searchText={searchText} jenis={jenis} status={status} />

      {/* Catatan */}
      <footer className="text-center text-gray-500 text-sm mt-10 pb-6">
        <p>
          *Catatan: SETARA bertindak sebagai penghimpun informasi. Semua proses
          Donasi dilakukan di situs resmi penyelenggara.
        </p>
      </footer>
    </div>
  );
};

export default Donasi;
