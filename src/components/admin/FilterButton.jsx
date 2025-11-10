import { Filter } from "lucide-react";

const FilterButton = () => (
  <button className="flex items-center gap-2 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg text-gray-600 border">
    <Filter size={16} /> Filter
  </button>
);

export default FilterButton;
