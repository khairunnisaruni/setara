import React from 'react'
import SearchPojokBuku from '../../../components/ruang_volunteer/SearchPojokBuku'

const MainPBSection = () => {
  return (
    <div className=' flex flex-col items-center gap-y-7 py-20 px-12'>
      <div className='flex text-6xl font-bold flex-col items-center gap-y-4'>
        <div className="">
          <div>Pojok <span className="bg-[#FF9500] bg-clip-text text-transparent drop-shadow-md">Buku</span></div>
        </div>
        <div className="max-w-full text-lg font-normal text-[#757570] text-center flex-col items-center font-sans inline-block">
          Bagikan dan temukan rekomendasi buku terbaik untuk pembelajaran
        </div>
      </div>
      <div className='w-[60%]'>
        <div className='flex gap-x-5'>
          <SearchPojokBuku />
          <div className='w-10 text-2xl flex justify-center bg-[#FF9500] text-white rounded-full'>
            +
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPBSection