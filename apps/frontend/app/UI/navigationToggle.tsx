"use client";
import { useState } from 'react';

export const  NavigationToggle = ({ options = ['Solutions', 'PYPs'], activeIndex = 0, onChange }) => {
  const [active, setActive] = useState(activeIndex);

  const handleOptionClick = (index) => {
    setActive(index);
    if (onChange) {
      onChange(options[index], index);
    }
  };

  return (
    <div className="bg-gray-800 rounded-full px-1 py-1 flex items-center w-full md:w[30%]">
      {options.map((option, index) => (
        <button
          key={option}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            active === index ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => handleOptionClick(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
