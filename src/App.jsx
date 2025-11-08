import { FaRegHeart } from "react-icons/fa";
import { HiUsers, HiBookOpen } from "react-icons/hi";
import gambarLatar from './assets/bg-login.png';
import { useState } from "react";
import Button from "./components/Button";
import LandingItem from "./components/LandingItem";
import MiniHeader from "./components/MiniHeader";
// import { FiTarget, FiTrendingUp } from "react-icons/fi";
// import TentangSection from "./sections/secondsections/TentangSection";

import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Halaman Home yang baru kita buat
import RuangVolunteer from './pages/ruang_volunteer/RuangVolunteer';
import RuangVolunteerPM from "./pages/ruang_volunteer/RuangVolunteerPM";
import RuangVolunteerMM from "./pages/ruang_volunteer/RuangVolunteerMM";
import PojokBuku from "./pages/ruang_volunteer/PojokBuku";
import ChatBot from "./pages/edukasi_interaktif/ChatBot";
import Kuis from "./pages/edukasi_interaktif/Kuis";
import ProgramTersedia from "./pages/referensi_aksi/ProgramTersedia";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/volunteer-home" element={<RuangVolunteer />} />
                <Route path="/volunteer-panduan-mengajar" element={<RuangVolunteerPM />} />
                <Route path="/volunteer-materi-mengajar" element={<RuangVolunteerMM />} />
                <Route path="/volunteer-pojok-buku" element={<PojokBuku/>} />
                <Route path="/edukasi-chatbot" element={<ChatBot/>} />
                <Route path="/edukasi-kuis" element={<Kuis/>} />
                <Route path="/referensi_aksi-program_tersedia" element={<ProgramTersedia/>} />
            </Routes>
        </div>
    )
}

export default App