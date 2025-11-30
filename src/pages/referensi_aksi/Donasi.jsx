import React from "react"
import NavbarVolunteer from '../../components/NavbarVolunteer';
import HeroDonasi from "../../sections/referensi_aksi/HeroDonasi";
import DonasiFilterBar from "../../sections/referensi_aksi/DonasiFilterBar";
import ListDonasi from "../../sections/referensi_aksi/ListDonasi";


const Donasi = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarVolunteer />
      <HeroDonasi />
      <DonasiFilterBar />
      <ListDonasi />
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