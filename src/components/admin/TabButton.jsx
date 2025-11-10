const TabButton = ({ active, onClick, children, badge }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg relative ${
      active
        ? "text-amber-600 bg-amber-50 border border-amber-200"
        : "text-gray-500 hover:text-amber-500 hover:bg-gray-50"
    }`}
  >
    {children}
    {badge && (
      <span className="ml-2 bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

export default TabButton;
