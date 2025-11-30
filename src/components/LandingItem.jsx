function LandingItem({icon, label, value, className, variant = 'primary'}){
    if (variant === 'second'){
        return(
            <div className="flex flex-col py-8 items-center max-w-[1/2] px-4 w-full gap-y-3 border bg-[#FFFFFF] border-[#E7E1DA] rounded-xl text-black text-center">
                <div className={`text-3xl w-16 h-16 flex justify-center items-center rounded-full bg-linear-to-r from-[#FF9500]/20 to-[#317C76]/20 ${className || ""}`}>{icon}</div>
                <p className="text-4xl font-bold">{label}</p>
                <p className="text-sm text-[#757570]">{value}</p>
            </div>
        )
    } else if(variant === 'third'){
        return(
            <div className="flex py-6 items-start px-4 w-full gap-x-5 border bg-[#FFFFFF] border-[#E7E1DA] rounded-xl ">
                <div className={`text-xl w-10 h-10 flex justify-center items-center rounded-full mt-1 bg-linear-to-r from-[#FF9500]/20 to-[#317C76]/20 ${className || ""}`}>{icon}</div>
                <div className="flex flex-col text-start items-start">
                    <p className="text-2xl font-semibold">{label}</p>
                    <p className="text-sm text-[#757570]">{value}</p>
                </div>
            </div>
        )
    } else{
        return(
            <div className="flex flex-col items-center text-white text-center">
                <div className="text-3xl">{icon}</div>
                <p className="text-4xl font-bold">{label}</p>
                <p className="text-sm">{value}</p>
            </div>
        )
    }
}

export default LandingItem