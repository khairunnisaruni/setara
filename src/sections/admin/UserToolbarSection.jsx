// components/user/UserToolbarSection.jsx
import { Search, Filter } from "lucide-react";

const UserToolbarSection = ({ search, setSearch }) => {
  return (
    <div className="flex gap-3 mb-4">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Cari nama atau email..."
          className="border rounded-lg pl-9 pr-3 py-2 w-full bg-white  focus:outline-none focus:ring-2 focus:ring-amber-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className="flex items-center gap-2 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg border">
        <Filter size={16} /> Filter
      </button>
    </div>
  );
};

export default UserToolbarSection;
