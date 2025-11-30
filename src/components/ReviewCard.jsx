import React from 'react'
import { MdOutlineFormatQuote } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";

const ReviewCard = ({ quote, profil, nama, universitas, asal, className }) => {
    return (
        <div className="flex flex-col py-8 max-w-[1/2] px-8 w-full gap-y-4 border bg-[#FFFFFF] border-[#E7E1DA] rounded-xl text-black ">
            <div>
                <MdOutlineFormatQuote
                    className='w-12 h-12 text-[#FF9500]/20'
                />
            </div>
            <div>
                <p className="text-sm italic text-[#757570]">{quote}</p>
            </div>
            <div className='flex gap-x-4'>
                <div className={`text-sm w-12 h-12 flex justify-center items-center rounded-full bg-linear-to-r from-[#FF9500]/20 to-[#317C76]/20 ${className || ""}`}>
                    {profil}
                </div>
                <div>
                    <div>
                        <p className="font-semibold">{nama}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#757570]">{universitas}</p>
                    </div>
                    <div>
                        <p className="text-sm text-[#317C76] flex items-center gap-x-1"><HiOutlineLocationMarker/> {asal}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReviewCard