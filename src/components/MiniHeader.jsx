function MiniHeader({icon, value, className = 'bg-[#FBF8F4]/10 border'}){
    const baseClasses = "max-w-[280px] flex justify-center items-center gap-x-2 px-5 py-2 rounded-[40px] ";
    return(
        <div className={`${baseClasses} ${className}`}>
            {icon}
            <div className="text-sm font-medium">{value}</div>
        </div>
    )   
}

export default MiniHeader