import React from "react";

export default function ModalRincianAgenda({ isOpen, onClose, data, onEdit }) {
  if (!isOpen || !data) return null;

  const inputStyle =
    "px-4 py-2 bg-[#FFF7E8] border border-gray-200 rounded-md text-sm outline-none w-full";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white w-[520px] rounded-2xl shadow-xl p-8 animate-fadeIn">
        <h2 className="text-xl font-semibold text-center mb-6">
          Rincian Agenda
        </h2>

        <div className="flex flex-col gap-4">
          {/* Judul */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Judul Kegiatan</label>
            <input
              type="text"
              value={data.judul}
              className={inputStyle}
              disabled
            />
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Deskripsi Kegiatan</label>
            <textarea
              value={data.deskripsi}
              className={`${inputStyle} h-24 resize-none`}
              disabled
            />
          </div>

          {/* Tanggal + Waktu */}
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="font-medium mb-1">Tanggal</label>
              <input
                type="text"
                value={data.tanggal}
                className={inputStyle}
                disabled
              />
            </div>

            <div className="flex flex-col flex-1">
              <label className="font-medium mb-1">Waktu</label>
              <input
                type="text"
                value={data.waktu}
                className={inputStyle}
                disabled
              />
            </div>
          </div>

          {/* Lokasi */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Lokasi</label>
            <input
              type="text"
              value={data.lokasi}
              className={inputStyle}
              disabled
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={onEdit}
            className="px-6 py-2 rounded-full bg-[#FE9015] hover:bg-[#e57f0f] text-white font-semibold"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
