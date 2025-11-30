import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import InteractiveCalendar from "../../../components/ruang_volunteer/InteractiveCalendar";
import ModalAgenda from "../../../components/ruang_volunteer/ModalAgenda";
import SuccessPopup from "../../../components/ruang_volunteer/notification/SuccessPopup";
import UniversalPopup from "../../../components/ruang_volunteer/notification/UniversalPopup";
import CardAgenda from "../../../components/ruang_volunteer/CardAgenda";
import ModalRincianAgenda from "../../../components/ruang_volunteer/ModalRincianAgenda";
import ModalEditAgenda from "../../../components/ruang_volunteer/ModalEditAgenda";

export default function MainAGSection() {
  // ========================================
  // KALENDER
  // ========================================
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayKey = `${dd}-${mm}-${yyyy}`;

  const [selectedDate, setSelectedDate] = useState(todayKey);

  // ========================================
  // DATA AGENDA (STATE)
  // ========================================
  const [agendas, setAgendas] = useState([
    {
      id: 1,
      title: "Pelatihan Volunteer",
      deskripsi: "Perlu mencatat menggunakan buku dan pulpen",
      keyDate: "30-10-2025",
      date: "Sabtu, 30 Oktober 2025",
      time: "08:00 - 12:00 WIB",
      lokasi: "Zoom Meeting",
      method: "Zoom Meeting",
    },
    {
      id: 2,
      title: "Pelatihan Mengajar",
      deskripsi: "Kelas persiapan materi",
      keyDate: "30-10-2025",
      date: "Sabtu, 30 Oktober 2025",
      time: "13:00 - 14:00 WIB",
      lokasi: "Zoom Meeting",
      method: "Zoom Meeting",
    },
  ]);

  const agendaDates = agendas.map((a) => a.keyDate);
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

  const handleSubmitAgenda = () => {
    const newAgenda = {
      id: Date.now(),
      title: formData.judul,
      deskripsi: formData.deskripsi,
      lokasi: formData.lokasi,
      time: formData.waktu,
      date: convertDateIndo(formData.tanggal),
      keyDate: convertKey(formData.tanggal),
      method: formData.lokasi,
    };

    setAgendas((prev) => [...prev, newAgenda]);

    setOpenModal(false);
    setShowNotifAdd(true);

    // Reset
    setFormData({
      judul: "",
      deskripsi: "",
      tanggal: "",
      waktu: "",
      lokasi: "",
    });

    setTimeout(() => setShowNotifAdd(false), 2000);
  };

  // ========================================
  // DETAIL AGENDA
  // ========================================
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState(null);

  const handleOpenDetail = (agenda) => {
    setSelectedAgenda({
      judul: agenda.title,
      deskripsi: agenda.deskripsi,
      tanggal: agenda.date,
      waktu: agenda.time,
      lokasi: agenda.method,
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

    return `${year}-${monthIndex}-${day}`;
  };

  const handleSubmitEdit = () => {
    setAgendas((prev) =>
      prev.map((a) =>
        a.title === selectedAgenda.judul && a.time === selectedAgenda.waktu
          ? {
              ...a,
              title: formData.judul,
              deskripsi: formData.deskripsi,
              lokasi: formData.lokasi,
              time: formData.waktu,
              date: convertDateIndo(formData.tanggal),
              keyDate: convertKey(formData.tanggal),
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
    setAgendas((prev) =>
      prev.filter(
        (a) =>
          !(a.title === selectedAgenda.judul && a.time === selectedAgenda.waktu)
      )
    );

    setOpenEdit(false);
    setOpenDetail(false);

    setShowDeleteNotif(true);
    setTimeout(() => setShowDeleteNotif(false), 2000);
  };

  // ========================================
  // FUNGSI DATE
  // ========================================
  const convertKey = (dateInput) => {
    const [y, m, d] = dateInput.split("-");
    return `${d}-${m}-${y}`;
  };

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
    return `${d} ${monthNames[parseInt(m) - 1]} ${y}`;
  };

  // ========================================
  // UI
  // ========================================
  return (
    <div className="w-full min-h-screen bg-[#F4F0EC] pb-24 px-12 flex flex-col items-center">
      {/* HEADER */}
      <div className="text-6xl font-bold text-center flex flex-col items-center gap-y-4 mt-14 p-[42px_128px] rounded-[20px] bg-[linear-gradient(85deg,rgba(255,157,1,0.85)_22.33%,rgba(49,123,116,0.85)_77.67%)]">
        <span className="bg-white bg-clip-text text-transparent drop-shadow-md">
          Agenda
        </span>
        <p className="text-lg font-normal text-white max-w-[60%]">
          Kelola jadwal mengajar dan kegiatan volunteer Anda
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full max-w-7xl mt-10 flex gap-10">
        {/* CALENDAR */}
        <InteractiveCalendar
          agendaDates={agendaDates}
          onSelectDate={(date) => setSelectedDate(date)}
        />

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col gap-6">
          {/* ADD BUTTON */}
          <button
            onClick={() => setOpenModal(true)}
            className="w-fit flex items-center gap-2 px-6 py-3 bg-[#FE9015] hover:bg-[#e57f0f] text-white font-semibold rounded-full shadow"
          >
            Tambahkan Agenda <HiPlus size={18} />
          </button>

          {/* POPUP ADD */}
          <SuccessPopup show={showNotifAdd} entity="Agenda" />

          {/* TITLE */}
          <h2 className="text-2xl font-bold">Agenda {selectedDate}</h2>

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
