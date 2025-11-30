import React from 'react'


const FiturCard = ({ icon, label, value, className }) => {
    return (
        <div className="flex flex-col py-8 max-w-[1/2] px-8 w-full gap-y-4 border bg-[#FFFFFF] border-[#E7E1DA] rounded-xl text-black ">
            <div className={`text-3xl w-12 h-12 flex justify-center items-center rounded-2xl bg-linear-to-r from-[#FF9500]/20 to-[#317C76]/20 ${className || ""}`}>{icon}</div>
            <div>
                <p className="text-xl font-bold">{label}</p>
            </div>
            <div>
                <p className="text-sm text-[#757570]">{value}</p>
            </div>
            <a href="" className='text-[#FF9500]'>
                Pelajari →
            </a>
        </div>
    )
}

export default FiturCard