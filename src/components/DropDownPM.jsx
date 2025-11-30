import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const DropDownPM = ({ name, explain}) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <>
            <div className='py-2 flex items-center justify-between' onClick={toggleOpen}>
                <div className='font-medium'>{name}</div>
                <div>
                    <FaChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>
            <div
                // 8. Trik Animasi: Gunakan 'max-height' untuk slide-down
                // 'overflow-hidden' menyembunyikan konten saat tertutup
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96' : 'max-h-0' 
                }`} // max-h-96 adalah nilai besar, bisa diganti
            >
                {/* 9. Tampilkan 'explain' prop di dalam sini */}
                <div className="py-4 text-gray-700">
                    {explain}
                </div>
            </div>
            <div className='w-full h-[0.8px] bg-[#E7E1DA]'></div>
        </>
    )
}

export default DropDownPM