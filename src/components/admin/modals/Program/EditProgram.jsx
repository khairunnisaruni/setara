import { useState, useEffect } from "react";

const EditProgramModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    organizer: "",
    programType: "",
    location: "",
    description: "",
    period: "",
    deadline: "",
    status: "",
    link: "",
    banner: null,
  });

  // Saat modal dibuka, isi dengan data dummy
  useEffect(() => {
    if (isOpen) {
      const dummyData = {
        title: "Program Kampus Mengajar Angkatan 7",
        organizer:
          "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi",
        programType: "Volunteer",
        location: "Seluruh Indonesia",
        description:
          "Program pengabdian masyarakat yang memberikan kesempatan mahasiswa untuk membantu proses pembelajaran di sekolah dasar.",
        period: "Januari - Juni 2025",
        deadline: "2024-12-31",
        status: "Akan Datang",
        link: "https://kampusmerdeka.kemdikbud.go.id",
        banner: null,
      };
      setFormData(dummyData);
    }
  }, [isOpen]);

  // Handle perubahan input teks & file
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle klik tombol jenis program
  const handleProgramTypeChange = (type) => {
    setFormData({ ...formData, programType: type });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📦 Data program yang diperbarui:", formData);
    if (onSubmit) onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl p-4 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-base font-semibold mb-3 text-gray-800 text-center">
          Edit Program
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2 text-left">
          {/* Judul Program */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Judul Program
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Contoh: Program Kampus Mengajar Angkatan 7"
            />
          </div>

          {/* Penyelenggara */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Penyelenggara
            </label>
            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Contoh: Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi"
            />
          </div>

          {/* Jenis Program (pakai tombol seperti EditMateri) */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Jenis Program
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Volunteer",
                "Pengabdian Masyarakat",
                "Beasiswa",
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleProgramTypeChange(type)}
                  className={`px-3 py-1.5 rounded-md text-sm border transition font-medium ${
                    formData.programType === type
                      ? "bg-amber-400 text-white border-amber-400"
                      : "text-gray-600 border-gray-300 hover:bg-amber-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Lokasi Program */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Lokasi Program
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Beri tahu dimana lokasi volunteer/pengabdian masyarakat"
            />
          </div>

          {/* Deskripsi Program */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Deskripsi Program
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Jelaskan deskripsi program ini"
            />
          </div>

          {/* Periode */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Periode / Tanggal
            </label>
            <input
              type="text"
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="Contoh: Januari - Juni 2025"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Deadline Pendaftaran
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Status Program
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-700"
            >
              <option value="Akan Datang">Akan Datang</option>
              <option value="Sedang Berjalan">Sedang Berjalan</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          {/* Tautan Resmi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Tautan ke sumber resmi program
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
              placeholder="https://..."
            />
          </div>

          {/* Poster / Banner */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Poster / Banner
            </label>
            <input
              type="file"
              name="banner"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="text-amber-500 text-sm px-4 py-1.5 rounded-md font-medium border border-gray-200 hover:bg-amber-50"
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

export default EditProgramModal;
