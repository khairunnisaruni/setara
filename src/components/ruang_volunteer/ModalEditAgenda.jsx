import React, { useState } from "react";

export default function ModalEditAgenda({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  onDelete,
}) {
  if (!isOpen) return null;

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Time picker
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

  const inputStyle =
    "px-4 py-2 bg-[#FFF7E8] border border-gray-200 rounded-md text-sm outline-none w-full";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      {/* MODAL EDIT */}
      <div className="bg-white w-[520px] rounded-2xl shadow-xl p-8 animate-fadeIn">
        <h2 className="text-xl font-semibold text-center mb-6">Edit Agenda</h2>

        <div className="flex flex-col gap-4">
          {/* Judul */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Judul Kegiatan</label>
            <input
              type="text"
              value={formData.judul}
              onChange={(e) =>
                setFormData({ ...formData, judul: e.target.value })
              }
              className={inputStyle}
            />
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Deskripsi Kegiatan</label>
            <textarea
              value={formData.deskripsi}
              onChange={(e) =>
                setFormData({ ...formData, deskripsi: e.target.value })
              }
              className={`${inputStyle} h-24 resize-none`}
            />
          </div>

          {/* Tanggal + Time Picker */}
          <div className="flex gap-4">
            {/* Tanggal */}
            <div className="flex flex-col flex-1">
              <label className="font-medium mb-1">Tanggal</label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) =>
                  setFormData({ ...formData, tanggal: e.target.value })
                }
                className={inputStyle}
              />
            </div>

            {/* Waktu */}
            <div className="flex flex-col flex-1 relative">
              <label className="font-medium mb-1">Waktu</label>

              <input
                type="text"
                readOnly
                value={formData.waktu}
                placeholder="Pilih waktu"
                onClick={() => setShowTimePicker(!showTimePicker)}
                className={`${inputStyle} cursor-pointer`}
              />

              {showTimePicker && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg p-4 z-[1000]">
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
            <label className="font-medium mb-1">Lokasi</label>
            <input
              type="text"
              value={formData.lokasi}
              onChange={(e) =>
                setFormData({ ...formData, lokasi: e.target.value })
              }
              className={inputStyle}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-8">
          {/* HAPUS */}
          <button
            onClick={() => setConfirmDelete(true)}
            className="px-6 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-50"
          >
            Hapus
          </button>

          <div className="flex gap-3">
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
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>

      {/* MODAL KONFIRMASI HAPUS */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1001]">
          <div className="bg-white w-[380px] p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-center mb-4">
              Hapus Agenda?
            </h3>

            <p className="text-center text-gray-600 mb-6">
              Agenda akan dihapus secara permanen.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                onClick={() => {
                  setConfirmDelete(false);
                  onDelete(); // ✅ ini memicu popup dari MainAGSection
                }}
                className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
