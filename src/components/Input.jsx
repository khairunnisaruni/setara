function Input({ label, type, value, onChange, placeholder, options = [] }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#FBF8F4] mb-1">
        {label}
      </label>

      {type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2 bg-[#FFFFFF]/24 text-white rounded-[40px] border-0 
                     focus:outline-none focus:ring-1 focus:ring-[#FFFFFF]/25"
        >
          <option value="" className="text-gray-400">
            {placeholder}
          </option>

          {options.map((opt, idx) => (
            <option key={idx} value={opt} className="text-black">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 placeholder:text-white/50 bg-[#FFFFFF]/24 rounded-[40px] border-0 
                     focus:outline-none focus:ring-1 focus:ring-[#FFFFFF]/25"
        />
      )}
    </div>
  );
}

export default Input;
