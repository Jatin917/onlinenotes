// components/ThemeToggle.jsx
"use client";
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ initialTheme = 'dark', onChange }) => {
  const [theme, setTheme] = useState(initialTheme);

  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    if (onChange) {
      onChange();
    }
  };

  return (
    <div 
      className="relative bg-black rounded-full p-2 w-32 h-16 flex items-center cursor-pointer"
      onClick={handleToggle}
    >
      {/* Left Icon */}
      <div className={`w-1/2 flex justify-center items-center z-10 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-400'}`}>
        <Moon size={24} />
      </div>
      
      {/* Right Icon */}
      <div className={`w-1/2 flex justify-center items-center z-10 transition-colors duration-300 ${theme === 'light' ? 'text-black' : 'text-gray-400'}`}>
        <Sun size={24} />
      </div>
      
      {/* Slider */}
      <div 
        className={`absolute top-2 h-12 w-16 bg-white rounded-full transition-transform duration-300 ease-in-out ${
          theme === 'dark' ? 'left-2' : 'left-14'
        }`}
      />
    </div>
  );
};

export default ThemeToggle;