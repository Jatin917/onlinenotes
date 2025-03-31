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
      onChange(newTheme);
    }
  };

  return (
    <div
      className="relative bg-gray-900 rounded-full p-1 w-20 h-10 flex items-center cursor-pointer"
      onClick={handleToggle}
    >
      {/* Left Icon (Moon - Dark Mode) */}
      <div
        className={`w-1/2 flex justify-center items-center z-10 transition-colors duration-300 ${
          theme === "dark" ? "text-gray-200" : "text-gray-500"
        }`}
      >
        <Moon size={20} />
      </div>
  
      {/* Right Icon (Sun - Light Mode) */}
      <div
        className={`w-1/2 flex justify-center items-center z-10 transition-colors duration-300 ${
          theme === "light" ? "text-yellow-500" : "text-gray-500"
        }`}
      >
        <Sun size={20} />
      </div>
  
      {/* Slider */}
      <div
        className={`absolute top-1 h-8 w-8 bg-white rounded-full transition-transform duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-0" : "translate-x-10"
        }`}
      />
    </div>
  );
  
  
};

export default ThemeToggle;