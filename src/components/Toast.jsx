import React, { useEffect } from "react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`
        fixed top-6 right-6 z-[9999]
        px-4 py-2 rounded-lg shadow-lg text-white font-medium
        transition-opacity duration-300
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
      `}
    >
      {message}
    </div>
  );
};

export default Toast;
