import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import DropDown from './DropDown';
import { Link } from 'react-router-dom';

const NavbarVolunteer = () => {
    return (
        <div className='w-full flex justify-end gap-x-8 bg-[#E7E1DA] py-4 px-12'>
            <div className='flex gap-x-6'>
                <DropDown
                    name="Referensi & Aksi"
                    path="/volunteer"
                    item1="Profil Saya"
                    item2="Materi Ajar"
                    item3="Logout"
                />
                <DropDown
                    name="Ruang Volunteer"
                    paths={[
                        "/volunteer-home",
                        "/volunteer-panduan-mengajar",
                        "/volunteer-materi-mengajar",
                        "/volunteer-pojok-buku"
                    ]}
                    item1="Profil Saya"
                    item2="Materi Ajar"
                    item3="Logout"
                />
                <DropDown
                    name="Edukasi Interaktif"
                    paths={[
                        "/edukasi-chatbot",
                        "/edukasi-kuis",
                    ]}
                    item1="Edukasi Chatbot"
                    item2="Kuis"
                    item3="Logout"
                />
            </div>
            <Link 
                to="/"
                className="flex items-center gap-x-3"
            >
                <MdHome
                    className='flex items-center'
                />
                <div className='text-sm font-semibold'>
                    Beranda
                </div>
            </Link>
        </div>
    )
}

export default NavbarVolunteer