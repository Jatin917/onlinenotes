"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FilterDropdown = ({ 
theme,
  options = [], 
  disabled = false,
  value = null,
  onChange,
  placeholder = "Select..."
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between min-w-40 px-4 py-2 rounded-lg text-sm border ${
          theme === "dark"
            ? `bg-gray-900 text-white border-gray-700 ${
                disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`
            : `bg-white text-gray-900 border-gray-300 ${
                disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
              }`
        }`}
      >
        <span className="mr-2">{value || placeholder}</span>
        <ChevronDown size={16} />
      </button>
  
      {isOpen && !disabled && (
        <div
          className={`absolute z-10 mt-1 w-full rounded-lg shadow-lg py-1 max-h-60 overflow-auto border ${
            theme === "dark"
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm cursor-pointer ${
                theme === "dark"
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};