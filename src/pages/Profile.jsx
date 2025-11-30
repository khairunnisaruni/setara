// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataProfil from "../sections/profile/DataProfil";
import RiwayatPostingan from "../sections/profile/RiwayatPostingan";
import NavbarVolunteer from "../components/NavbarVolunteer";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      // kalau belum login, redirect ke login
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
          // token tidak valid / kedaluwarsa
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

  // mapping tampilan
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
        password={"********"} // tidak menampilkan password asli
        bio={profile.bio || "Belum ada bio."}
      />
      <RiwayatPostingan />
    </div>
  );
};

export default Profile;
