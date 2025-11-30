import React from 'react'
import { HiUsers, HiBookOpen } from "react-icons/hi";
import LandingItem from "/src/components/LandingItem";
import MiniHeader from "/src/components/MiniHeader";
import { FiTarget, FiTrendingUp } from "react-icons/fi";

const TentangSection = () => {
    return (
        <div className="flex flex-col gap-y-14 items-center px-20 ">
            <div className="flex flex-col gap-y-8 items-center ">
                <MiniHeader
                    icon={<FiTarget className="w-5 h-5" />}
                    value="Tentang SETARA"
                    className="bg-[#FF9500]/10 text-[#FF9500]"
                />
                <div className="flex text-6xl font-bold flex-col items-center">
                    <div>Tentang <span className="bg-[#FF9500] bg-clip-text text-transparent drop-shadow-md">SETARA</span></div>
                </div>
                <div className="flex max-w-[55%] text-lg font-normal text-[#757570] text-center flex-col items-center font-sans">
                    <div>
                        SETARA adalah platform edukasi yang mendorong kesetaraan pendidikan
                        bagi semua anak Indonesia melalui kolaborasi relawan dan komunitas.
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-x-12 w-full">
                <LandingItem
                    icon={<HiBookOpen />}
                    label="63%"
                    value="Anak Indonesia kesulitan literasi dasar"
                    variant="second"
                    className="text-[#FF9500]"
                />
                <LandingItem
                    icon={<HiUsers />}
                    label="15 Juta"
                    value="Anak putus sekolah setiap tahun"
                    variant="second"
                    className="text-[#317C76]"
                />
                <LandingItem
                    icon={<FiTrendingUp />}
                    label="40%"
                    value="Ketimpangan akses pendidikan antar daerah"
                    variant="second"
                    className="text-[#FF9500]"
                />
            </div>
            <div className="w-full py-12 px-12 bg-linear-to-br from-[#FF9500]/5 via-[#317C76]/5 to-[#FBF8F4] border border-[#E7E1DA] rounded-xl flex items-center justify-between">
                <div className="flex flex-col gap-y-4 max-w-2/5">
                    <div className="text-3xl font-bold">Misi Kami</div>
                    <div>
                        SETARA menjadi jembatan antara mahasiswa, dosen, dan
                        komunitas pendidikan dalam menyediakan bahan ajar literasi
                        dasar (membaca, menulis, berhitung), pengetahuan umum,
                        dan edukasi sosial yang mudah digunakan di lapangan.
                    </div>
                    <div>
                        Kami percaya bahwa <span className="text-[#FF9500]"> pendidikan adalah hak setiap warga
                            negara</span>, dan setiap mahasiswa memiliki kekuatan untuk
                        membuat perubahan nyata.
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <LandingItem
                        icon={<HiBookOpen />}
                        label="Materi Berkualitas"
                        value="Akses ratusan materi ajar yang telah dikurasi oleh ahli pendidikan"
                        variant="third"
                        className="text-[#FF9500]"


                    />
                    <LandingItem
                        icon={<HiUsers />}
                        label="Komunitas Peduli"
                        value="Bergabung dengan ribuan volunteer yang memiliki visi yang sama"
                        variant="third"
                        className="text-[#317C76]"
                    />
                    <LandingItem
                        icon={<FiTrendingUp />}
                        label="Dampak Nyata"
                        value="Kontribusi langsung untuk pendidikan anak-anak di daerah terpencil"
                        variant="third"
                        className="text-[#FF9500]"
                    />
                </div>
            </div>
        </div>
    )
}

export default TentangSection