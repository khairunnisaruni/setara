import SearchBar from "../../components/admin/SearchBar";
import FilterButton from "../../components/admin/FilterButton";

const InformasiToolbarSection = ({ search, setSearch, onAddClick }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <FilterButton />
        <button
          onClick={onAddClick} // ✅ langsung panggil
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg text-white"
        >
          + Tambah
        </button>
    </div>
  );
};

export default InformasiToolbarSection;
