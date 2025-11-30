// src/components/modal_profile/EditProfileModal.jsx
import React, { useState, useEffect } from "react";

const EditProfileModal = ({
  open,
  onClose,
  onSave,
  onSuccess,       
  namaPengguna,
  profesi,
  nama,
  jenisKelamin,
  bio,
}) => {

  const [formData, setFormData] = useState({
    username: "",
    profesi: "",
    name: "",
    gender: "",
    bio: "",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        username: namaPengguna || "",
        profesi: profesi || "",
        name: nama || "",
        gender: jenisKelamin || "",
        bio: bio || "",
      });
    }
  }, [open, namaPengguna, profesi, nama, jenisKelamin, bio]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const genderMapping = {
      Pria: "laki-laki",
      Wanita: "perempuan",
    };

    const profesiMapping = {
      Pelajar: "pelajar",
      Mahasiswa: "pelajar",
      Umum: "umum",
      Volunteer: "umum",
    };

    const payload = {
      name: formData.name,
      username: formData.username,
      bio: formData.bio,
      gender: genderMapping[formData.gender] || formData.gender,
      profesi: profesiMapping[formData.profesi] || formData.profesi,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Sesi login berakhir. Silakan login ulang.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response update profile:", data);

      if (response.ok) {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (onSave) onSave(data.user);
        if (onSuccess) onSuccess();   
        onClose();                    
      } else {
        alert(data.message || "Gagal mengupdate profil");
      }
    } catch (error) {
      console.error("❌ Error update profil:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 max-h-[90vh] overflow-y-auto animate-[fadeIn_.2s_ease]">
        <h2 className="text-lg font-bold text-center mb-6">Edit Profil</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold text-sm">Nama Pengguna</label>
            <input
              type="text"
              name="username"
              className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Profesi</label>
            <select
              name="profesi"
              className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1"
              value={formData.profesi}
              onChange={handleChange}
            >
              <option value="Pelajar">Pelajar</option>
              <option value="Umum">Umum</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-sm">Nama</label>
            <input
              type="text"
              name="name"
              className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Jenis Kelamin</label>
            <select
              name="gender"
              className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-sm">Bio</label>
            <textarea
              name="bio"
              className="w-full border border-[#E0DCD3] bg-[#F8F4EA] focus:ring-2 focus:ring-orange-400 rounded-xl px-3 py-2 mt-1 h-24"
              value={formData.bio}
              onChange={handleChange}
            />
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
