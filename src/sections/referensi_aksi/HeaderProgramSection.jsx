import React, { useState } from "react";
import AddProgramButton from "../../components/referensi_aksi/AddProgramButton";
import AddProgramModal from "../../components/referensi_aksi/AddProgramModal";
import SuccessPopup from "../../components/referensi_aksi/SuccessPopup";

export default function HeaderProgramSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false); // Tutup modal
    setShowSuccess(true);  // Tampilkan popup sukses
  };

  return (
    <header
      className="relative flex justify-center items-center"
      style={{
        height: "397px",
        background:
          "linear-gradient(135deg, rgba(255,157,1,0.45) 0%, rgba(49,123,116,0.45) 100%)",
        padding: "80px 512px",
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

      {isModalOpen && (
        <AddProgramModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}

      {showSuccess && (
        <SuccessPopup onClose={() => setShowSuccess(false)} />
      )}
    </header>
  );
}
