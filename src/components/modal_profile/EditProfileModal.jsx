import React from 'react';

const EditProfileModal = ({ open, onClose, namaPengguna, profesi, nama, jenisKelamin, bio }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 max-h-[90vh] overflow-y-auto animate-[fadeIn_.2s_ease]">
        <h2 className="text-lg font-bold text-center mb-6">Edit Profil</h2>

        <form className="flex flex-col gap-4">
          <div>
            <label className="font-semibold text-sm">Nama Pengguna</label>
            <input type="text" className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1" defaultValue={namaPengguna} />
          </div>
          <div>
            <label className="font-semibold text-sm">Profesi</label>
            <input type="text" className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1" defaultValue={profesi} />
          </div>
          <div>
            <label className="font-semibold text-sm">Nama</label>
            <input type="text" className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1" defaultValue={nama} />
          </div>
          <div>
            <label className="font-semibold text-sm">Jenis Kelamin</label>
            <input type="text" className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1" defaultValue={jenisKelamin} />
          </div>
          <div>
            <label className="font-semibold text-sm">Bio</label>
            <textarea className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1 h-24" defaultValue={bio} />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="font-bold px-4 py-2 w-36 rounded-xl border border-gray-300 hover:bg-gray-100 text-[#FFA01A]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="font-bold px-4 py-2 w-36 bg-orange-500 text-white rounded-xl hover:bg-orange-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
