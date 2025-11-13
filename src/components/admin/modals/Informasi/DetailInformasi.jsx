import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const DetailInformasi = ({ isOpen, onClose, info }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 w-[420px] relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Judul Modal */}
        <Dialog.Title className="text-xl font-bold text-center mb-5">
          Detail Panduan
        </Dialog.Title>

        {/* Isi Panduan */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 font-semibold">Judul Panduan</p>
            <p className="text-gray-800 font-medium">
              {info?.judul || "Cara Menggunakan Aplikasi BoycottBuddy"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 font-semibold">Deskripsi Panduan</p>
            <p className="text-gray-800 font-medium text-justify">
              {info?.deskripsi ||
                "Panduan ini menjelaskan langkah-langkah untuk menggunakan fitur utama aplikasi, mulai dari melakukan pencarian produk hingga memahami hasil deteksi merek yang termasuk dalam daftar boikot."}
            </p>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DetailInformasi;
