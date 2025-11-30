function Button({ text, onClick, variant = 'primary', className = "", withArrow = false }) {

    // jika withArrow = true → gunakan justify-between
    // jika tidak → gunakan justify-center
    const baseStyle = `py-2 rounded-lg text-center flex items-center 
        ${withArrow ? "justify-between" : "justify-center"}`;

    let variantClass = '';

    if (variant === 'secondary') {
        variantClass = 'bg-gray-500 text-white';
    } else if (variant === 'third') {
        variantClass = 'bg-[#FBF8F4] gap-x-3 text-[#515151] px-7';
    } else {
        variantClass = 'bg-[#FF9D01] text-white w-full';
    }

    return (
        <button
            className={`${baseStyle} ${variantClass} ${className}`}
            onClick={onClick}
        >
            <span>{text}</span>
            {withArrow && <span>→</span>}
        </button>
    )
}

export default Button;
