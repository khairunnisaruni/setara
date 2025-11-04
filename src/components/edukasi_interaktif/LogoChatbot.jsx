import React from 'react'

const Logo = () => {
  return (
    <div className='flex gap-x-3'>
        <img src="src/assets/tara_logo.png" className='w-9' alt="" />
        <p className='text-3xl font-bold'>Chat <span className='bg-linear-to-r from-[#FFB54D] via-[#317B74] to-[#FFB54D] bg-clip-text text-transparent'>TARA</span></p>
    </div>
  )
}

export default Logo