import React from 'react'

const SearchPojokBuku = () => {
  return (
    <div className='w-full'>
        <input type="text" 
         className='outline-none border w-full border-[#FF9500] text-sm px-5 py-2 rounded-[100px] placeholder:text-[#FF9500] placeholder:font-bold placeholder:text-lg'
         placeholder='Search'
        />
    </div>
  )
}

export default SearchPojokBuku