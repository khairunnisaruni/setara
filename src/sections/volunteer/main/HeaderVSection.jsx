import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { HiUsers, HiBookOpen } from "react-icons/hi";
import Button from "../../../components/Button";
import LandingItem from "../../../components/LandingItem";
import MiniHeader from "../../../components/MiniHeader";
// import { FiTarget, FiTrendingUp } from "react-icons/fi";
// import TentangSection from "./sections/secondsections/TentangSection";


const HeaderVSection = () => {
    return (
        <div className="h-[600px] w-full relative bg-cover flex pb-24 items-center px-20 justify-center bg-linear-to-br from-[#FF9D01] to-[#317B74]/85">
            <div className="flex gap-x-12 text-[#FBF8F4]">
                <div className='flex flex-col gap-y-6'>
                    <div className="flex text-7xl font-bold flex-col items-start w-4/5">
                        <div>Ruang</div>
                        <div className="bg-linear-to-r from-[#FFB54D] via-[#FBF8F4] to-[#FFB54D] bg-clip-text text-transparent drop-shadow-md">
                            Volunteer
                        </div>
                        <div className="flex text-sm font-normal mt-4 font-sans">
                            <div>
                                Akses panduan mengajar, materi pembelajaran, dan berbagi pengalaman dengan sesama volunteer. Mari wujudkan pendidikan berkualitas untuk semua anak Indonesia.
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        <Button
                            text="Mulai Mengajar"
                            variant="third"
                            className="text-[#FF9500]"
                            withArrow={true}
                        />
                        <Button
                            text="Lihat Panduan"
                            variant="third"
                        />
                    </div>

                </div>
                <div>
                    <img src="src/assets/bg-image-volunteer.png" className='w-full' alt="" />
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

export default HeaderVSection