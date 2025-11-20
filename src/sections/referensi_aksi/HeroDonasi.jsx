import React from "react";

const HeroDonasi = () => {
  return (
    <section
    className="py-24 text-center px-4"
    style={{
        background: "linear-gradient(to right, rgba(255, 157, 1, 0.45), rgba(49, 123, 116, 0.45))",
    }}
    >
      <div  className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 64 64" fill="none">
            <path d="M50.6667 37.3333C54.64 33.44 58.6667 28.7733 58.6667 22.6667C58.6667 18.7768 57.1215 15.0463 54.3709 12.2958C51.6204 9.54523 47.8899 8 44 8C39.3067 8 36 9.33333 32 13.3333C28 9.33333 24.6934 8 20 8C16.1102 8 12.3797 9.54523 9.62914 12.2958C6.87861 15.0463 5.33337 18.7768 5.33337 22.6667C5.33337 28.8 9.33337 33.4667 13.3334 37.3333L32 56L50.6667 37.3333Z" stroke="white" stroke-width="5.33333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-[#317B74]">
        Bersama Wujudkan Akses Pendidikan yang Setara
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Dukung sekolah-sekolah yang membutuhkan bantuan fasilitas, buku, dan
        sarana belajar.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-all">
          Lihat Daftar Donasi
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 font-semibold px-6 py-2 rounded-lg transition-all">
          + Tambahkan Program Donasi
        </button>
      </div>
    </section>
  );
};

export default HeroDonasi;
