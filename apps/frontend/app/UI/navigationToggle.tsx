"use client";
import { useState } from 'react';

export const  NavigationToggle = ({ options = ['Solutions', 'PYPs'], activeIndex = 0, onChange, theme }) => {
  const [active, setActive] = useState(activeIndex);

  const handleOptionClick = (index) => {
    setActive(index);
    if (onChange) {
      onChange(options[index], index);
    }
  };

  return (
    <div
      className={`rounded-full px-1 py-1 flex items-center w-full  ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {options.map((option, index) => (
        <button
          key={option}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            active === index
              ? theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-900"
              : theme === "dark"
              ? "text-gray-400 hover:text-gray-300"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => handleOptionClick(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
  
  
};
