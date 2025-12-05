// src/sections/volunteer/ruang_volunteer/MainAGSection.jsx
import React, { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import InteractiveCalendar from "../../../components/ruang_volunteer/InteractiveCalendar";
import ModalAgenda from "../../../components/ruang_volunteer/ModalAgenda";
import SuccessAgenda from "../../../components/ruang_volunteer/notification/SuccessAgenda";
import UniversalPopup from "../../../components/ruang_volunteer/notification/UniversalPopup";
import CardAgenda from "../../../components/ruang_volunteer/CardAgenda";
import ModalRincianAgenda from "../../../components/ruang_volunteer/ModalRincianAgenda";
import ModalEditAgenda from "../../../components/ruang_volunteer/ModalEditAgenda";

export default function MainAGSection() {
  // ========================================
  // KALENDER
  // ========================================
  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10); // "YYYY-MM-DD"

  const [selectedDate, setSelectedDate] = useState(todayKey);

  // ========================================
  // DATA AGENDA (STATE)
  // ========================================
  const [agendas, setAgendas] = useState([]);
  const agendaDates = agendas.map((a) => a.keyDate); // YYYY-MM-DD
  const filteredAgenda = agendas.filter((a) => a.keyDate === selectedDate);

  // ========================================
  // TAMBAH AGENDA
  // ========================================
  const [openModal, setOpenModal] = useState(false);
  const [showNotifAdd, setShowNotifAdd] = useState(false);

  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    tanggal: "",
    waktu: "",
    lokasi: "",
  });

  const handleSubmitAgenda = async () => {
    try {
      if (!formData.judul || !formData.tanggal || !formData.waktu) {
        alert("Judul, tanggal, dan waktu wajib diisi.");
        return;
      }

      const payload = {
        title: formData.judul,
        description: formData.deskripsi,
        date: formData.tanggal, // YYYY-MM-DD
        waktu: formData.waktu,
        time: formData.waktu,
        location: formData.lokasi,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Tidak ada token. Kamu mungkin belum login, silakan login ulang.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/agenda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("Respon gagal dari backend agenda:", data);
        throw new Error(data.message || "Gagal menyimpan agenda");
      }

      // Tambahkan ke state lokal
      const inserted = data.agenda || {};
      const dateKey = inserted.date || formData.tanggal;

      const newAgenda = {
        id: inserted.id || Date.now(),
        title: inserted.title || formData.judul,
        deskripsi: inserted.description || formData.deskripsi,
        lokasi: inserted.location || formData.lokasi,
        time: inserted.waktu || formData.waktu,
        date: convertDateIndo(dateKey),
        keyDate: dateKey, // YYYY-MM-DD
        method: inserted.location || formData.lokasi,
      };

      setAgendas((prev) => [...prev, newAgenda]);

      setOpenModal(false);
      setShowNotifAdd(true);

      setFormData({
        judul: "",
        deskripsi: "",
        tanggal: "",
        waktu: "",
        lokasi: "",
      });

      setTimeout(() => setShowNotifAdd(false), 2000);
    } catch (error) {
      console.error("Error saat menyimpan agenda:", error);
      alert("Gagal menyimpan agenda, cek backend.");
    }
  };

  // ========================================
  // DETAIL AGENDA
  // ========================================
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  const handleOpenDetail = (agenda) => {
    setSelectedAgenda({
      id: agenda.id,
      judul: agenda.title,
      deskripsi: agenda.deskripsi,
      tanggal: agenda.date,
      waktu: agenda.time,
      lokasi: agenda.method,
      keyDate: agenda.keyDate,
    });
    setOpenDetail(true);
  };

  // ========================================
  // EDIT AGENDA
  // ========================================
  const [openEdit, setOpenEdit] = useState(false);
  const [showNotifEdit, setShowNotifEdit] = useState(false);

  const convertToDateInput = (indodate) => {
    const [day, monthName, year] = indodate.split(" ");
    const monthIndex = {
      Januari: "01",
      Februari: "02",
      Maret: "03",
      April: "04",
      Mei: "05",
      Juni: "06",
      Juli: "07",
      Agustus: "08",
      September: "09",
      Oktober: "10",
      November: "11",
      Desember: "12",
    }[monthName];

    return `${year}-${monthIndex}-${day.padStart(2, "0")}`;
  };

  const handleSubmitEdit = () => {
    setAgendas((prev) =>
      prev.map((a) =>
        a.id === selectedAgenda.id
          ? {
              ...a,
              title: formData.judul,
              deskripsi: formData.deskripsi,
              lokasi: formData.lokasi,
              time: formData.waktu,
              date: convertDateIndo(formData.tanggal),
              keyDate: formData.tanggal,
            }
          : a
      )
    );

    setOpenEdit(false);
    setShowNotifEdit(true);
    setTimeout(() => setShowNotifEdit(false), 2000);
  };

  // ========================================
  // HAPUS AGENDA
  // ========================================
  const [showDeleteNotif, setShowDeleteNotif] = useState(false);

  const handleDeleteAgenda = () => {
    setAgendas((prev) => prev.filter((a) => a.id !== selectedAgenda.id));

    setOpenEdit(false);
    setOpenDetail(false);

    setShowDeleteNotif(true);
    setTimeout(() => setShowDeleteNotif(false), 2000);
  };

  // ========================================
  // FUNGSI DATE
  // ========================================
  const convertDateIndo = (dateInput) => {
    const [y, m, d] = dateInput.split("-");
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${d.padStart(2, "0")} ${monthNames[parseInt(m) - 1]} ${y}`;
  };

  // ========================================
  // FETCH SEMUA AGENDA GLOBAL SAAT HALAMAN DIBUKA
  // ========================================
  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/agenda/all");
        const data = await res.json().catch(() => []);
        if (!res.ok) {
          console.error("Gagal ambil agenda:", data);
          throw new Error(data.message || "Gagal mengambil agenda");
        }

        const mapped = data.map((item) => ({
          id: item.id,
          title: item.title,
          deskripsi: item.description,
          lokasi: item.location,
          time: item.waktu,
          date: convertDateIndo(item.date), // label Indo
          keyDate: item.date,               // YYYY-MM-DD
          method: item.location,
        }));

        setAgendas(mapped);
      } catch (err) {
        console.error("Error fetch agenda:", err);
      }
    };

    fetchAgenda();
  }, []);

  // ========================================
  // UI
  // ========================================
  return (
    <div className="w-full min-h-screen bg-[#F4F0EC] pb-24 px-12 flex flex-col items-center pt-12">
      {/* HEADER */}
      <div className="text-6xl font-bold text-center flex flex-col items-center gap-y-4 mt-14 p-[42px_128px] rounded-[20px] bg-[linear-gradient(85deg,rgba(255,157,1,0.85)_22.33%,rgba(49,123,116,0.85)_77.67%)]">
        <span className="text-white drop-shadow-lg">Agenda</span>
        <p className="text-lg font-normal text-white max-w-[60%]">
          Kelola jadwal mengajar dan kegiatan volunteer Anda
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full max-w-7xl mt-10 flex gap-10">
        {/* CALENDAR */}
        <InteractiveCalendar
          agendaDates={agendaDates}
          onSelectDate={(date) => setSelectedDate(date)} // "YYYY-MM-DD"
        />

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col gap-6">
          {/* ADD BUTTON */}
          <button
            onClick={() => setOpenModal(true)}
            className="w-fit flex itemscenter gap-2 px-6 py-3 bg-[#FE9015] hover:bg-[#e57f0f] text-white font-semibold rounded-full shadow"
          >
            Tambahkan Agenda <HiPlus size={18} />
          </button>

          {/* POPUP ADD */}
          <SuccessAgenda show={showNotifAdd} entity="Agenda" />

          {/* TITLE */}
          <h2 className="text-2xl font-bold">
            Agenda {convertDateIndo(selectedDate)}
          </h2>

          {/* LIST */}
          <div className="flex flex-col gap-5">
            {filteredAgenda.length > 0 ? (
              filteredAgenda.map((a) => (
                <div key={a.id} onClick={() => handleOpenDetail(a)}>
                  <CardAgenda
                    title={a.title}
                    date={a.date}
                    time={a.time}
                    method={a.method}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600 mt-4">
                Tidak ada agenda pada tanggal ini.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <ModalAgenda
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmitAgenda}
      />

      <ModalRincianAgenda
        isOpen={openDetail}
        onClose={() => setOpenDetail(false)}
        data={selectedAgenda}
        onEdit={() => {
          setOpenDetail(false);
          setOpenEdit(true);
          setFormData({
            judul: selectedAgenda.judul,
            deskripsi: selectedAgenda.deskripsi,
            tanggal: convertToDateInput(selectedAgenda.tanggal),
            waktu: selectedAgenda.waktu,
            lokasi: selectedAgenda.lokasi,
          });
        }}
      />

      <ModalEditAgenda
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmitEdit}
        onDelete={handleDeleteAgenda}
      />

      {/* POPUP DELETE */}
      <UniversalPopup show={showDeleteNotif} entity="Agenda" action="dihapus" />

      {/* POPUP EDIT */}
      <UniversalPopup show={showNotifEdit} entity="Agenda" action="diubah" />
    </div>
  );
}