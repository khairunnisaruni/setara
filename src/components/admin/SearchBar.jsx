import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Cari buku..." }) => (
  <div className="relative flex-1 min-w-[200px]">
    <Search
      size={18}
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded-lg pl-9 pr-3 py-2 w-full bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
    />
  </div>
);

export default SearchBar;
