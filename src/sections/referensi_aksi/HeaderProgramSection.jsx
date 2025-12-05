// src/sections/referensi_aksi/HeaderProgramSection.jsx
import React, { useState } from "react";
import axios from "axios";
import SuccessPopup from "../../components/ruang_volunteer/notification/SuccessPopup";

const HeaderProgramSection = () => {

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  

  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    organizer: "",
    type: "Volunteer",
    location: "",
    description: "",
    period: "",
    deadline: "",
    statusProgram: "akan datang",
    sourceLink: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProgram = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // payload HARUS sama dengan yang dibaca controller createProgram
      const payload = {
        title: form.title,
        organizer: form.organizer,
        type: form.type,
        location: form.location,
        description: form.description,
        period: form.period,
        deadline: form.deadline,
        statusProgram: form.statusProgram,
        sourceLink: form.sourceLink,
      };

      // 🔹 Ambil token dari localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn(
          "Tidak ada token. Kamu mungkin belum login atau session sudah habis. Silakan login ulang."
        );
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/programs",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔥 kirim JWT ke backend
          },
        }
      );

      console.log("Program tersimpan:", res.data);
        setShowSuccessPopup(true);

        setTimeout(() => {
          setShowSuccessPopup(false);
          setIsOpen(false);
        }, 1500);


      // reset form
      setForm({
        title: "",
        organizer: "",
        type: "Volunteer",
        location: "",
        description: "",
        period: "",
        deadline: "",
        statusProgram: "akan datang",
        sourceLink: "",
      });

      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error saat simpan program:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER / HERO */}
      <section className="py-16 px-8 bg-gradient-to-r from-orange-200/70 to-teal-200/70 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#317B74]">
          Program Volunteer, Beasiswa, dan Aksi Sosial
        </h1>
        <p className="mt-3 max-w-2xl text-gray-700">
          Temukan berbagai program untuk mengajar, mengabdi, dan mendukung
          pendidikan yang lebih setara di seluruh Indonesia.
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() =>
              document
                .getElementById("daftar-program")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
          >
            Lihat Program Tersedia
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-white border border-gray-300 hover:bg-gray-50 font-semibold px-6 py-2 rounded-lg transition-all"
          >
            + Tambahkan Program
          </button>
        </div>
      </section>

      {/* MODAL TAMBAH PROGRAM */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-3 right-4 text-2xl font-bold cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Tambahkan Program Baru
            </h2>

            <form onSubmit={handleAddProgram} className="space-y-3">
              <div>
                <label className="text-sm font-medium">Judul Program</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Contoh: Volunteer Mengajar Satu Desa"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Penyelenggara</label>
                <input
                  type="text"
                  name="organizer"
                  value={form.organizer}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Contoh: Kemendikbud"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Jenis Program</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  >
                    <option value="Volunteer">Volunteer</option>
                    <option value="Beasiswa">Beasiswa</option>
                    <option value="Pengabdian Masyarakat">
                      Pengabdian Masyarakat
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Status Program</label>
                  <select
                    name="statusProgram"
                    value={form.statusProgram}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  >
                    <option value="akan datang">Akan Datang</option>
                    <option value="sedang dibuka">Sedang Dibuka</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Lokasi Program</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Contoh: Seluruh Indonesia / Medan / Online"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Periode Pelaksanaan
                </label>
                <input
                  type="text"
                  name="period"
                  value={form.period}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Contoh: April – Juni 2025"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Deadline Pendaftaran
                </label>
                <input
                  type="text"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="Contoh: 25 Maret 2025"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Link Sumber Resmi</label>
                <input
                  type="url"
                  name="sourceLink"
                  value={form.sourceLink}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  placeholder="https://..."
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Deskripsi Program</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                  rows={3}
                  placeholder="Ceritakan secara singkat tujuan dan kegiatan program"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-100"
                  disabled={loading}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Menyimpan..." : "Simpan Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SuccessPopup show={showSuccessPopup} entity="Program" />
    </>
  );

};

export default HeaderProgramSection;
