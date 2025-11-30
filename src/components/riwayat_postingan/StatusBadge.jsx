import React from "react";

const StatusBadge = ({ status }) => {
  const baseClass = "px-3 py-1 rounded-full text-xs font-semibold";

  let statusClass = "";
  switch (status) {
    case "Disetujui":
      statusClass = "bg-green-100 text-green-700";
      break;
    case "Ditolak":
      statusClass = "bg-red-100 text-red-700";
      break;
    case "Menunggu":
    default:
      statusClass = "bg-yellow-100 text-yellow-700";
      status = "Menunggu";
      break;  
      
  }

  return <span className={`${baseClass} ${statusClass}`}>{status}</span>;
};

export default StatusBadge;
