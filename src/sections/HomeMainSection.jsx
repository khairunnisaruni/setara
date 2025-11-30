import React from 'react'
import TentangSection from './secondsections/TentangSection'
import FiturSection from './secondsections/FiturSection'
import ReviewSection from './ReviewSection'

const HomeMainSection = () => {
  return (
    <div className="h-auto flex flex-col gap-y-32 py-20  bg-[#FBF8F4] w-full">
        <TentangSection/>
        <FiturSection/>
    </div>
  )
}

export default HomeMainSection