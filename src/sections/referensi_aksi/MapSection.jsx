import React from "react";
import MapContainer from "../../components/referensi_aksi/MapContainer";
import SchoolList from "../../components/referensi_aksi/SchoolList";

const MapSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <MapContainer />
      <SchoolList />
    </div>
  );
};

export default MapSection;
