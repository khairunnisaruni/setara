import { FaBookOpen, FaUsers, FaGraduationCap } from "react-icons/fa";

const JenisProgramBadge = ({ jenis }) => {
  const baseClass = "inline-flex items-center whitespace-nowrap flex items-center gap-1 text-[#FF9500] font-semibold";

  const renderIcon = () => {
    switch (jenis) {
      case "Volunteer":
        return <FaUsers className="text-[#FF9500] text-2xl" />;
      case "Pengabdian Masyarakat":
        return <FaBookOpen className="text-[#FF9500] text-2xl" />;
      case "Beasiswa":
        return <FaGraduationCap className="text-[#FF9500] text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <div className={baseClass}>
      {renderIcon()}
      <span>{jenis}</span>
    </div>
  );
};

export default JenisProgramBadge;
