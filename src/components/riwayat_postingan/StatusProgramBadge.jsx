const StatusProgramBadge = ({ status }) => {
  const baseClass = "inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold";

  let statusClass = "";

  switch (status) {
    case "Akan Datang":
      statusClass = "bg-blue-100 text-blue-700";
      break;
    case "Sedang Dibuka":
      statusClass = "bg-green-100 text-green-700";
      break;
    case "Selesai":
      statusClass = "bg-gray-200 text-gray-700";
      break;
    default:
      statusClass = "bg-gray-100 text-gray-600";
  }

  return <span className={`${baseClass} ${statusClass}`}>{status}</span>;
};

export default StatusProgramBadge;
