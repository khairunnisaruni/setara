import React from 'react'

const FilterMateri = ({ name, total, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`w-30 justify-center py-1.5 flex items-center gap-x-2 rounded-[20px] cursor-pointer
            ${isActive
                    ? 'bg-[#FF9500] border-[#FF9500]'
                    : 'bg-white border border-[#FF9500]'
                }
        `}>
            <div className={`font-bold  ${isActive ? 'text-white' : 'text-[#FF9500]'}`}>
                {name}
            </div>
            <div className='rounded-full w-6 h-6 font-semibold bg-[#FFB54D] text-white flex items-center justify-center'>
                {total}
            </div>
        </div>
    )
}

export default FilterMateri