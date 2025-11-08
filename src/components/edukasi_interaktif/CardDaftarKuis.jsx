import React, { useState } from "react";

const CardDaftarKuis = ({gambar, kelas, mapel, judul, deskripsi, gambarplatform}) => {

    return (
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-2">
            <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-200">
                <img 
                    src="src/assets/inggris.png" 
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex justify-between items-center mb-2 mt-3">
                <div className="flex gap-x-2">
                <div className="w-6"><img src={gambar} alt="" /></div>
                <span className="text-sm font-bold text-[#FF9500]">{kelas}</span>
                </div>
                <div className="flex items-center justify-center p-1 outline-1 outline-[#317B74] rounded-full">
                <span className="text-xs font-semibold text-[#317B74] px-2">{mapel}</span>
                </div>
            </div>
            <h3 className="font-bold text-lg text-[#343432] mb-1">{judul}</h3>
            <p className="text-[#757570] text-sm">{deskripsi}</p>
            <div className="flex justify-center mt-2">
                <img src={gambarplatform} alt="" className="h-8" />
            </div>
            <button className="cursor-pointer mt-4 w-full bg-orange-500 text-white font-semibold py-2 rounded-full hover:bg-orange-600 transition">
                Play
            </button>
        </div>
    )
}
export default CardDaftarKuis