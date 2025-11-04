import React from 'react'
import { HiDownload } from "react-icons/hi";

const CardMateri = ({ name, type, byte, extension, total }) => {

    const colorMap = {
        pdf: {
            bg: 'bg-[#FFF1DD]',
            border: 'border-[#FF9500]',
            text: 'text-[#FF9500]'
        },
        audio: {
            bg: 'bg-[#DDF6FF]',
            border: 'border-[#317C76]',
            text: 'text-[#317C76]'
        },
        video: {
            bg: 'bg-[#DDFFE4]',
            border: 'border-[#3C7C31]',
            text: 'text-[#3C7C31]'
        },
        default: {
            bg: 'bg-gray-100',
            border: 'border-gray-500',
            text: 'text-gray-500'
        }
    };

    const extensionKey = extension ? extension.toLowerCase() : 'default';
    const colors = colorMap[extensionKey] || colorMap.default;

    return (
        <div className='border border-[#000000]/25 rounded-[20px] px-7 py-[25px] flex flex-col gap-y-4 justify-between'>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-y-4'>
                    <div className={`w-16 h-16 border rounded-[20px] ${colors.bg} ${colors.border} `}></div>
                    <div>
                        <div className='font-bold'>{name}</div>
                        <div className='font-medium text-sm'>{type}</div>
                    </div>
                    <div className='font-medium text-sm'>{byte}</div>
                </div>
                <div className='flex flex-col justify-between '>
                    <div className={`px-2 mx-3 py-1  border rounded-[20px] flex justify-center text-sm ${colors.bg} ${colors.border} ${colors.text} `}>
                        {extension}
                    </div>
                    <div className='font-medium text-sm inline-block'>
                        {total}
                    </div>
                </div>
            </div>
            <div className='py-1 w-full border border-[#000000] flex justify-center items-center gap-x-1 rounded-[20px]'>
                <HiDownload />
                <p>Download</p>
            </div>
        </div>
    )
}

export default CardMateri