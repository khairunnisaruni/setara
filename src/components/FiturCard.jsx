import React from "react";
import { Link } from "react-router-dom";

const FiturCard = ({ icon, label, value, className = "", to, showPelajari }) => {
  return (
    <div className="flex flex-col py-8 px-8 w-full gap-y-4 border bg-white border-[#E7E1DA] rounded-xl text-black">

      <div className={`text-3xl w-12 h-12 flex justify-center items-center rounded-2xl
        bg-linear-to-r from-[#FF9500]/20 to-[#317C76]/20 ${className}`}>
        {icon}
      </div>

      <p className="text-xl font-bold">{label}</p>

      <p className="text-sm text-[#757570]">{value}</p>

      {/* LINK HANYA MUNCUL JIKA showPelajari = TRUE */}
      {showPelajari && to ? (
        <Link to={to} className="text-[#FF9500] font-medium">
          Pelajari →
        </Link>
      ) : null}

    </div>
  );
};

export default FiturCard;