// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataProfil from "../sections/profile/DataProfil";
import RiwayatPostingan from "../sections/profile/RiwayatPostingan";
import NavbarVolunteer from "../components/NavbarVolunteer";
import Toast from "../components/Toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleSuccess = (msg = "Berhasil diperbarui!") => {
    setSuccessMessage(msg);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        const data = await response.json();
        if (!response.ok) {
          console.error("Gagal mengambil profil:", data);
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error("❌ Error fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bg-[#FBF8F4] min-h-screen p-8">
        <NavbarVolunteer />
        <p>Memuat profil...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-[#FBF8F4] min-h-screen p-8">
        <NavbarVolunteer />
        <p>Profil tidak ditemukan.</p>
      </div>
    );
  }

  const displayProfesi =
    profile.profesi === "pelajar"
      ? "Pelajar"
      : profile.profesi === "umum"
      ? "Umum"
      : profile.profesi === "admin"
      ? "Admin"
      : profile.profesi || "-";

  const displayGender =
    profile.gender === "laki-laki"
      ? "Pria"
      : profile.gender === "perempuan"
      ? "Wanita"
      : profile.gender || "-";

  const fotoDefault = "src/assets/profile.png";

  return (
    <div className="bg-[#FBF8F4] min-h-screen p-8">
      <NavbarVolunteer />
      <DataProfil
        potoProfil={profile.photo || fotoDefault}
        namaPengguna={profile.username}
        profesi={displayProfesi}
        nama={profile.name}
        jenisKelamin={displayGender}
        password={"********"}
        bio={profile.bio || "Belum ada bio."}
        onSuccess={handleSuccess}
        setToastMessage={setToastMessage}
        setToastType={setToastType}
      />
      <RiwayatPostingan />

      {showSuccessPopup && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-[9999] animate-fadeIn">
          {successMessage}
        </div>
      )}

      <Toast
        message={toastMessage}
        type={toastType}
        duration={3000}
        onClose={() => {
          setToastMessage("");
          setShowSuccessPopup(false);
        }}
      />
    </div>
  );
};

export default Profile;
