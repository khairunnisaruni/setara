import CardMateri from '../../../components/ruang_volunteer/CardMateri';
import FilterMateri from '../../../components/ruang_volunteer/FilterMateri'
import React, { useState } from 'react';


const allMaterials = [
    {
        id: 1,
        name: "Modul Literasi Dasar",
        type: "PAUD",
        byte: "2.5 MB",
        extension: "PDF",
        total: "12 Downloads"
    },
    {
        id: 2,
        name: "Modul Numerasi Awal",
        type: "SD Kelas 1 - 4",
        byte: "5.0 MB",
        extension: "Audio",
        total: "12 Downloads"
    },
    {
        id: 3,
        name: "Modul Sains Menyenangkan",
        type: "SD Kelas 5 - 6",
        byte: "10.2 MB",
        extension: "Video",
        total: "12 Downloads"
    },
    {
        id: 4,
        name: "Modul Membaca Cepat",
        type: "PAUD",
        byte: "1.8 MB",
        extension: "PDF",
        total: "8 Downloads"
    }
];

const MainMMSection = () => {

    const [activeFilter, setActiveFilter] = useState('Semua');

    const filters = [
        { name: 'Semua', value: 'Semua', total: 14 },
        { name: 'PAUD', value: 'PAUD', total: 14 },
        { name: 'SD 1-4', value: 'SD Kelas 1 - 4', total: 10 },
        { name: 'SD 5-6', value: 'SD Kelas 5 - 6', total: 8 },
    ];

    const filteredMaterials = allMaterials.filter(material => {
        if (activeFilter === 'Semua') {
            return true;
        }
        return material.type === activeFilter;
    });

    return (
        <div className=' flex flex-col items-center gap-y-7 py-20 px-12'>
            <div className='flex text-6xl font-bold flex-col items-center gap-y-4'>
                <div className="">
                    <div>Materi <span className="bg-[#FF9500] bg-clip-text text-transparent drop-shadow-md">Multimedia</span></div>
                </div>
                <div className="flex max-w-[55%] text-lg font-normal text-[#757570] text-center flex-col items-center font-sans">
                    <div>
                        Akses berbagai format materi pembelajaran yang siap digunakan dalam kegiatan mengajar
                    </div>
                </div>
            </div>
            <div className='flex gap-x-2'>
                {filters.map((filter) => (
                    <FilterMateri
                        key={filter.name}
                        name={filter.name}
                        total={filter.total}
                        isActive={activeFilter === filter.value}
                        onClick={() => setActiveFilter(filter.value)}
                    />
                ))}
                <div className='w-9 h-9 text-2xl flex justify-center bg-[#FF9500] text-white rounded-full'>
                    +
                </div>
            </div>
            <div className='w-full justify-between grid grid-cols-3 gap-6'>
                {filteredMaterials.map(material => (
                    <CardMateri
                        key={material.id}
                        name={material.name}
                        type={material.type}
                        byte={material.byte}
                        extension={material.extension}
                        total={material.total}
                    />
                ))}
                {filteredMaterials.length === 0 && (
                    <div className="text-center col-span-3 text-gray-500">
                        Tidak ada materi untuk filter ini.
                    </div>
                )}
            </div>
        </div>
    )
}

export default MainMMSection