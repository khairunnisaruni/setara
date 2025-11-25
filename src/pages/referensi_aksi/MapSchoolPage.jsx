import React from "react";
import NavbarVolunteer from '../../components/NavbarVolunteer';
import HeaderMap from "../../sections/referensi_aksi/HeaderMap.jsx";
import MapSection from "../../sections/referensi_aksi/MapSection";

const MapSchoolPage = () => {
  return (
    <div className="min-h-screen bg-[#FBF8F4] w-full pb-12">
      <NavbarVolunteer />
      <div className="max-w-[1440px] mx-auto px-6 pt-24">   {/* tambahkan pt-24 */}
        <HeaderMap />
        <MapSection />
      </div>
    </div>
  );
};

export default MapSchoolPage;
