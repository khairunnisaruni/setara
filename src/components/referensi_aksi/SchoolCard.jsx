import { useNavigate } from "react-router-dom";

const SchoolCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-white hover:shadow-md transition">
      <img src={data.image} alt={data.name} className="w-full h-40 object-cover" />

      <div className="p-4">

        {/* Name + Status */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 text-base">{data.name}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full text-white ${
              data.visited ? "bg-[#317B74]" : "bg-[#AAAAAA] text-gray-700"
            }`}
          >
            {data.visited
              ? "Telah Dikunjungi Volunteer"
              : "Belum Ada Aktivitas Volunteer"}
          </span>
        </div>

        {/* School Type */}
        <span
          className={`inline-block mt-1 text-xs px-2 py-1 rounded-full text-white ${
            data.type === "Negeri" ? "bg-[#21C45D]" : "bg-purple-600"
          }`}
        >
          {data.type}
        </span>

        {/* Address */}
        <div className="text-sm text-gray-600 mt-2 flex items-center gap-1">
          {/* Location Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
            <path
              stroke="#6B7280"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 22s7-6.28 7-11.2A7 7 0 1 0 5 10.8C5 15.72 12 22 12 22z"
            />
            <circle cx="12" cy="10.8" r="3" stroke="#6B7280" strokeWidth="2" />
          </svg>
          {data.address}
        </div>

        {/* Accreditation + Detail Button */}
        <div className="mt-1 flex justify-between items-center text-sm text-gray-600">

          <div className="flex items-center gap-1">
            {/* Akreditasi Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 10.8563L10.425 11.7188C10.5625 11.8062 10.7 11.8033 10.8375 11.7098C10.975 11.6163 11.025 11.488 10.9875 11.325L10.6125 9.69375L11.8875 8.5875C12.0125 8.475 12.05 8.34075 12 8.18475C11.95 8.02875 11.8375 7.94425 11.6625 7.93125L9.99375 7.8L9.3375 6.2625C9.275 6.1125 9.1625 6.0375 9 6.0375C8.8375 6.0375 8.725 6.1125 8.6625 6.2625L8.00625 7.8L6.3375 7.93125C6.1625 7.94375 6.05 8.02825 6 8.18475C5.95 8.34125 5.9875 8.4755 6.1125 8.5875L7.3875 9.69375L7.0125 11.325C6.975 11.4875 7.025 11.6158 7.1625 11.7098C7.3 11.8038 7.4375 11.8068 7.575 11.7188L9 10.8563Z" fill="#6B7280"/>
              <path d="M6.4875 15H4.5C4.0875 15 3.7345 14.8533 3.441 14.5597C3.1475 14.2662 3.0005 13.913 3 13.5V11.5125L1.55625 10.05C1.41875 9.9 1.3125 9.7345 1.2375 9.5535C1.1625 9.3725 1.125 9.188 1.125 9C1.125 8.812 1.1625 8.62775 1.2375 8.44725C1.3125 8.26675 1.41875 8.101 1.55625 7.95L3 6.4875V4.5C3 4.0875 3.147 3.7345 3.441 3.441C3.735 3.1475 4.088 3.0005 4.5 3H6.4875L7.95 1.55625C8.1 1.41875 8.26575 1.3125 8.44725 1.2375C8.62875 1.1625 8.813 1.125 9 1.125C9.187 1.125 9.3715 1.1625 9.5535 1.2375C9.7355 1.3125 9.901 1.41875 10.05 1.55625L11.5125 3H13.5C13.9125 3 14.2657 3.147 14.5597 3.441C14.8538 3.735 15.0005 4.088 15 4.5V6.4875L16.4437 7.95C16.5812 8.1 16.6875 8.26575 16.7625 8.44725C16.8375 8.62875 16.875 8.813 16.875 9C16.875 9.187 16.8375 9.3715 16.7625 9.5535C16.6875 9.7355 16.5812 9.901 16.4437 10.05L15 11.5125V13.5C15 13.9125 14.8533 14.2657 14.5597 14.5597C14.2662 14.8538 13.913 15.0005 13.5 15H11.5125L10.05 16.4437C9.9 16.5812 9.7345 16.6875 9.5535 16.7625C9.3725 16.8375 9.188 16.875 9 16.875C8.812 16.875 8.62775 16.8375 8.44725 16.7625C8.26675 16.6875 8.101 16.5812 7.95 16.4437L6.4875 15ZM7.125 13.5L9 15.375L10.875 13.5H13.5V10.875L15.375 9L13.5 7.125V4.5H10.875L9 2.625L7.125 4.5H4.5V7.125L2.625 9L4.5 10.875V13.5H7.125Z" fill="#6B7280"/>
            </svg>
            Akreditasi {data.accreditation}
          </div>

          <button
            onClick={() => navigate(`/detail-school/${data.id}`, { state: data })}
            className="text-orange-500 hover:text-orange-600 font-semibold text-sm"
          >
            Lihat Detail →
          </button>
        </div>

      </div>
    </div>
  );
};

export default SchoolCard;
