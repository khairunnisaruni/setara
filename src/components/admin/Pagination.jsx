import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => (
  <div className="flex flex-wrap justify-between items-center mt-4 text-sm text-gray-600">
    <span>Halaman 1 dari 1</span>
    <div className="flex gap-2 mt-2 sm:mt-0">
      <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition">
        <ChevronLeft size={16} />
        Sebelumnya
      </button>
      <button className="flex items-center gap-1 bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition">
        Selanjutnya
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

export default Pagination;
