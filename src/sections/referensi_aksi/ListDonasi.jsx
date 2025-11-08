import React from "react";
import DonasiCard from "../../components/referensi_aksi/DonasiCard";

const donasiData = [
  {
    id: 1,
    title: "Donasi Buku & Alat Tulis SD SDN 09 Sipirok",
    location: "SDN 09 Sipirok Tapanuli Selatan, Sumatera Utara",
    description:
      "Banyak sekolah belum memiliki sarapan, peralatan belajar lengkap dan alat olahraga. Donasi ini bertujuan mendukung partisipasi mereka.",
    category: "Edukasi dan Literasi",
    status: "Sedang Berjalan",
    image: "src/assets/DonasiBuku.png",
  },
  {
    id: 2,
    title: "Bantu Volunteer Ajar di Komunitas Cahaya Ilmu",
    location: "Relawan pengajar literasi di daerah pinggiran Medan",
    description:
      "Komunitas Cahaya Ilmu berdedikasi membantu anak-anak putus sekolah dengan kegiatan belajar dan dorongan untuk tetap semangat.",
    category: "Kegiatan Relawan & Volunteer",
    status: "Sedang Berjalan",
    image: "src/assets/BantuVolunteer.png",
  },
  {
    id: 3,
    title: "Bangun Sekolah SDN 102 Sei Rampah",
    location: "SDN 102 Sei Rampah",
    description:
      "SDN 102 Sei Rampah masih kekurangan fasilitas ruang kelas yang layak. Ayo bantu pembangunan ruang belajar yang nyaman.",
    category: "Fasilitas Belajar & Infrastruktur",
    status: "Sedang Berjalan",
    image: "src/assets/BangunSekolah.png",
  },
  {
    id: 4,
    title: "Bantuan Beasiswa Satu Anak Satu Harapan",
    location:
      "Pelajar berprestasi di daerah Tapanuli yang terkendala biaya sekolah",
    description:
      "Donasi ini membantu biaya sekolah, seragam, dan perlengkapan belajar bagi siswa SD–SMP yang kurang mampu agar tetap bersekolah.",
    category: "Beasiswa & Bantuan Pendidikan",
    status: "Sedang Berjalan",
    image: "src/assets/BantuanBeasiswa.png",
  },
  {
    id: 5,
    title: "Perbaikan Taman Baca Masyarakat ‘Harapan Baru’",
    location: "Komunitas Belajar Sei Agul, Medan",
    description:
      "Taman bacaan ini butuh renovasi untuk ruang baca anak. Bantuan dana dan peralatan bahan bacaan sangat dibutuhkan.",
    category: "Fasilitas Belajar & Infrastruktur",
    status: "Sedang Berjalan",
    image: "src/assets/PerbaikanTamanBaca.png",
  },
];

const ListDonasi = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 justify-items-center">
        {donasiData.map((item) => (
          <DonasiCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default ListDonasi;
