import React, { useState } from "react";

export default function ModalAgenda({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) {
  if (!isOpen) return null;

  const [showTimePicker, setShowTimePicker] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = ["00", "15", "30", "45"];

  const selectedHour = formData.waktu.split(":")[0] || "08";
  const selectedMinute = formData.waktu.split(":")[1] || "00";

  const chooseTime = (h, m) => {
    setFormData({ ...formData, waktu: `${h}:${m}` });
    setShowTimePicker(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white w-[520px] rounded-2xl shadow-xl p-8 animate-fadeIn">
        <h2 className="text-xl font-semibold text-center mb-6">
          Tambah Agenda Baru
        </h2>

        <div className="flex flex-col gap-4">
          {/* Judul Kegiatan */}
          <div className="flex flex-col">
            <label className="font-medium text-[#3B3B3B] mb-1">
              Judul Kegiatan
            </label>
            <input
              type="text"
              placeholder="Contoh: Sesi Mengajar Literasi Dasar"
              value={formData.judul}
              onChange={(e) =>
                setFormData({ ...formData, judul: e.target.value })
              }
              className="px-4 py-2 bg-[#FFF7E8] border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FE9015] outline-none"
            />
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col">
            <label className="font-medium text-[#3B3B3B] mb-1">
              Deskripsi Kegiatan
            </label>
            <textarea
              placeholder="Masukkan deskripsi kegiatan"
              value={formData.deskripsi}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
              className="px-4 py-3 bg-[#FFF7E8] border border-gray-200 rounded-md resize-none h-24 focus:ring-2 focus:ring-[#FE9015] outline-none"
            ></textarea>
          </div>

          {/* Tanggal + Waktu */}
          <div className="flex gap-4">
            {/* Tanggal */}
            <div className="flex flex-col flex-1">
              <label className="font-medium text-[#3B3B3B] mb-1">Tanggal</label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) =>
                  setFormData({ ...formData, tanggal: e.target.value })
                }
                className="px-4 py-2 bg-[#FFF7E8] border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FE9015] outline-none"
              />
            </div>

            {/* Waktu + TIME PICKER POPUP */}
            <div className="flex flex-col flex-1 relative">
              <label className="font-medium text-[#3B3B3B] mb-1">Waktu</label>

              {/* Input Waktu */}
              <input
                type="text"
                readOnly
                placeholder="Pilih waktu"
                value={formData.waktu}
                onClick={() => setShowTimePicker(!showTimePicker)}
                className="px-4 py-2 bg-[#FFF7E8] border border-gray-200 rounded-md cursor-pointer focus:ring-2 focus:ring-[#FE9015] outline-none"
              />

              {/* Popup Time Picker */}
              {showTimePicker && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg p-4 z-[999]">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Hours */}
                    <div>
                      <p className="text-sm font-medium mb-2">Jam</p>
                      <div className="max-h-40 overflow-y-auto border rounded-md">
                        {hours.map((h) => (
                          <div
                            key={h}
                            onClick={() => chooseTime(h, selectedMinute)}
                            className={`px-3 py-2 cursor-pointer ${
                              h === selectedHour
                                ? "bg-[#FEF1DF] text-[#FE9015]"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Minutes */}
                    <div>
                      <p className="text-sm font-medium mb-2">Menit</p>
                      <div className="max-h-40 overflow-y-auto border rounded-md">
                        {minutes.map((m) => (
                          <div
                            key={m}
                            onClick={() => chooseTime(selectedHour, m)}
                            className={`px-3 py-2 cursor-pointer ${
                              m === selectedMinute
                                ? "bg-[#FEF1DF] text-[#FE9015]"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lokasi */}
          <div className="flex flex-col">
            <label className="font-medium text-[#3B3B3B] mb-1">Lokasi</label>
            <input
              type="text"
              placeholder="Desa Gonggu"
              value={formData.lokasi}
              onChange={(e) =>
                setFormData({ ...formData, lokasi: e.target.value })
              }
              className="px-4 py-2 bg-[#FFF7E8] border border-gray-200 rounded-md focus:ring-2 focus:ring-[#FE9015] outline-none"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={onSubmit}
            className="px-6 py-2 rounded-full bg-[#FE9015] hover:bg-[#e57f0f] text-white font-semibold"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
