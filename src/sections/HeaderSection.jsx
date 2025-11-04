import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { HiUsers, HiBookOpen } from "react-icons/hi";
import gambarLatar from '../assets/bg-login.png'; 
import Button from "../components/Button";
import LandingItem from "../components/LandingItem";
import MiniHeader from "../components/MiniHeader";
// import { FiTarget, FiTrendingUp } from "react-icons/fi";
// import TentangSection from "./sections/secondsections/TentangSection";


const HeaderSection = () => {
  return (
    <div className="h-[1000px] w-full relative bg-cover flex pt-32 px-52 justify-center" style={{ backgroundImage: `url(${gambarLatar})` }}>
        <div className="flex flex-col gap-y-6 items-center text-[#FBF8F4]">
          <MiniHeader
            icon={<FaRegHeart className="w-5 h-5" />}
            value="Belajar, Berbagi, Bergerak"
          />
          <div className="flex text-6xl font-bold flex-col items-center">
            <div>Berbagi Ilmu,</div>
            <div>Mewujudkan</div>
            <div className="bg-linear-to-r from-[#FFB54D] via-[#FBF8F4] to-[#FFB54D] bg-clip-text text-transparent drop-shadow-md">
              Pendidikan Setara
            </div>
          </div>
          <div className="flex max-w-[55%] text-lg font-normal text-center flex-col items-center font-sans">
            <div>Platform edukasi dan volunteer berbasis mahasiswa untuk
              kesetaraan pendidikan di Indonesia. Dapatkan materi ajar dan
              panduan mengajar untuk volunteer di desa.
            </div>
          </div>
          <div className="flex gap-x-4">
            <Button
              text="Mulai Jadi Volunteer"
              variant="third"
              className="text-[#FF9500]"
              withArrow={true}
            />
            <Button
              text="Pelajari Lebih Lanjut"
              variant="third"
            />
          </div>
          <div className="h-0.5 w-[70%] bg-[#FBF8F4]/10 mt-6"></div>
          <div className="flex justify-between w-[50%]">
            <LandingItem
              icon={<HiUsers />}
              label="1000+"
              value="Volunter Aktif"
            />
            <LandingItem
              icon={<HiBookOpen />}
              label="500+"
              value="Materi Ajar"
            />
            <LandingItem
              icon={<FaRegHeart />}
              label="50+"
              value="Desa Terjangkau"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="w-full h-24"
          >
            <path
              fill="#FBF8F4"
              fill-opacity="1"
              d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,218.7C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
  )
}

export default HeaderSection