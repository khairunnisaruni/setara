import { useState, useEffect } from "react";

const EditProgramModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // State Sesuai Database Baru
  const [formData, setFormData] = useState({
    judul_program: "",
    penyelenggara: "",
    jenis_program: "",
    lokasi_program: "",
    deskripsi_program: "",
    periode_tanggal: "",
    deadline_pendaftaran: "",
    status_program: "akan datang",
    tautan_sumber_resmi: "",
    poster_banner: null,
  });

  // Helper Tanggal
  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toISOString().split("T")[0];
  };

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          judul_program: initialData.judul_program || "",
          penyelenggara: initialData.penyelenggara || "",
          jenis_program: initialData.jenis_program || "",
          lokasi_program: initialData.lokasi_program || "",
          deskripsi_program: initialData.deskripsi_program || "",
          periode_tanggal: initialData.periode_tanggal || "",
          deadline_pendaftaran: formatDateForInput(initialData.deadline_pendaftaran) || "",
          status_program: initialData.status_program || "akan datang",
          tautan_sumber_resmi: initialData.tautan_sumber_resmi || "",
          poster_banner: null, 
        });
      } else {
        setFormData({
          judul_program: "", penyelenggara: "", jenis_program: "", lokasi_program: "",
          deskripsi_program: "", periode_tanggal: "", deadline_pendaftaran: "",
          status_program: "akan datang", tautan_sumber_resmi: "", poster_banner: null,
        });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // Handle Tombol Jenis Program
  const handleTypeSelect = (type) => {
    setFormData({ ...formData, jenis_program: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-base font-semibold text-center mb-4">
          {initialData ? "Edit Program" : "Tambahkan Program Baru"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Judul */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Judul Program</label>
            <input type="text" name="judul_program" value={formData.judul_program} onChange={handleChange} className="w-full p-2 border rounded-md text-sm" required />
          </div>

          {/* Penyelenggara */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Penyelenggara</label>
            <input type="text" name="penyelenggara" value={formData.penyelenggara} onChange={handleChange} className="w-full p-2 border rounded-md text-sm" required />
          </div>

          {/* Jenis Program */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Jenis Program</label>
            <div className="flex flex-wrap gap-2">
              {['Volunteer', 'Pengabdian Masyarakat', 'Beasiswa'].map((type) => (
                <button
                  key={type} type="button" onClick={() => handleTypeSelect(type)}
                  className={`text-xs px-3 py-1.5 rounded-md border font-medium ${formData.jenis_program === type ? "bg-amber-400 text-white border-amber-400" : "border-gray-300 text-gray-700"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Lokasi Program</label>
            <input type="text" name="lokasi_program" value={formData.lokasi_program} onChange={handleChange} className="w-full p-2 border rounded-md text-sm" />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea name="deskripsi_program" value={formData.deskripsi_program} onChange={handleChange} rows="3" className="w-full p-2 border rounded-md text-sm" />
          </div>

          {/* Periode */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Periode Tanggal</label>
            <input type="text" name="periode_tanggal" value={formData.periode_tanggal} onChange={handleChange} className="w-full p-2 border rounded-md text-sm" placeholder="Contoh: Januari - Juni 2025" />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Deadline Pendaftaran</label>
            <input type="date" name="deadline_pendaftaran" value={formData.deadline_pendaftaran} onChange={handleChange} className="w-full p-2 border rounded-md text-sm" />
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status Program</label>
            <select name="status_program" value={formData.status_program} onChange={handleChange} className="w-full p-2 border rounded-md text-sm">
                <option value="akan datang">Akan Datang</option>
                <option value="sedang dibuka">Sedang Dibuka</option>
                <option value="selesai">Selesai</option>
            </select>
          </div>

          {/* Link */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tautan Resmi</label>
            <input type="url" name="tautan_sumber_resmi" value={formData.tautan_sumber_resmi} onChange={handleChange} className="w-full p-2 border rounded-md text-sm" />
          </div>

          {/* Poster */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Poster / Banner</label>
            <input type="file" name="poster_banner" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded-md text-sm" />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm">Batal</button>
            <button type="submit" className="bg-amber-400 text-white px-4 py-2 rounded-md text-sm font-bold">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProgramModal;
