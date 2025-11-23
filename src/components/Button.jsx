function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  withArrow = false,
}) {
  const baseStyle = `py-2 rounded-lg text-center flex items-center 
        ${withArrow ? "justify-between" : "justify-center"}`;

  let variantClass = "";

  if (variant === "secondary") {
    variantClass = "bg-gray-500 text-white";
  } else if (variant === "third") {
    variantClass = "bg-[#FBF8F4] gap-x-3 text-[#515151] px-7";
  } else {
    variantClass = "bg-[#FF9D01] text-white w-full";
  }

  return (
    <button
      type={type}
      className={`${baseStyle} ${variantClass} ${className}`}
      onClick={onClick}
    >
      <span>{text}</span>
      {withArrow && <span>→</span>}
    </button>
  );
}

export default Button;
