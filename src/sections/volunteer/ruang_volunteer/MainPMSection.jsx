import React from 'react'
import DropDownPM from '../../../components/DropDownPM'

const MainPMSection = () => {
    return (
        <div className=' flex flex-col items-center gap-y-10 py-20'>
            <div className='flex text-6xl font-bold flex-col items-center gap-y-4'>
                <div className="">
                    <div>Panduan <span className="bg-[#FF9500] bg-clip-text text-transparent drop-shadow-md">Mengajar</span></div>
                </div>
                <div className="flex max-w-[55%] text-lg font-normal text-[#757570] text-center flex-col items-center font-sans">
                    <div>
                        Temukan berbagai sumber daya untuk membantu Anda mempersiapkan dan melaksanakan kegiatan mengajar yang menyenangkan dan efektif
                    </div>
                </div>
            </div>
            <div className='rounded-xl bg-white w-1/2 py-1 px-2 border border-[#E7E1DA]'>
                <DropDownPM 
                    name="Menggunakan Chatbot AI"
                    explain="apa saja hya"
                />
                <DropDownPM 
                    name="Membuat Kuis Interaktif"
                />
                <DropDownPM 
                    name="Menggunakan Game Interaktif"
                />
                <DropDownPM 
                    name="Mengelola Rekomendasi Buku"
                />
                <DropDownPM 
                    name="Upload Materi Multimedia"
                />
                <DropDownPM 
                    name="Mengatur Agenda Pribadi"
                />
            </div>
        </div>
    )
}

export default MainPMSection