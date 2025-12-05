// src/components/admin/modals/Quiz/AddQuiz.jsx
import { useState } from "react";
import { Check } from "lucide-react";
import FailedModal from "../../modals/Failed";

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

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(formData);      // kirim data ke backend
      onClose();                     // tutup form input
      setShowSuccessPopup(true);     // tampilkan popup sukses

      // popup otomatis hilang setelah 2 detik
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000);
    } catch (error) {
      console.error("Gagal kirim kuis:", error);
      onClose();
      setShowFailedModal(true);
      setTimeout(() => setShowFailedModal(false), 2000);
    }
  };

  // komponen benar-benar hilang jika:
  // form tertutup DAN popup sukses/gagal tidak aktif
  if (!isOpen && !showSuccessPopup && !showFailedModal) return null;

  return (
    <>
      {/* FORM TAMBAH KUIS */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-center">
              Tambah Kuis & Game
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Judul */}
              <div>
                <label className="text-sm font-medium">
                  Judul Kuis & Game
                </label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 placeholder-[#B0AA9C]"
                  placeholder="Masukkan judul Kuis & Game"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="text-sm font-medium">
                  Deskripsi (15 Kata)
                </label>
                <textarea
                  name="description"
                  rows={2}
                  onChange={handleChange}
                  className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 placeholder-[#B0AA9C]"
                  placeholder="Deskripsi singkat tentang kuis & game"
                />
              </div>

              {/* Platform */}
              <div>
                <label className="text-sm font-medium">
                  Platform (Kahoot atau Wayground)
                </label>
                <select
                  name="platform"
                  onChange={handleChange}
                  defaultValue=""
                  className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400"
                >
                  <option
                    className="text-[#B0AA9C]"
                    value=""
                    disabled
                    hidden
                  >
                    Pilih Platform
                  </option>
                  <option value="kahoot">Kahoot</option>
                  <option value="wayground">Wayground</option>
                </select>
              </div>

              {/* Link */}
              <div>
                <label className="text-sm font-medium">Link Kuis</label>
                <input
                  type="url"
                  name="link"
                  onChange={handleChange}
                  className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] placeholder-[#B0AA9C] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400"
                  placeholder="Masukkan Link Kahoot atau Wayground"
                />
              </div>

              {/* Mata Pelajaran */}
              <div>
                <label className="text-sm font-medium">
                  Kategori Mata Pelajaran
                </label>
                <select
                  name="subjectCategory"
                  onChange={handleChange}
                  defaultValue=""
                  className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400"
                >
                  <option
                    className="text-[#B0AA9C]"
                    value=""
                    disabled
                    hidden
                  >
                    Pilih Mapel
                  </option>
                  <option value="bahasa-inggris">Bahasa Inggris</option>
                  <option value="matematika">Matematika</option>
                  <option value="ipa">IPA</option>
                  <option value="ips">IPS</option>
                </select>
              </div>

              {/* Kelas */}
              <div>
                <label className="text-sm font-medium">
                  Kategori Kelas
                </label>
                <select
                  name="classCategory"
                  onChange={handleChange}
                  defaultValue=""
                  className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400"
                >
                  <option
                    className="text-[#B0AA9C]"
                    value=""
                    disabled
                    hidden
                  >
                    Pilih Kelas
                  </option>
                  <option value="kelas-1">1 SD</option>
                  <option value="kelas-2">2 SD</option>
                  <option value="kelas-3">3 SD</option>
                  <option value="kelas-4">4 SD</option>
                  <option value="kelas-5">5 SD</option>
                  <option value="kelas-6">6 SD</option>
                </select>
              </div>

              {/* Upload Gambar */}
              <div>
                <label className="text-sm font-medium">
                  Upload Gambar Pendukung
                </label>
                <label className="flex items-center gap-2 w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] text-[#B0AA9C] rounded-xl px-3 py-2 cursor-pointer">
                  <img
                    src="src/assets/upload.png"
                    className="w-5"
                    alt="upload"
                  />
                  <span className="text-sm">
                    {formData.file ? formData.file.name : "Unggah File"}
                  </span>
                  <input
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* Tombol Aksi */}
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
      )}

      {/* POPUP SUKSES – bentuk sama seperti gambar di AddBuku */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white rounded-3xl shadow-2xl px-10 py-8 text-center max-w-sm w-full">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#22c55e] flex items-center justify-center">
              <Check size={30} className="text-white" />
            </div>
            <p className="font-semibold text-lg text-gray-900">
              Rekomendasi Kuis berhasil dibuat
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Mohon Menunggu Verifikasi Admin
            </p>
          </div>
        </div>
      )}

      {/* Popup gagal tetap pakai komponen existing */}
      <FailedModal
        isOpen={showFailedModal}
        onClose={() => setShowFailedModal(false)}
      />
    </>
  );
};

export default AddQuizModal;
