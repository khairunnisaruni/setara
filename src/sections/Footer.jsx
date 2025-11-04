import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="flex flex-col py-20 gap-y-14 items-center px-20 bg-[#343432]">
            <div className="flex justify-center gap-x-10 w-full">
                <div className='flex flex-col gap-y-3 w-1/3'>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex items-center gap-x-1'>
                            <div className='rounded-xl flex items-center justify-center w-10 h-10 bg-linear-to-br from-[#FF9500] to-[#317C76]'>
                                <FaRegHeart
                                    className='h-6 w-6 text-white'
                                />
                            </div>
                            <div>
                                <p className="font-bold text-white">SETARA</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-normal text-white">Platform edukasi dan volunteer berbasis mahasiswa untuk kesetaraan pendidikan di Indonesia.</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <div className='flex items-center gap-x-2 text-white'>
                            <div><HiOutlineLocationMarker /></div>
                            <div>Jl. Pendidikan No. 123, Jakarta Selatan 12345</div>
                        </div>
                        <div className='flex items-center gap-x-2 text-white'>
                            <div><HiOutlineMail /></div>
                            <div>info@setara.id</div>
                        </div>
                        <div className='flex items-center gap-x-2 text-white'>
                            <div><HiOutlineLocationMarker /></div>
                            <div>+62 812 3456 7890</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div>
                        <p className="font-semibold text-white">Platform</p>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <p className="text-white text-sm">Tentang SETARA</p>
                        <p className="text-white text-sm">Edukasi Interaktif</p>
                        <p className="text-white text-sm">Ruang Volunteer</p>
                        <p className="text-white text-sm">Referensi & Aksi</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div>
                        <p className="font-semibold text-white">Sumber Daya</p>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <p className="text-white text-sm">Panduan Mengajar</p>
                        <p className="text-white text-sm">Materi Ajar</p>
                        <p className="text-white text-sm">Cerita Lapangan</p>
                        <p className="text-white text-sm">FAQ</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div>
                        <p className="font-semibold text-white">Dukungan</p>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <p className="text-white text-sm">Hubungi Kami</p>
                        <p className="text-white text-sm">Syarat & Ketentuan</p>
                        <p className="text-white text-sm">Kebijakan Privasi</p>
                        <p className="text-white text-sm">Bantuan</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer