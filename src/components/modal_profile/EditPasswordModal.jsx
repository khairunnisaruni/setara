// src/components/modal_profile/EditPasswordModal.jsx
import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import Toast from "../Toast";

const EditPasswordModal = ({ open, onClose, password }) => {
  if (!open) return null;

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setToastMessage("Semua field wajib diisi!");
      setToastType("error");
      return;
    }

    if (newPassword.length < 6) {
      setToastMessage("Password baru minimal 6 karakter!");
      setToastType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setToastMessage("Konfirmasi password tidak cocok!");
      setToastType("error");
      return;
    }


    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // alert("Sesi login berakhir. Silakan login ulang.");
        setToastMessage("Sesi login berakhir. Silakan login ulang!");
        setToastType("error");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });

      const data = await response.json();
      console.log("Response update password:", data);

      if (response.ok) {
        setToastMessage("Password berhasil diperbarui!");
        setToastType("success");
               
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          onClose();
        }, 2000); // biar toast muncul dulu
      } else {
        // alert(data.message || "Gagal mengupdate password");
        setToastMessage(data.message || "Gagal mengupdate password");
        setToastType("error");
      }
    } catch (error) {
      // console.error("❌ Error update password:", error);
      // alert("Terjadi kesalahan saat menghubungi server.");
      setToastMessage("Terjadi kesalahan saat menghubungi server!");
      setToastType("error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#FBF8F4] rounded-2xl p-8 w-[90%] max-w-sm shadow-lg">
        <h2 className="text-lg font-bold text-center mb-6">Edit Password</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Password Lama */}
          <div>
            <label className="font-semibold text-sm">Password Lama</label>
            <div className="relative mt-1">
              <input
                type={showOld ? "text" : "password"}
                className="w-full bg-[#F9F5EE] rounded-lg px-3 py-2 pr-10"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
              >
                {showOld ? (
                  <MdVisibility className="w-5 h-5" />
                ) : (
                  <MdVisibilityOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Password Baru */}
          <div>
            <label className="font-semibold text-sm">Password Baru</label>
            <div className="relative mt-1">
              <input
                type={showNew ? "text" : "password"}
                className="w-full bg-[#F9F5EE] rounded-lg px-3 py-2 pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
              >
                {showNew ? (
                  <MdVisibility className="w-5 h-5" />
                ) : (
                  <MdVisibilityOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="font-semibold text-sm">
              Konfirmasi Password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full bg-[#F9F5EE] rounded-lg px-3 py-2 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
              >
                {showConfirm ? (
                  <MdVisibility className="w-5 h-5" />
                ) : (
                  <MdVisibilityOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
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
        {toastMessage && (
          <Toast message={toastMessage} type={toastType} />
        )}

      </div>
    </div>
  );
};

export default EditPasswordModal;
