// src/sections/referensi_aksi/HeaderProgramSection.jsx
import React, { useState } from "react";
import axios from "axios";
import AddProgramButton from "../../components/referensi_aksi/AddProgramButton";
import AddProgramModal from "../../components/referensi_aksi/AddProgramModal";

export default function HeaderProgramSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProgram = async (formData) => {
    try {
      await axios.post("http://localhost:5000/api/programs", {
        title: formData.title,
        organizer: formData.organizer,
        programType: formData.programType,
        location: formData.location,
        description: formData.description,
        period: formData.period,
        deadline: formData.deadline,
        status: formData.status,
        link: formData.link,
        banner: formData.banner ? formData.banner.name : null,
        added_by: 1,
      });

      // kalau berhasil, cukup tutup modal saja
      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ Error saat simpan program:", error);
      alert("Gagal menyimpan program. Cek console/backend untuk detail.");
    }
  };

  return (
    <header
      className="relative flex justify-center items-center"
      style={{
        height: "410px",
        background:
          "linear-gradient(135deg, rgba(255,157,1,0.45) 0%, rgba(49,123,116,0.45) 100%)",
        padding: "80px 300px",
      }}
    >
      <div className="flex flex-col items-center text-center gap-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-[#317B74]">
          Program Tersedia di SETARA
        </h1>
        <p className="text-[#323230] text-base leading-relaxed">
          Temukan berbagai kesempatan untuk berkontribusi melalui program
          volunteer, beasiswa, dan pengabdian masyarakat.
        </p>
        <AddProgramButton onClick={() => setIsModalOpen(true)} />
      </div>

      <AddProgramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProgram}
      />
    </header>
  );
}