import React, { useState, useRef } from 'react';
import { HiPencil } from "react-icons/hi";
import EditProfileModal from "../../components/modal_profile/EditProfileModal";
import EditPasswordModal from "../../components/modal_profile/EditPasswordModal";

const DataProfil = ({ potoProfil, namaPengguna, profesi, nama, jenisKelamin, password, bio }) => {
  const [openProfil, setOpenProfil] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(potoProfil); // untuk preview foto baru
  const fileInputRef = useRef(null); // referensi ke input file

  // buka file explorer
  const handlePencilClick = () => {
    fileInputRef.current.click();
  };

  // ganti foto dan preview langsung
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedPhoto(imageUrl);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row mb-10 gap-6 mt-15">
        {/* Bagian kiri: Foto & tombol */}
        <div className="flex items-center gap-10 shrink-0">
          <div className="relative">
            <div className="w-20 h-20 flex items-center justify-center rounded-full text-3xl font-bold overflow-hidden">
              <img src={selectedPhoto} alt="foto profil" className="w-full h-full object-cover" />
            </div>

            {/* Tombol ganti foto */}
            <button
              type="button"
              onClick={handlePencilClick}
              className="absolute bottom-0 right-0 bg-black/20 hover:bg-black/30 rounded-full p-1 cursor-pointer transition"
            >
              <HiPencil className="w-5 h-5 text-white" />
            </button>

            {/* Input file (disembunyikan) */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#343432]">{namaPengguna}</h2>
            <p className="text-gray-500">{profesi}</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setOpenProfil(true)}
                className="bg-[#FF9500] hover:bg-[#e68a00] text-white font-semibold px-4 py-1.5 rounded-full w-40 cursor-pointer"
              >
                Edit Profil
              </button>
              <button
                onClick={() => setOpenPassword(true)}
                className="border border-[#FF9500] text-[#FF9500] hover:bg-gray-50 font-semibold px-4 py-1.5 rounded-full w-40 cursor-pointer"
              >
                Edit Password
              </button>
            </div>
          </div>
        </div>

        {/* Bagian kanan: Detail Profil */}
        <div className="flex flex-col md:flex-row grow justify-between gap-8 md:items-start">
          <div className="hidden md:block w-px bg-gray-300 self-stretch"></div>

          <div className="w-1/3 text-sm text-gray-700 flex flex-col gap-8 my-auto">
            <p><span className="font-semibold">Nama:</span> {nama}</p>
            <p><span className="font-semibold">Jenis Kelamin:</span> {jenisKelamin}</p>
            <p className="flex items-center gap-1">
              <span className="font-semibold whitespace-nowrap">Kata Sandi:</span>
              <input type="password" readOnly value={password} className="bg-transparent border-none outline-none text-sm p-0 m-0" />
            </p>          
          </div>

          <div className="hidden md:block w-px bg-gray-300 self-stretch"></div>

          <div className="flex-1 text-sm text-gray-700">
            <p><span className="font-semibold">Bio:</span></p>
            <p className="text-justify">{bio}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal
        open={openProfil}
        onClose={() => setOpenProfil(false)}
        namaPengguna="Yono"
        profesi="Mahasiswa"
        nama="Yudyono Prasetio"
        jenisKelamin="Pria"
        bio="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
      <EditPasswordModal
        open={openPassword}
        onClose={() => setOpenPassword(false)}
        password="12345678"
      />
    </>
  );
};

export default DataProfil;
