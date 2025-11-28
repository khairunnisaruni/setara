import { useState, useEffect } from "react";

const EditMateriModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    fileType: "",
    classCategory: "",
    materialCategory: "",
    description: "",
    file: null,
  });

  useEffect(() => {
    if (isOpen) {
      const dummyData = {
        title: "Materi Pecahan Dasar",
        fileType: "PDF",
        classCategory: "Kelas 4",
        materialCategory: "Materi Utama",
        description: "Penjelasan dasar tentang pecahan untuk kelas 4 SD.",
        file: null,
      };

      setFormData(dummyData);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileTypeChange = (type) => {
    setFormData({ ...formData, fileType: type });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📦 Data yang disubmit:", formData);
    if (onSubmit) onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-sm shadow-lg">
        <h2 className="text-base font-semibold mb-3 text-gray-800 text-center">
          Edit Materi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2 text-left">
          {/* Judul Materi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Judul Materi
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 "
              placeholder="Masukkan judul Materi"
            />
          </div>

          {/* Jenis File */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Jenis File
            </label>
            <div className="flex gap-2">
              {["PDF", "Audio", "Video"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleFileTypeChange(type)}
                  className={`px-3 py-1.5 rounded-md text-sm border transition font-medium ${
                    formData.fileType === type
                      ? "bg-amber-400 text-white border-amber-400"
                      : " text-gray-600 border-gray-300 hover:bg-amber-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Upload File */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Upload File (Opsional)
            </label>
            <input
              type="file"
              accept={
                formData.fileType === "PDF"
                  ? ".pdf"
                  : formData.fileType === "Audio"
                  ? "audio/*"
                  : formData.fileType === "Video"
                  ? "video/*"
                  : "*"
              }
              onChange={handleFileUpload}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700
                file:bg-amber-400 file:text-white file:border-none file:px-3 file:py-1.5
                file:rounded-md file:mr-2
                focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            />

            {(formData.file || formData.existingFileName) && (
              <p className="text-xs text-gray-600 mt-1">
                File dipilih: {formData.file?.name || "File lama"}
              </p>
            )}
          </div>

          {/* Kategori Pelajar */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Kategori Pelajar
            </label>
            <select
              name="classCategory"
              value={formData.classCategory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 "
            >
              <option value="">Pilih Kelas</option>
              <option value="Kelas 1">Kelas 1</option>
              <option value="Kelas 2">Kelas 2</option>
              <option value="Kelas 3">Kelas 3</option>
              <option value="Kelas 4">Kelas 4</option>
              <option value="Kelas 5">Kelas 5</option>
              <option value="Kelas 6">Kelas 6</option>
            </select>
          </div>

          {/* Jenis Kategori */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Jenis Kategori
            </label>
            <select
              name="materialCategory"
              value={formData.materialCategory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700 "
            >
              <option value="">Pilih Kategori</option>
              <option value="Materi Utama">Materi Utama</option>
              <option value="Materi Pendukung">Materi Pendukung</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Deskripsi singkat tentang materi"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className=" text-amber-500 text-sm px-4 py-1.5 rounded-md font-medium border border-gray-200 hover:bg-amber-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-amber-400 text-white text-sm px-4 py-1.5 rounded-md font-medium hover:bg-amber-500"
            >
              Perbarui
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMateriModal;
