import {
  MapPin,
  Phone,
  Mail,
  BadgeCheck,
  School,
  Tag
} from "lucide-react";

const SchoolInfoSection = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 className="font-semibold text-lg text-gray-800 mb-3">
        Informasi Dasar Sekolah
      </h2>

      {/* Address */}
      <div className="flex items-start gap-2 text-sm">
        <MapPin size={18} className="text-gray-600 mt-0.5" />
        <div>
          <p className="text-gray-800">{data.address}</p>
        </div>
      </div>

      {/* NPSN */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <Tag size={18} className="text-gray-600" />
        NPSN: {data.npsn}
      </div>

      {/* Type */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <School size={18} className="text-gray-600" />
        Bentuk Pendidikan: {data.educationType}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-sm">
        <BadgeCheck size={18} className="text-green-600" />
        <span
          className={`text-xs px-2 py-1 rounded-full text-white ${
            data.type === "Negeri" ? "bg-[#21C45D]" : "bg-purple-600"
          }`}
        >
          {data.type}
        </span>
      </div>

      {/* Accreditation */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <BadgeCheck size={18} className="text-gray-600" />
        Akreditasi: {data.accreditation}
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <Phone size={18} className="text-gray-600" />
        {data.phone}
      </div>

      {/* Email */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <Mail size={18} className="text-gray-600" />
        {data.email}
      </div>
    </div>
  );
};

export default SchoolInfoSection;
