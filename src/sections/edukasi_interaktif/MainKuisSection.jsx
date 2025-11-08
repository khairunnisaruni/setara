import React, { useState } from "react";
import { Form } from "react-router-dom";
import DaftarKuis from '../../components/edukasi_interaktif/DaftarKuis';


const MainKuisSection = () => {
  return (
    <div className="bg-[#FBF8F3] min-h-screen text-gray-800">
        {/* Tentang Kahoot & Wayground */}
        <section className="max-w-6xl mx-auto bg-white shadow p-8 rounded-2xl">
          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-7 mt-10">
              <div className="w-3xs"><img src="src/assets/kahoot.png" alt="" /></div>
              <div className="w-2xs"><img src="src/assets/wayground.png" alt="" /></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Tentang Kahoot dan Wayground/Quizizz</h2>
              <p className="text-gray-600 mb-4">
                  <b>Kahoot</b> dan <b>Wayground/Quizizz</b> adalah platform pembelajaran berbasis game yang membuat belajar menjadi menyenangkan dan interaktif.
                  Anda dapat membuat dan memainkan kuis dengan cara yang menarik!
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Pertanyaan interaktif dengan batas waktu</li>
                  <li>Sistem poin</li>
                  <li>Meningkatkan pemahaman siswa dengan cara menyenangkan</li>
              </ul>
              <p className="mt-4 text-gray-600">Pelajari lebih lanjut cara membuat kuis di situs resmi <b>Kahoot</b> <a className="text-[#E17100] font-medium" href="https://kahoot.com/blog/2021/01/28/how-to-create-kahoot-tips-teachers/">Selengkapnya</a></p>
              <p className="mt-4 text-gray-600">Pelajari lebih lanjut cara membuat kuis di situs resmi <b>Wayground/Quizizz</b> <a className="text-[#E17100] font-medium" href="https://www.youtube.com/watch?v=c7wsa2by7yE">Selengkapnya</a></p>
              </div>
          </div>
        </section>

        {/* Mengapa Kahoot dan Wayground/Quizizz ? */}
        <section className="max-w-6xl mx-auto mt-14">
            <h2 className="text-center text-2xl font-bold mb-8">Mengapa Kahoot dan Wayground/Quizizz?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex bg-white gap-x-3 shadow rounded-2xl p-6 text-left hover:shadow-lg transition h-fit">
                <div className='w-24'><img src="src/assets/SVG.png" alt=""/></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pembelajaran Interaktif</h3>
                  <p className="text-gray-600">Belajar dengan cara yang menyenangkan melalui game</p>
                </div>
              </div>
              <div className="flex bg-white gap-x-3 shadow rounded-2xl p-6 text-left hover:shadow-lg transition h-fit">
                <div className='w-24'><img src="src/assets/SVG (1).png" alt=""/></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pembelajaran Interaktif</h3>
                  <p className="text-gray-600">Belajar dengan cara yang menyenangkan melalui game</p>
                </div>
              </div>
              <div className="flex bg-white gap-x-3 shadow rounded-2xl p-6 text-left hover:shadow-lg transition h-fit">
                <div className='w-24'><img src="src/assets/SVG (2).png" alt=""/></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pembelajaran Interaktif</h3>
                  <p className="text-gray-600">Belajar dengan cara yang menyenangkan melalui game</p>
                </div>
              </div>
            </div>
        </section>

        {/* Siap Bermain */}
        <section className="max-w-4xl mx-auto text-center mt-14 bg-linear-to-br from-teal-700 via-amber-500/90 to-amber-300 p-10 rounded-3xl shadow">
          <div className="flex gap-x-5 items-center text-center justify-center">
            <div className="w-14 h-14 p-3 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-center">
              <img src="src/assets/SVG (3).png" alt="" />
            </div>
            <h2 className="text-white text-2xl font-semibold mb-3">Siap Bermain?</h2>
          </div>
          <p className="text-white/90 mb-6">Klik tombol di bawah untuk membuka Kahoot atau Wayground dan mulai membuat kuis interaktif!</p>
          <div className="flex justify-center gap-4">
              <button className="cursor-pointer flex items-center gap-x-3 bg-white text-[#FF9602] font-semibold px-6 py-2 rounded-xl hover:bg-orange-100 transition">
                <div className="w-5"><img src="src/assets/SVG (4).png" alt="" /></div>
                  Buka Kahoot
              </button>
              <button className="cursor-pointer flex items-center gap-x-3 bg-white text-[#FF9602] font-semibold px-6 py-2 rounded-xl hover:bg-orange-100 transition">
                  <div className="w-5"><img src="src/assets/SVG (4).png" alt="" /></div>
                  Buka Wayground
              </button>
          </div>
        </section>
            
       {/* Daftar Kuis */}
        <DaftarKuis/>

    </div>
  )
}

export default MainKuisSection