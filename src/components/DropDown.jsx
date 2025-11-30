import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';


const DropDown = ({ name, paths, item1, item2, item3 }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    const location = useLocation();

    const normalizedPaths = Array.isArray(paths) ? paths : [paths];

    const isActive = normalizedPaths.some(path => location.pathname.startsWith(path));

    return (
        <div className="relative inline-block text-left">
            <div
                className={`flex items-center gap-x-2 cursor-pointer ${isActive
                        ? 'text-[#FF9500]'
                        : 'text-black'
                    }`}
                onClick={toggleDropdown}
            >
                <div className='font-medium text-sm'>{name}</div>
                <div>
                    <FaChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>
            {isOpen && (
                <div
                    className="origin-top-left absolute left-0 rounded-b-md mt-4 shadow-lg bg-[#E7E1DA]"
                >
                    <div role="menu">
                        <a
                            href="#"
                            className="block py-2 px-5 text-sm font-medium hover:bg-gray-100 whitespace-nowrap"
                        >
                            {item1}
                        </a>
                        <a
                            href=""
                            className="block py-2 px-5 text-sm font-medium hover:bg-gray-100 whitespace-nowrap"
                        >
                            {item2}
                        </a>
                        <a
                            href="#"
                            className="block py-2 px-5 text-sm font-medium hover:bg-gray-100 whitespace-nowrap"
                        >
                            {item3}
                        </a>

                    </div>
                </div>
            )}
        </div>
    )
}

export default DropDown