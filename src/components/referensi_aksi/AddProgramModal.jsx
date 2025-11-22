import React from "react";

export default function AddProgramModal({ onClose, onSuccess }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose(); // Tutup modal dulu
    onSuccess(); // Tampilkan popup sukses
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl mx-4 overflow-y-auto max-h-[90vh] p-8 relative">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Judul */}
        <h2 className="text-lg font-bold text-gray-800 text-center mb-6">
          Tambahkan Program Baru
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm text-gray-700">
          <p className="text-gray-600 text-center">
            Bagikan informasi program yang kamu ketahui untuk membantu mahasiswa lain
          </p>

          <style>{`
            input::placeholder, textarea::placeholder, select::placeholder {
              color: #757570;
            }
          `}</style>

          <div className="space-y-3 mt-4">
            <label className="font-medium">Judul Program *</label>
            <input
              type="text"
              placeholder="Contoh: Program Kampus Mengajar Angkatan 7"
              className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />

            <label className="font-medium">Penyelenggara *</label>
            <input
              type="text"
              placeholder="Contoh: Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi"
              className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />

            <label className="font-medium">Jenis Program *</label>
            <select
              className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570]"
              defaultValue=""
              required
            >
              <option value="">Pilih Jenis Program</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Beasiswa">Beasiswa</option>
              <option value="Pengabdian">Pengabdian Masyarakat</option>
            </select>

            <label className="font-medium">Lokasi Program</label> 
            <input type="text" placeholder="Beri tahu dimana lokasi volunteer/pengabdian masyarakat" className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none" />

            <label className="font-medium">Deskripsi Program *</label>
            <textarea
              placeholder="Jelaskan deskripsi program ini"
              className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] h-24 placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />

            <label className="font-medium">Periode / Tanggal *</label> 
            <input type="text" placeholder="Contoh: Januari - Juni 2025" className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none" />

            <label className="font-medium">Deadline Pendaftaran *</label>
            <input
              type="date"
              className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />

            <label className="font-medium">Status Program *</label> 
            <select className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570]" > 
                <option>Akan Datang</option> 
                <option>Sedang Dibuka</option> 
                <option>Selesai</option> 
            </select>

            <label className="font-medium">Tautan ke sumber resmi program *</label> 
            <input type="url" placeholder="https://..." className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] placeholder-[#757570] focus:ring-2 focus:ring-orange-400 outline-none" /> 
            
            <label className="font-medium">Poster / Banner (Opsional)</label> 
            <input type="file" className="w-full border border-[#E7E1DA] rounded-xl p-3 bg-[#F8F4EA] text-[#757570] focus:ring-2 focus:ring-orange-400 outline-none" />
          </div>

          <div className="flex justify-end pt-4">
            <button
                className="mt-4 bg-[#FF9D01] text-white px-4 py-2 rounded-lg hover:bg-[#8a5500]"
                onClick={() => {
                    // Simulasi pengiriman data, lalu munculkan success popup
                    onSuccess(); // panggil fungsi di parent
                }}
                >
                Kirim Program
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
