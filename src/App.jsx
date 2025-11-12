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
import RuangVolunteerCL from "./pages/ruang_volunteer/RuangVolunteerCL";
import RuangVolunteerAG from "./pages/ruang_volunteer/RuangVolunteerAG";import PojokBuku from "./pages/ruang_volunteer/PojokBuku";
import ChatBot from "./pages/edukasi_interaktif/ChatBot";
import Kuis from "./pages/edukasi_interaktif/Kuis";
import ProgramTersedia from "./pages/referensi_aksi/ProgramTersedia";
import Donasi from "./pages/referensi_aksi/Donasi";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminBuku from "./pages/admin/AdminBuku";
import AdminUser from "./pages/admin/AdminUserManagement";
import AdminQuiz from "./pages/admin/AdminQuiz";
import AdminMateri from "./pages/admin/AdminMateri";


function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/volunteer-home" element={<RuangVolunteer />} />
                <Route path="/volunteer-panduan-mengajar" element={<RuangVolunteerPM />} />
                <Route path="/volunteer-materi-mengajar" element={<RuangVolunteerMM />} />
                <Route path="/volunteer-pojok-buku" element={<PojokBuku/>} />
                <Route path="/volunteer-cerita-lapangan" element={<RuangVolunteerCL />} />
                <Route path="/volunteer-agenda" element={<RuangVolunteerAG />} />
                <Route path="/edukasi-chatbot" element={<ChatBot/>} />
                <Route path="/edukasi-kuis" element={<Kuis/>} />
                <Route path="/referensi_aksi-program_tersedia" element={<ProgramTersedia/>} />
                <Route path="/donasi" element={<Donasi/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/admin/buku" element={<AdminBuku/>} />
                <Route path="/admin/users" element={<AdminUser/>} />
                <Route path="/admin/quiz" element={<AdminQuiz/>} /> 
                <Route path="/admin/materials" element={<AdminMateri/>} /> 


            </Routes>
        </div>
    )
}

export default App