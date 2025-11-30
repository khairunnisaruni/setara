import React from 'react'
import { FiGift, FiTrendingUp } from "react-icons/fi";
import MiniHeader from "/src/components/MiniHeader";
import { HiBookOpen } from "react-icons/hi";
import LandingItem from "/src/components/LandingItem";
import FiturCard from '../../components/FiturCard';
import { HiOutlineUsers, HiOutlineLightBulb, HiOutlineBookOpen, HiOutlineMap } from "react-icons/hi";
import Button from '../../components/Button';

const FiturSection = () => {
    return (
        <div className="flex flex-col gap-y-14 items-center px-20 ">
            <div className="flex flex-col gap-y-8 items-center ">
                <MiniHeader
                    icon={<FiGift className="w-5 h-5" />}
                    value="Fitur Unggulan"
                    className="bg-[#FF9500]/10 text-[#FF9500]"
                />
                <div className="flex text-6xl font-bold flex-col items-center">
                    <div>Semua yang Kamu Butuhkan</div>
                </div>
                <div className="flex max-w-[55%] text-lg font-normal text-[#757570] text-center flex-col items-center font-sans">
                    <div>
                        Platform lengkap untuk memudahkan perjalanan volunteer kamu dalam
                        berbagi ilmu
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-x-12 w-full">
                <FiturCard
                    icon={<HiOutlineLightBulb />}
                    label="Edukasi Interaktif"
                    value="Chatbot AI, kuis edukatif, dan game pembelajaran untuk membuat belajar lebih menyenangkan"
                    className="text-[#FF9500]"
                />
                <FiturCard
                    icon={<HiOutlineBookOpen />}
                    label="Ruang Volunteer"
                    value="Akses panduan mengajar, materi multimedia, agenda pribadi, dan cerita inspiratif dari lapangan"
                    className="text-[#317C76]"
                />
                <FiturCard
                    icon={<HiOutlineMap />}
                    label="Referensi & Aksi"
                    value="Informasi program beasiswa, peta persebaran sekolah, dan peluang untuk berkontribusi nyata"
                    className="text-[#FF9500]"
                />
            </div>
            <div className="w-full py-12 px-12 bg-linear-to-br from-[#FF9500] via-[#FF9500]/90 to-[#317C76] border border-[#E7E1DA] rounded-xl flex items-center justify-between relative overflow-hidden">
                <div className='w-48 h-48 rounded-full bg-[#FBF8F4]/10 absolute -bottom-24 -left-24'></div>
                <div className='w-48 h-48 rounded-full bg-[#FBF8F4]/10 absolute -top-16 -right-16'></div>
                <div className='w-full flex flex-col px-48  gap-y-4 items-center justify-center'>
                    <div>
                        <HiOutlineUsers
                            className='w-16 h-16 text-white'
                        />
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">Siap Menjadi Bagian dari Perubahan?</p>
                    </div>
                    <div className='text-center'>
                        <p className="text- text-white">Bergabunglah dengan ribuan volunteer yang telah membawa dampak nyata untuk pendidikan anak-anak Indonesia</p>
                    </div>
                    <Button
                        text="Lihat Daftar Program"
                        variant="third"
                        className="text-[#FF9500] w-2/3 justify-center gap-x-5"
                        withArrow={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default FiturSection