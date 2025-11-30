import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function CardCerita({ story }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-200 rounded-full"></div>
        <div>
          <h3 className="font-semibold text-[#3B3B3B]">{story.name}</h3>
          <p className="text-sm text-gray-500">{story.date}</p>
        </div>
      </div>

      <h2 className="mt-4 text-lg font-bold text-[#3B3B3B]">{story.title}</h2>

      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        {story.content}
      </p>

      <Link
        to="#"
        className="text-[#FE9015] font-semibold mt-4 inline-flex items-center gap-1"
      >
        Baca Selengkapnya <HiArrowRight />
      </Link>
    </div>
  );
}
