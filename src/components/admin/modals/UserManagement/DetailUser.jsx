import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

const DetailUser = ({ isOpen, onClose, user }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 w-[380px] relative">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Judul */}
        <Dialog.Title className="text-xl font-bold text-center mb-5">
          Detail User
        </Dialog.Title>

        {/* Foto Profil */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-orange-400 bg-gray-50"></div>
        </div>

        {/* Detail Info */}
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-400 font-semibold">Nama Lengkap</p>
            <p className="text-gray-800 font-medium">{user?.name || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400 font-semibold">Username</p>
            <p className="text-gray-800 font-medium">@{user?.username || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400 font-semibold">Email</p>
            <p className="text-gray-800 font-medium">{user?.email || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400 font-semibold">Jenis Kelamin</p>
            <p className="text-gray-800 font-medium">{user?.gender || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400 font-semibold">Profesi</p>
            <p className="text-gray-800 font-medium">{user?.profession || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400 font-semibold">Bio</p>
            <p className="text-gray-800 font-medium">
              {user?.bio ||
                "Passionate about learning new things and gaining new experiences"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 font-semibold">Tanggal Akun dibuat</p>
            <p className="text-gray-800 font-medium">
              {user?.createdAt || "16 September 2025"}
            </p>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DetailUser;
