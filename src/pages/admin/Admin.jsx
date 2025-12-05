import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  BookOpen, Gamepad2, FileText, Film, Heart, HandHeart,
} from "lucide-react";
import { useState, useEffect } from "react";
import AdminLayout from "../../sections/admin/AdminLayout";

// IMPORT MODAL
import AddProgramModal from "../../components/admin/modals/Program/AddProgram";
import AddMateriModal from "../../components/admin/modals/Materi/AddMateri";
import AddDonasiModal from "../../components/admin/modals/Donasi/AddDonasi";
import AddBukuModal from "../../components/admin/modals/Buku/AddBuku";
import AddQuizModal from "../../components/admin/modals/Quiz/AddQuiz"
import AddCeritaModal from "../../components/admin/modals/Cerita/AddCerita"

// Tambahkan import AddQuiz dan AddPanduan jika sudah ada file-nya

import Success from "../../components/admin/modals/Success";
import Failed from "../../components/admin/modals/Failed";

const DashboardUtama = () => {
  const [showProgram, setShowProgram] = useState(false);
  const [showMultimedia, setShowMultimedia] = useState(false);
  const [showDonasi, setShowDonasi] = useState(false);
  const [showBuku, setShowBuku] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPanduan, setShowPanduan] = useState(false);
  const [showCerita, setShowCerita] = useState(false);
  const [activities, setActivities] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);



  // 🔥 STATE DATA UTAMA (REAL DARI DB)
  const [stats, setStats] = useState({
    users: 0,
    kuis: { total: 0, pending: 0 },
    buku: { total: 0, pending: 0 },
    materi: { total: 0, pending: 0 },
    cerita: { total: 0, pending: 0 },
    program: { total: 0, pending: 0 },
    donasi: { total: 0, pending: 0 },
  });


  const fetchActivities = () => {
    fetch('http://localhost:5000/admin/activities')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setActivities(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchStats();
    // fetchChartStats(); // Jika kamu pakai chart
    fetchActivities(); // 👈 Panggil disini
  }, []);

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Baru saja";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
  };

  const [chartData, setChartData] = useState([]);

  const fetchChartStats = () => {
    fetch('http://localhost:5000/admin/chart-stats')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setChartData(data);
        }
      })
      .catch(err => console.error("Gagal chart:", err));
  };

  useEffect(() => {
    fetchStats();
    fetchChartStats(); // Panggil disini
  }, []);

  // 1. FETCH DATA DARI BACKEND
  const fetchStats = () => {
    fetch('http://localhost:5000/admin')
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch");
        return res.json();
      })
      .then(data => {
        if (data && data.kuis && data.buku) {
          setStats(data);
        }
      })
      .catch(err => console.error("Gagal ambil stats:", err));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // === HANDLER SUKSES ===
  const handleSuccess = (setterModal) => {
    setterModal(false);
    setShowSuccessModal(true);
    fetchStats();
  };

  // === HANDLER TAMBAH DATA (LOGIKA POST) ===
  const handleAddProgram = (formData) => {
    const dataToSend = new FormData();
    dataToSend.append("judul_program", formData.title);
    dataToSend.append("penyelenggara", formData.penyelenggara);
    dataToSend.append("jenis_program", formData.jenis_program);
    dataToSend.append("lokasi_program", formData.lokasi_program);
    dataToSend.append("deskripsi_program", formData.description);
    dataToSend.append("periode_tanggal", formData.periode);
    dataToSend.append("deadline_pendaftaran", formData.deadline);
    dataToSend.append("status_program", "Akan Datang");
    dataToSend.append("tautan_sumber_resmi", formData.link);
    if (formData.poster) dataToSend.append("poster", formData.poster);

    fetch('http://localhost:5000/admin/programs', { method: 'POST', body: dataToSend })
      .then(res => res.json()).then(() => handleSuccess(setShowProgram))
      .catch(() => setShowFailedModal(true));
  };

  const handleAddMateri = (formData) => {
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("file_type", formData.file_type);
    dataToSend.append("kategori_id", formData.kategori_id);
    dataToSend.append("kategori_kelas_id", formData.kategori_kelas_id);
    if (formData.file_type === 'video') dataToSend.append("youtube_link", formData.youtube_link);
    else if (formData.file_material) dataToSend.append("file_material", formData.file_material);

    fetch('http://localhost:5000/admin/materials', { method: 'POST', body: dataToSend })
      .then(res => res.json()).then(() => handleSuccess(setShowMultimedia))
      .catch(() => setShowFailedModal(true));
  };

  const handleAddBuku = (formData) => {
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("author", formData.author);
    dataToSend.append("description", formData.description);
    dataToSend.append("link", formData.link);
    dataToSend.append("kategori_id", formData.kategori_id);
    if (formData.gambar) dataToSend.append("gambar", formData.gambar);

    fetch('http://localhost:5000/admin/books', { method: 'POST', body: dataToSend })
      .then(res => res.json()).then(() => handleSuccess(setShowBuku))
      .catch(() => setShowFailedModal(true));
  };

  const handleAddDonasi = (formData) => {
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("kategori", formData.kategori);
    dataToSend.append("penerima_manfaat", formData.penerima_manfaat);
    dataToSend.append("description", formData.description);
    dataToSend.append("dampak", formData.dampak);
    dataToSend.append("link", formData.link);
    dataToSend.append("penanggung_jawab", formData.penanggung_jawab);
    dataToSend.append("contact_person", formData.contact_person);
    if (formData.poster) dataToSend.append("poster", formData.poster);

    fetch('http://localhost:5000/admin/donations', { method: 'POST', body: dataToSend })
      .then(res => res.json()).then(() => handleSuccess(setShowDonasi))
      .catch(() => setShowFailedModal(true));
  };


  const handleAddQuiz = (formData) => {
    // Gunakan JSON karena Kuis biasanya hanya data teks & link
    const dataToSend = {
      title: formData.title,
      description: formData.description,
      platform: formData.platform,
      link: formData.link,
      kategori_id: formData.kategori_id,
      kategori_kelas_id: formData.kategori_kelas_id
    };

    fetch('http://localhost:5000/admin/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal tambah kuis");
        return res.json();
      })
      .then(() => handleSuccess(setShowQuiz))
      .catch(() => setShowFailedModal(true));
  };

  // 6. Tambah Cerita Lapangan
  const handleAddCerita = (formData) => {
    // Mapping: di Modal 'description', di DB 'content'
    const dataToSend = {
      title: formData.title,
      content: formData.description
    };

    fetch('http://localhost:5000/admin/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal tambah cerita");
        return res.json();
      })
      .then(() => handleSuccess(setShowCerita))
      .catch(() => setShowFailedModal(true));
  };
  // === DATA UNTUK UI ===

  // 1. Pie Chart (REAL)
  const dataPie = [
    { name: "Kuis", value: Number(stats.kuis.total) || 0 },
    { name: "Buku", value: Number(stats.buku.total) || 0 },
    { name: "Materi", value: Number(stats.materi.total) || 0 },
    { name: "Cerita", value: Number(stats.cerita.total) || 0 },
    { name: "Program", value: (Number(stats.program.total) || 0) + (Number(stats.donasi.total) || 0) },
  ].filter(item => item.value > 0);

  // 2. Pending List (REAL)
  const pendingData = [
    { name: "Kuis & Game", jumlah: stats.kuis.pending },
    { name: "Rekomendasi Buku", jumlah: stats.buku.pending },
    { name: "Materi Multimedia", jumlah: stats.materi.pending },
    { name: "Cerita Lapangan", jumlah: stats.cerita.pending },
    { name: "Program", jumlah: stats.program.pending },
    { name: "Donasi", jumlah: stats.donasi.pending },
  ];




  const COLORS = ["#22c55e", "#facc15", "#3b82f6", "#f97316", "#8b5cf6"];

  return (
    <AdminLayout>
      <div className="min-h-screen relative p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Ringkasan Statistik</h1>

        {/* 1. KARTU STATISTIK (DATA REAL) */}
        <div className="grid grid-cols-6 gap-4">
          <StatCard title="Total User" value={stats.users} desc="Total Pengguna" />
          <StatCard title="Kuis & Game" value={stats.kuis.total} desc="Total Kuis Aktif" />
          <StatCard title="Rekomendasi Buku" value={stats.buku.total} desc="Total Buku" />
          <StatCard title="Materi Multimedia" value={stats.materi.total} desc="Total Materi" />
          <StatCard title="Cerita Lapangan" value={stats.cerita.total} desc="Total Cerita" />
          <StatCard title="Program & Donasi" value={parseInt(stats.program.total) + parseInt(stats.donasi.total)} desc="Total Program" />
        </div>

        {/* 2. AKSI CEPAT (TOMBOL REAL) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-6 gap-4">
            <QuickButton icon={<Gamepad2 />} label="Tambah Kuis" onClick={() => setShowQuiz(true)} />
            <QuickButton icon={<BookOpen />} label="Tambah Buku" onClick={() => setShowBuku(true)} />
            <QuickButton icon={<Film />} label="Tambah Materi" onClick={() => setShowMultimedia(true)} />
            <QuickButton icon={<FileText />} label="Tambah Cerita" onClick={() => setShowCerita(true)} />
            <QuickButton icon={<Heart />} label="Tambah Program" onClick={() => setShowProgram(true)} />
            <QuickButton icon={<HandHeart />} label="Tambah Donasi" onClick={() => setShowDonasi(true)} />
          </div>
        </div>

        {/* 3. GRAFIK STATISTIK (DUMMY + REAL PIE) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Bar Chart - Konten Disetujui vs Ditolak */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Konten Disetujui vs Ditolak</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} /> {/* Agar sumbu Y bilangan bulat */}
                <Tooltip />
                <Bar dataKey="disetujui" fill="#10b981" radius={[6, 6, 0, 0]} name="Disetujui" />
                <Bar dataKey="ditolak" fill="#ef4444" radius={[6, 6, 0, 0]} name="Ditolak" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Distribusi Konten Aktif (Data Real) */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Distribusi Konten Aktif</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={dataPie} // <--- Ini otomatis pakai dataPie baru di atas
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. AKTIVITAS & PENGAJUAN MENUNGGU */}
        <div className="grid grid-cols-2 gap-4">
          {/* Aktivitas Terbaru (Dummy) */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Aktivitas Terbaru</h2>

            {activities.length === 0 ? (
              <p className="text-sm text-gray-400">Belum ada aktivitas.</p>
            ) : (
              <ul className="space-y-3">
                {activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-amber-100 rounded-full text-amber-700 font-semibold">
                      {/* Ambil Huruf Depan User */}
                      {a.user_name ? a.user_name[0].toUpperCase() : "A"}
                    </div>
                    <div>
                      {/* Tampilkan Nama & Action */}
                      <span className="font-medium">{a.user_name}</span> {a.action}

                      {/* Tampilkan Waktu Relative */}
                      <p className="text-xs text-gray-500">{timeAgo(a.created_at)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pengajuan Menunggu Verifikasi (Data Real) */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Pengajuan Menunggu Verifikasi</h2>
            <div className="space-y-2">
              {pendingData.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-amber-50 hover:bg-amber-100 transition rounded-xl px-4 py-2 text-sm">
                  <span>{item.name}</span>
                  <span className={`px-3 py-1 text-white text-xs rounded-full ${item.jumlah > 0 ? "bg-emerald-500" : "bg-gray-400"}`}>
                    {item.jumlah} Menunggu
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === MODALS === */}
      <AddProgramModal isOpen={showProgram} onClose={() => setShowProgram(false)} onSubmit={handleAddProgram} initialData={null} />
      <AddMateriModal isOpen={showMultimedia} onClose={() => setShowMultimedia(false)} onSubmit={handleAddMateri} initialData={null} />
      <AddBukuModal isOpen={showBuku} onClose={() => setShowBuku(false)} onSubmit={handleAddBuku} initialData={null} />
      <AddDonasiModal isOpen={showDonasi} onClose={() => setShowDonasi(false)} onSubmit={handleAddDonasi} initialData={null} />
      <AddCeritaModal isOpen={showCerita} onClose={() => setShowCerita(false)} onSubmit={handleAddCerita} initialData={null} />
      <AddQuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} onSubmit={handleAddQuiz} initialData={null} />

      {/* Note: Tambahkan <AddQuizModal> dan <AddPanduanModal> jika filenya sudah tersedia */}

      {showSuccessModal && <Success onClose={() => setShowSuccessModal(false)} />}
      {showFailedModal && <Failed onClose={() => setShowFailedModal(false)} />}
    </AdminLayout>
  );
};

// Komponen Kecil
const StatCard = ({ title, value, desc }) => (
  <div className="bg-white rounded-2xl shadow-sm p-5 border border-amber-100 hover:shadow-md transition">
    <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-gray-400">{desc}</p>
  </div>
);

const QuickButton = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="bg-amber-50 hover:bg-amber-100 transition rounded-xl py-3 text-sm font-medium text-gray-700 flex flex-col items-center gap-2">
    <div className="w-5 h-5 text-amber-600">{icon}</div>
    {label}
  </button>
);

export default DashboardUtama;