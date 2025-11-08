import React, { useState } from "react";
import { Form } from "react-router-dom";

const MainKuisSection = () => {
  const [showForm, setShowForm] = useState(false);

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
        <section className="max-w-6xl mx-auto mt-16 mb-20">
            <h2 className="text-2xl text-center items-center justify-center font-bold mb-5">Daftar Kuis & Game Interaktif</h2>
            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row items-center gap-4">

              {/* Search */}
              <div className="bg-white relative w-full md:w-1/3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5">
                  <img src="src/assets/SVG (5).png" alt="" />
                </span>
                <input
                  type="text"
                  placeholder="Cari Kuis & Game..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Dropdown Kelas */}
              <select className="bg-white w-full md:w-40 py-2 px-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500">
                <option>Semua Kelas</option>
                <option>Kelas 1</option>
                <option>Kelas 2</option>
                <option>Kelas 3</option>
              </select>

              {/* Dropdown Mapel */}
              <select className="bg-white w-full md:w-48 py-2 px-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500">
                <option>Semua Mata Pelajaran</option>
                <option>Matematika</option>
                <option>IPA</option>
                <option>IPS</option>
              </select>

              {/* Dropdown Platform */}
              <select className="bg-white w-full md:w-44 py-2 px-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500">
                <option>Semua Platform</option>
                <option>Kahoot</option>
                <option>Wayground</option>
              </select>

              {/* Tombol Tambah Kuis */}
              <button 
                onClick={() => setShowForm(true)}
                className="cursor-pointer w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full shadow">
                + Tambah Kuis
              </button>

            </div>
            {/* Grid Kuis */}
            <div className="grid md:grid-cols-4 gap-6 mt-10">
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
                        <div className="w-6"><img src="src/assets/bxs_school.png" alt="" /></div>
                        <span className="text-sm font-bold text-[#FF9500]">6 SD</span>
                      </div>
                      <div className="flex items-center justify-center p-1 outline-1 outline-[#317B74] rounded-full">
                        <span className="text-xs font-semibold text-[#317B74] px-2">Bahasa Inggris</span>
                      </div>
                  </div>
                  <h3 className="font-bold text-lg text-[#343432] mb-1">Past Tense</h3>
                  <p className="text-[#757570] text-sm">Materi Past Tense yang sesuai untuk kelas 6 Sekolah Dasar</p>
                  <div className="flex justify-center mt-2">
                      <img src="src/assets/kahoot.png" alt="Kahoot" className="h-8" />   
                  </div>
                  <button className="cursor-pointer mt-4 w-full bg-orange-500 text-white font-semibold py-2 rounded-full hover:bg-orange-600 transition">
                      Play
                  </button>
              </div>
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
                        <div className="w-6"><img src="src/assets/bxs_school.png" alt="" /></div>
                        <span className="text-sm font-bold text-[#FF9500]">6 SD</span>
                      </div>
                      <div className="flex items-center justify-center p-1 outline-1 outline-[#317B74] rounded-full">
                        <span className="text-xs font-semibold text-[#317B74] px-2">Bahasa Inggris</span>
                      </div>
                  </div>
                  <h3 className="font-bold text-lg text-[#343432] mb-1">Past Tense</h3>
                  <p className="text-[#757570] text-sm">Materi Past Tense yang sesuai untuk kelas 6 Sekolah Dasar</p>
                  <div className="flex justify-center mt-2">
                      <img src="src/assets/wayground.png" alt="Kahoot" className="h-8" />   
                  </div>
                  <button className="cursor-pointer mt-4 w-full bg-orange-500 text-white font-semibold py-2 rounded-full hover:bg-orange-600 transition">
                      Play
                  </button>
              </div>

            </div>
        </section>
      
      {/* Pop Up Form */}
      {showForm && (
        <form>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-96 max-h-[90vh] overflow-y-auto animate-[fadeIn_.2s_ease]">
              
              <h2 className="text-xl font-bold mb-4 text-center">Tambah Kuis & Game</h2>

              <div className="space-y-3">
                
                <div>
                  <label className="text-sm font-medium">Judul Kuis & Game</label>
                  <input 
                    type="text"
                    className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 placeholder-[#B0AA9C]"
                    placeholder="Masukkan judul Kuis & Game"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Deskripsi (15 Kata)</label>
                  <textarea className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400 placeholder-[#B0AA9C]" placeholder="Deskripsi singkat tentang kuis & game" name="deskripsi" id=""></textarea>
                </div>

                <div>
                  <label className="text-sm font-medium">Platform (Kahoot atau Wayground)</label>
                  <select className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400">
                    <option className="text-[#B0AA9C]" value="" disabled selected hidden>Pilih Platform</option>
                    <option value="kahoot">Kahoot</option>
                    <option value="wayground">Wayground</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Link Kuis</label>
                  <input 
                    type="url"
                    className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] placeholder-[#B0AA9C] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400"
                    placeholder="Masukkan Link Kahoot atau Wayground"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Kategori Mata Pelajaran</label>
                  <select className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400">
                    <option className="text-[#B0AA9C]" value="" disabled selected hidden>Pilih Mapel</option>
                    <option>Bahasa Inggris</option>
                    <option>Matematika</option>
                    <option>IPA</option>
                    <option>IPS</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Kategori Kelas</label>
                  <select className="w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-400">
                    <option className="text-[#B0AA9C]" value="" disabled selected hidden>Pilih Kelas</option>
                    <option>1 SD</option>
                    <option>2 SD</option>
                    <option>3 SD</option>
                    <option>4 SD</option>
                    <option>5 SD</option>
                    <option>6 SD</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Upload Gambar Pendukung</label>
                  <label className="flex items-center gap-2 w-full mt-1 border border-[#E0DCD3] bg-[#F8F4EA] text-[#B0AA9C] rounded-xl px-3 py-2 cursor-pointer">
                    <img src="src/assets/upload.png" className="w-5" alt="upload" />
                    <span className="text-sm">Unggah File</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>

              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={() => setShowForm(false)}
                  className="font-bold px-4 py-2 w-36 rounded-xl border border-gray-300 hover:bg-gray-100 text-[#FFA01A]"
                >
                  Batal
                </button>
                <button className="font-bold px-4 py-2 w-36 bg-orange-500 text-white rounded-xl hover:bg-orange-600">
                  Simpan
                </button>
              </div>

            </div>
          </div>
        </form>
      )}

    </div>
  )
}

export default MainKuisSection