import React from "react";

export default function ModalCerita({
  isOpen,
  onClose,
  judul,
  setJudul,
  cerita,
  setCerita,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white w-[480px] rounded-2xl shadow-xl p-7">
        <h2 className="text-xl font-semibold text-[#3B3B3B] mb-5">
          Bagikan Cerita Anda
        </h2>

        {/* Judul */}
        <div className="flex flex-col mb-4">
          <label className="font-medium mb-1 text-[#3B3B3B]">
            Judul Cerita
          </label>
          <input
            type="text"
            placeholder="Masukkan judul cerita lapangan"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-[#FFF7E8] outline-none focus:ring-2 focus:ring-[#FE9015]"
          />
        </div>

        {/* Cerita */}
        <div className="flex flex-col mb-6">
          <label className="font-medium mb-1 text-[#3B3B3B]">Cerita Anda</label>
          <textarea
            placeholder="Bagikan pengalaman inspiratif Anda di lapangan"
            value={cerita}
            onChange={(e) => setCerita(e.target.value)}
            className="w-full px-4 py-3 h-32 border border-gray-200 rounded-md bg-[#FFF7E8] outline-none resize-none focus:ring-2 focus:ring-[#FE9015]"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Batal
          </button>

          <button
            onClick={onSubmit}
            className="px-6 py-2 rounded-full bg-[#FE9015] hover:bg-[#e57f0f] text-white font-semibold transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
