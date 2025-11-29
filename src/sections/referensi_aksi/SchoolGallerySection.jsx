import GalleryCard from "../../components/referensi_aksi/GalleryCard";

const SchoolGallerySection = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h2 className="font-semibold text-lg text-gray-800 mb-3">
        Galeri Foto / Aktivitas Lapangan
      </h2>

      <button className="w-full bg-[#317B74] text-white text-sm py-2 rounded-lg hover:bg-[#2a6862] transition mb-4">
        + Tambahkan Foto / Cerita Lapangan
      </button>

      <div className="space-y-4">
        {data.gallery?.map((item, index) => (
          <GalleryCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SchoolGallerySection;
