import { useNavigate, useLocation } from "react-router-dom";
import SchoolHeaderSection from "../../sections/referensi_aksi/SchoolHeaderSection";
import SchoolInfoSection from "../../sections/referensi_aksi/SchoolInfoSection";
import SchoolGallerySection from "../../sections/referensi_aksi/SchoolGallerySection";

const DetailSchool = () => {
  const navigate = useNavigate();
  const { state } = useLocation();   // data dari navigate()

  // Kalau user masuk langsung lewat URL tanpa state
  if (!state) {
    return <div className="p-6">Data sekolah tidak ditemukan.</div>;
  }

  const data = state;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-800"
        >
          ← Kembali ke Peta
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-10">
        <SchoolHeaderSection data={data} />
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <SchoolInfoSection data={data} />
          </div>

          <div className="lg:col-span-1">
            <SchoolGallerySection data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSchool;
