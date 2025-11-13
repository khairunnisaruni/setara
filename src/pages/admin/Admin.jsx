import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BookOpen,
  Gamepad2,
  FileText,
  Film,
  Heart,
  HandHeart,
} from "lucide-react";
import { useState } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";

// Import semua modal tambah
import AddQuizModal from "../../components/admin/modals/Quiz/AddQuiz";
import AddBukuModal from "../../components/admin/modals/Buku/AddBuku";
import AddMultimediaModal from "../../components/admin/modals/Materi/AddMateri";
import AddPanduanModal from "../../components/admin/modals/Informasi/AddInformasi";
import AddProgramModal from "../../components/admin/modals/Program/AddProgram";
import AddDonasiModal from "../../components/admin/modals/Donasi/AddDonasi";

const DashboardUtama = () => {
  // State untuk setiap modal
  const [showQuiz, setShowQuiz] = useState(false);
  const [showBuku, setShowBuku] = useState(false);
  const [showMultimedia, setShowMultimedia] = useState(false);
  const [showPanduan, setShowPanduan] = useState(false);
  const [showProgram, setShowProgram] = useState(false);
  const [showDonasi, setShowDonasi] = useState(false);

  const dataBar = [
    { name: "Jan", disetujui: 60, ditolak: 10 },
    { name: "Feb", disetujui: 65, ditolak: 12 },
    { name: "Mar", disetujui: 70, ditolak: 14 },
    { name: "Apr", disetujui: 75, ditolak: 10 },
    { name: "Mei", disetujui: 80, ditolak: 8 },
    { name: "Jun", disetujui: 78, ditolak: 9 },
  ];

  const dataPie = [
    { name: "Kuis & Game", value: 35 },
    { name: "Buku", value: 25 },
    { name: "Multimedia", value: 20 },
    { name: "Cerita", value: 12 },
    { name: "Program", value: 8 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#3b82f6", "#f97316", "#8b5cf6"];

  const pending = [
    { name: "Kuis & Game", jumlah: 4 },
    { name: "Rekomendasi Buku", jumlah: 3 },
    { name: "Materi Multimedia", jumlah: 3 },
    { name: "Cerita Lapangan", jumlah: 1 },
    { name: "Program", jumlah: 5 },
    { name: "Donasi", jumlah: 0 },
  ];

  const activities = [
    { name: "Sarah", action: "mengajukan rekomendasi buku", time: "5 menit lalu" },
    { name: "Admin", action: "menyetujui kuis 'Belajar Toleransi'", time: "15 menit lalu" },
    { name: "Budi", action: "membuat akun baru", time: "1 jam lalu" },
    { name: "Aini", action: "mengajukan cerita lapangan", time: "2 jam lalu" },
    { name: "Admin", action: "menolak materi multimedia", time: "3 jam lalu" },
  ];

  return (
    <AdminLayout>
    

      <div className="min-h-screen relative p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Ringkasan Statistik
        </h1>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-6 gap-4">
          {[
            { title: "Total User Terdaftar", value: "1,234", change: "+2%", desc: "dari bulan lalu" },
            { title: "Kuis & Game Aktif", value: "156", change: "+1%", desc: "dari bulan lalu" },
            { title: "Rekomendasi Buku", value: "342", change: "+4%", desc: "dari bulan lalu" },
            { title: "Materi Multimedia", value: "89", change: "+15%", desc: "dari bulan lalu" },
            { title: "Cerita Lapangan", value: "67", change: "+10%", desc: "dari bulan lalu" },
            { title: "Program & Donasi", value: "45", change: "+20%", desc: "dari bulan lalu" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100 hover:shadow-md transition"
            >
              <h3 className="text-sm text-gray-500 mb-1">{item.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
              <p className="text-xs text-green-600">
                {item.change} <span className="text-gray-500">{item.desc}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Aksi Cepat */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-6 gap-4">
            <button
              onClick={() => setShowQuiz(true)}
              className="bg-amber-50 hover:bg-amber-100 transition rounded-xl py-3 text-sm font-medium text-gray-700 flex flex-col items-center gap-2"
            >
              <Gamepad2 className="w-5 h-5 text-amber-600" />
              Tambah Kuis/Game
            </button>

            <button
              onClick={() => setShowBuku(true)}
              className="bg-amber-50 hover:bg-amber-100 transition rounded-xl py-3 text-sm font-medium text-gray-700 flex flex-col items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-amber-600" />
              Tambah Buku
            </button>

            <button
              onClick={() => setShowMultimedia(true)}
              className="bg-amber-50 hover:bg-amber-100 transition rounded-xl py-3 text-sm font-medium text-gray-700 flex flex-col items-center gap-2"
            >
              <Film className="w-5 h-5 text-amber-600" />
              Tambah Multimedia
            </button>

            <button
              onClick={() => setShowPanduan(true)}
              className="bg-amber-50 hover:bg-amber-100 transition rounded-xl py-3 text-sm font-medium text-gray-700 flex flex-col items-center gap-2"
            >
              <FileText className="w-5 h-5 text-amber-600" />
              Tambah Panduan
            </button>

            <button
              onClick={() => setShowProgram(true)}
              className="bg-amber-50 hover:bg-amber-100 transition rounded-xl py-3 text-sm font-medium text-gray-700 flex flex-col items-center gap-2"
            >
              <Heart className="w-5 h-5 text-amber-600" />
              Tambah Program
            </button>

            <button
              onClick={() => setShowDonasi(true)}
              className="bg-amber-50 hover:bg-amber-100 transition rounded-xl py-3 text-sm font-medium text-gray-700 flex flex-col items-center gap-2"
            >
              <HandHeart className="w-5 h-5 text-amber-600" />
              Tambah Donasi
            </button>
          </div>
        </div>

        {/* Grafik */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Konten Disetujui vs Ditolak
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="disetujui" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="ditolak" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Distribusi Konten Aktif
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={dataPie} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aktivitas & Pengajuan */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Aktivitas Terbaru</h2>
            <ul className="space-y-3">
              {activities.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-full text-amber-700 font-semibold">
                    {a.name[0]}
                  </div>
                  <div>
                    <span className="font-medium">{a.name}</span> {a.action}
                    <p className="text-xs text-gray-500">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Pengajuan Menunggu Verifikasi
            </h2>
            <div className="space-y-2">
              {pending.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-amber-50 hover:bg-amber-100 transition rounded-xl px-4 py-2 text-sm"
                >
                  <span>{item.name}</span>
                  <span
                    className={`px-3 py-1 text-white text-xs rounded-full ${
                      item.jumlah > 0 ? "bg-emerald-500" : "bg-gray-400"
                    }`}
                  >
                    {item.jumlah} Menunggu
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === Semua modal tambah === */}
      <AddQuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
      <AddBukuModal isOpen={showBuku} onClose={() => setShowBuku(false)} />
      <AddMultimediaModal isOpen={showMultimedia} onClose={() => setShowMultimedia(false)} />
      <AddPanduanModal isOpen={showPanduan} onClose={() => setShowPanduan(false)} />
      <AddProgramModal isOpen={showProgram} onClose={() => setShowProgram(false)} />
      <AddDonasiModal isOpen={showDonasi} onClose={() => setShowDonasi(false)} />
    </AdminLayout>
  );
};

export default DashboardUtama;
