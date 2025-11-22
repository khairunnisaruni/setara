import React from "react";

export default function AddDonasiModal({ onClose, onSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose(); // Tutup modal dulu
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-4xl mx-4 rounded-2xl shadow-lg overflow-y-auto max-h-[95vh] relative p-10">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-[22px] font-semibold text-center text-gray-800">
          Tambahkan Program Donasi
        </h2>

        <p className="text-center text-gray-600 mt-2 mb-8 text-sm">
          Bagikan informasi donasi dari lembaga resmi untuk membantu sesama
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-[15px] text-gray-700 text-left"
        >

          {/* JUDUL */}
          <label className="font-medium">Judul Donasi *</label>
          <input
            type="text"
            placeholder="Contoh: Donasi Buku Bacaan untuk Anak SD di Daerah Terpencil"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] 
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* KATEGORI */}
          <label className="font-medium">Kategori Donasi *</label>
          <select
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570]
             focus:ring-2 focus:ring-orange-400 outline-none"
            defaultValue=""
            required
          >
            <option value="" disabled>Pilih kategori donasi...</option>
            <option>Fasilitas Sekolah</option>
            <option>Beasiswa</option>
            <option>Kesehatan</option>
            <option>Pembangunan</option>
          </select>

          {/* PENERIMA MANFAAT */}
          <label className="font-medium">Penerima Manfaat *</label>
          <input
            type="text"
            placeholder="Contoh: Siswa SD Tapanuli, komunitas belajar usia 7–12 tahun"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] 
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* DESKRIPSI */}
          <label className="font-medium">Deskripsi Donasi *</label>
          <textarea
            placeholder="Tuliskan deskripsi tentang tujuan donasi..."
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] h-28 
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* POSTER */}
          <label className="font-medium">Poster / Banner Donasi (Opsional)</label>
          <input
            type="file"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]"
          />

          {/* DAMPAK */}
          <label className="font-medium">Dampak Donasi</label>
          <textarea
            placeholder="Bagaimana bantuan akan digunakan dan dampaknya bagi penerima manfaat"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] h-24 
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* DATE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Tanggal Mulai Donasi</label>
              <input
                type="date"
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="font-medium">Tanggal Selesai Donasi</label>
              <input
                type="date"
                className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
                focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          {/* TAUTAN */}
          <label className="font-medium">Tautan Resmi Donasi *</label>
          <input
            type="url"
            placeholder="https://..."
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* PENANGGUNG JAWAB */}
          <label className="font-medium">Penanggung Jawab Donasi *</label>
          <input
            type="text"
            placeholder="Nama penanggung jawab"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* CONTACT */}
          <label className="font-medium">Contact Person *</label>
          <input
            type="text"
            placeholder="Nomor atau email narahubung"
            className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA]
            placeholder:text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />

          {/* CHECKBOX */}
          <div className="flex items-start gap-2 mt-3">
            <input type="checkbox" required className="mt-[3px]" />
            <p className="text-sm text-gray-600 leading-relaxed">
              Saya menyatakan bahwa informasi donasi yang saya unggah bersifat benar, tidak menyesatkan, dan bersumber dari lembaga, organisasi, atau pihak yang dapat dipercaya. Setara tidak bertanggung jawab atas keaslian konten yang diunggah pengguna.
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="mt-2 w-full bg-[#FF9D01] text-white py-3 rounded-xl font-semibold 
              hover:bg-[#d97e00] transition-all"

              onClick={() => {
                    // Simulasi pengiriman data, lalu munculkan success popup
                    onSuccess(); // panggil fungsi di parent
                }}
            >
              Tambahkan Program Donasi
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
