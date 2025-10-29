function Button({text, onClick, variant = 'primary', className = "", withArrow = false}){

    const baseStyle = 'py-2 rounded-lg flex items-center justify-between cursor-pointer'

    let variantClass = '';

    if (variant === 'secondary') {
        variantClass = 'bg-[#FF9D01] text-white gap-x-3 px-7';
    } else if(variant === 'third'){
        variantClass = 'bg-[#FBF8F4] gap-x-3 text-[#515151] px-7';
    } else {
        variantClass = 'bg-[#FF9D01] text-white w-full'; 
    }

    return(
        <button className={`${baseStyle} ${variantClass} ${className}`} onClick={onClick}>
            <span>{text}</span>
            {withArrow && <span>→</span>}
        </button>
    )
}

export default Button