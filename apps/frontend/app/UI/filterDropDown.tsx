"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FilterDropdown = ({ 
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
        className={`flex items-center justify-between min-w-40 px-4 py-2 bg-gray-800 rounded-lg text-sm ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-700'
        }`}
      >
        <span className="mr-2">{value || placeholder}</span>
        <ChevronDown size={16} />
      </button>
      
      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-lg shadow-lg py-1 max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
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