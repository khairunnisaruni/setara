import React from 'react'
import MiniHeader from "/src/components/MiniHeader";
import { MdOutlineFormatQuote } from "react-icons/md";
import ReviewCard from '../components/ReviewCard';

const ReviewSection = () => {
    return (
        <div className="flex flex-col py-20 gap-y-14 items-center px-20 ">
            <div className="flex flex-col gap-y-8 items-center ">
                <MiniHeader
                    icon={<MdOutlineFormatQuote className="w-5 h-5" />}
                    value="Tentang SETARA"
                    className="bg-[#317C76]/10 text-[#317C76]"
                />
                <div className="flex text-6xl font-bold flex-col items-center">
                    <div>Inspirasi dari Lapangan</div>
                </div>
                <div className="flex max-w-[55%] text-lg font-normal text-[#757570] text-center flex-col items-center font-sans">
                    <div>
                        Dengarkan pengalaman volunteer yang telah membawa perubahan nyata
                    </div>
                </div>
            </div>
            <div className="flex justify-between gap-x-10 w-full">
                <ReviewCard
                    quote="SETARA membuat pengalaman
                            volunteer saya jauh lebih mudah.
                            Materi ajarnya lengkap dan mudah
                            dipahami anak-anak. Saya bisa fokus
                            mengajar tanpa khawatir kehabisan
                            bahan."
                    profil="MNP"
                    nama="Muhammad Nayaka Putra"
                    universitas="Universitas Sumatera Utara"
                    asal="Desa Sampali, Medan"
                />
                <ReviewCard
                    quote="SETARA membuat pengalaman
                            volunteer saya jauh lebih mudah.
                            Materi ajarnya lengkap dan mudah
                            dipahami anak-anak. Saya bisa fokus
                            mengajar tanpa khawatir kehabisan
                            bahan."
                    profil="MNP"
                    nama="Muhammad Nayaka Putra"
                    universitas="Universitas Sumatera Utara"
                    asal="Desa Sampali, Medan"
                />
                <ReviewCard
                    quote="SETARA membuat pengalaman
                            volunteer saya jauh lebih mudah.
                            Materi ajarnya lengkap dan mudah
                            dipahami anak-anak. Saya bisa fokus
                            mengajar tanpa khawatir kehabisan
                            bahan."
                    profil="MNP"
                    nama="Muhammad Nayaka Putra"
                    universitas="Universitas Sumatera Utara"
                    asal="Desa Sampali, Medan"
                />
            </div>
        </div>
    )
}

export default ReviewSection