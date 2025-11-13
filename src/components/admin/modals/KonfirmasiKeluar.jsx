import { Dialog } from "@headlessui/react";
import { LogOut, X } from "lucide-react";

const KonfirmasiKeluar = ({ isOpen, onClose }) => {
  const handleLogout = () => {
    // Tambahkan logika logout di sini (misal hapus token atau redirect)
    console.log("Logout berhasil");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 w-[360px] text-center">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-red-100 text-red-600 p-3 rounded-full mb-3">
            <LogOut size={28} />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Keluar dari akun?</h2>
          <p className="text-sm text-gray-500 mt-1">
            Apakah Anda yakin ingin keluar dari panel admin?
          </p>

          <div className="flex justify-center gap-3 mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
            >
              Batal
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
            >
              Keluar
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default KonfirmasiKeluar;
