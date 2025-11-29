import { useState } from "react";
import { Upload } from "lucide-react";
import FailedModal from "../../modals/Failed";
import SuccessModal from "../../modals/Success";

const AddQuizModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "",
    link: "",
    subjectCategory: "",
    classCategory: "",
    file: null,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(formData);
      onClose();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Gagal kirim kuis:", error);
      onClose();
      setShowFailedModal(true);
    }
  };

  // jangan hilang kalau masih ada popup
  if (!isOpen && !showSuccessModal && !showFailedModal) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
            {/* ...SELURUH isi form seperti yang sudah kamu punya... */}
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <FailedModal
        isOpen={showFailedModal}
        onClose={() => setShowFailedModal(false)}
      />
    </>
  );
};

export default AddQuizModal;
