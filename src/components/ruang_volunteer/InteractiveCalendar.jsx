import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function InteractiveCalendar({
  agendaDates = [],
  onSelectDate,
}) {
  const today = new Date();

  // state month & year
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // picker
  const [showPicker, setShowPicker] = useState(false);

  // selected date
  const [selectedDate, setSelectedDate] = useState(
    `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
  );

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

  // days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // first day position
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday

  // generate date grid
  const dates = [];
  for (let i = 0; i < firstDay; i++) dates.push(null);
  for (let i = 1; i <= daysInMonth; i++) dates.push(i);

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isAgendaDay = (day) => {
    const formatted = `${day}-${currentMonth + 1}-${currentYear}`;
    return agendaDates.includes(formatted);
  };

  const selectDate = (day) => {
    const formatted = `${day}-${currentMonth + 1}-${currentYear}`;
    setSelectedDate(formatted);
    if (onSelectDate) onSelectDate(formatted);
  };

  return (
    <div className="bg-white w-[420px] rounded-3xl p-8 shadow-sm relative">
      {/* Title */}
      <h2 className="text-2xl font-bold">Kalender</h2>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrev}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <HiChevronLeft size={20} />
        </button>

        <h3
          className="text-xl font-semibold cursor-pointer hover:opacity-70"
          onClick={() => setShowPicker(true)}
        >
          {monthNames[currentMonth]} {currentYear}
        </h3>

        <button
          onClick={handleNext}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <HiChevronRight size={20} />
        </button>
      </div>

      {/* Muncul  */}
      {showPicker && (
        <div className="absolute mt-2 bg-white shadow-xl rounded-xl p-4 z-50 border">
          {/* PILIH BULAN */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {monthNames.map((m, index) => (
              <button
                key={m}
                onClick={() => {
                  setCurrentMonth(index);
                  setShowPicker(false);
                }}
                className="px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                {m}
              </button>
            ))}
          </div>

          {/* PILIH TAHUN */}
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => setCurrentYear((prev) => prev - 1)}
              className="px-3 py-1 border rounded-lg"
            >
              -
            </button>

            <span className="font-semibold">{currentYear}</span>

            <button
              onClick={() => setCurrentYear((prev) => prev + 1)}
              className="px-3 py-1 border rounded-lg"
            >
              +
            </button>
          </div>

          {/* TUTUP */}
          <button
            onClick={() => setShowPicker(false)}
            className="w-full mt-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-3 text-center text-gray-500 mt-6 text-sm font-medium">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-3 text-center mt-4">
        {dates.map((day, index) => {
          if (day === null) return <div key={index}></div>;

          const formatted = `${day}-${currentMonth + 1}-${currentYear}`;
          const isSelected = formatted === selectedDate;
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <div
              key={index}
              onClick={() => selectDate(day)}
              className={`
                cursor-pointer py-2 rounded-xl text-sm relative
                ${isSelected ? "bg-[#FEF1DF] text-[#FE9015] font-bold" : ""}
                ${isToday && !isSelected ? "text-[#FE9015] font-semibold" : ""}
                hover:bg-gray-100 transition
              `}
            >
              {day}

              {/* Dot Indicator for Agenda */}
              {isAgendaDay(day) && (
                <div className="w-2 h-2 bg-[#FE9015] rounded-full mx-auto mt-1"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
