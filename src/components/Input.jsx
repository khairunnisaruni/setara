function Input({label, type, value, onChange, placeholder}){
    return(
        <div>
            <label className="block text-sm font-medium text-[#FBF8F4] mb-1">
                {label}
            </label>
            <input 
                type={type} 
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 placeholder:text-white/50 bg-[#FFFFFF]/24 rounded-[40px] border-0 focus:outline-none focus:ring-1 focus:ring-[#FFFFFF]/25"
            />
        </div>
    )
}

export default Input