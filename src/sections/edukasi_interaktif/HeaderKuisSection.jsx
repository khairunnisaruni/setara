import React from 'react'

const HeaderKuis = () => {
  return (
    <div className='w-full h-[400px] bg-linear-to-r from-[#FF9D01] to-[#FFFFFF]/80  relative'>
        <div className='absolute top-0 left-0 h-[400px] flex items-center pb-10 '>
            <img src="src/assets/game controller.png" className='w-[500px] mix-blend-color-burn' alt="" />
        </div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-3xl font-bold flex-col items-center gap-y-4'>
                <div className="">
                    <div>Kuis & Game <span className="bg-[#FF9500] bg-clip-text text-transparent drop-shadow-md">Interaktif</span></div>
                </div>
                <div className="flex max-w-[55%] text-sm font-normal text-[#757570] text-center flex-col items-center font-sans whitespace-nowrap">
                    <div>
                        Uji pengetahuan siswa tentang berbagai mata pelajaran dengan kuis dan game interaktif
                    </div>
                    <div className='mt-4 flex items-center gap-x-3'>
                        <div>Powered by: </div>
                        <div><img src="src/assets/kahoot.png" alt="" /></div>
                    </div>
                </div>
            </div>
        <div className='absolute top-0 right-0 h-[400px] flex items-center pt-2 pr-20'>
            <img src="src/assets/question.png" className='w-[350px] mix-blend-color-burn' alt="" />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    className="w-full h-24"
                >
                    <path
                        fill="#FAF8F4"
                        fill-opacity="1"
                        d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,218.7C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    ></path>
                </svg>
            </div>
    </div>
  )
}

export default HeaderKuis