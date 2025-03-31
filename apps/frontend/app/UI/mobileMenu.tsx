"use client";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavigationToggle } from './navigationToggle';
import { FilterDropdown } from './filterDropDown';
import ThemeToggle from './toggleDark';

const MobileMenu = ({ 
  years, 
  subjects, 
  selectedYear, 
  selectedSubject, 
  theme,
  onYearChange, 
  onSubjectChange, 
  onThemeChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
  
      {isOpen && (
        <div
          className={`absolute top-16 left-0 right-0 ${
            theme === "dark"
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-gray-200 text-gray-800 border-gray-300"
          } shadow-lg z-50 py-4 px-6 flex flex-col space-y-4 border`}
        >
          <NavigationToggle
            theme={theme}
            options={["NOTES", "PYPs"]}
            activeIndex={0}
            onChange={() => {}}
          />
  
          <div className="flex flex-col space-y-3">
            <FilterDropdown
              theme={theme}
              placeholder="Select Year"
              options={years}
              value={selectedYear}
              onChange={onYearChange}
            />
            <FilterDropdown
              theme={theme}
              placeholder="Select Subject"
              options={subjects}
              value={selectedSubject}
              onChange={onSubjectChange}
              disabled={!selectedYear}
            />
          </div>
  
          <div className="flex items-center justify-between pt-2 border-t">
            <span
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Theme
            </span>
            <ThemeToggle initialTheme={theme} onChange={onThemeChange} />
          </div>
        </div>
      )}
    </div>
  );
  
};

export default MobileMenu;