import SchoolCard from "./SchoolCard";

const dummySchools = [
  {
    id: 1,
    name: "Sekolah Dasar Negeri 060884",
    type: "Negeri",
    address: "Jl. Diponegoro No. 74, Jakarta Pusat",
    accreditation: "A",
    visited: true,
    image: "src/assets/sekolah1.png",
  },
  {
    id: 2,
    name: "SD",
    type: "Swasta",
    address: "Jl. Sudirman No. 52-53, Jakarta Selatan",
    accreditation: "A",
    visited: false,
    image: "src/assets/sekolah1.png",
  },
  {
    id: 2,
    name: "SD",
    type: "Swasta",
    address: "Jl. Sudirman No. 52-53, Jakarta Selatan",
    accreditation: "A",
    visited: false,
    image: "src/assets/sekolah1.png",
  },
];

const SchoolList = () => {
  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-3 pb-6">
      <h2 className="text-lg font-semibold mb-2">Sekolah Terdekat</h2>

      {dummySchools.map((school) => (
        <SchoolCard key={school.id} data={school} />
      ))}
    </div>
  );
};

export default SchoolList;
