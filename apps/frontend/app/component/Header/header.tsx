"use client";
// "use client";
const Logo = () => {
    return (
      <div className="flex items-center">
        <div className="w-8 h-8 flex flex-col">
          <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
          <div className="w-4 h-4 bg-indigo-700 rounded-sm ml-4 -mt-1"></div>
        </div>
      </div>
    );
  };
  
  
//   // components/Header/SignInButton.jsx
  const SignInButton = ({theme}) => {
    return (
      <button
        onClick={()=>signIn()}
        className={`w-[80px] py-2 px-4 rounded-full transition-colors text-sm font-medium ${
          theme === "dark"
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "bg-white text-gray-900 hover:bg-gray-300"
        }`}
      >
        Sign in
      </button>
    );
    
  };
  const SignOutButton = ({ theme, data }) => {
    const [isOpen, setIsOpen] = useState(false);
    if (!data) return null;
  
    return (
      <div className="relative inline-block">
        <img
          src={data.user.image || "/default-avatar.png"}
          alt="User Profile"
          className="w-16 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-gray-400"
          onMouseEnter={() => setIsOpen(true)}
        />
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg overflow-hidden"
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              onClick={() => signOut()}
              className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  };

  
  
 
import { useState, useEffect } from 'react';
import { NavigationToggle } from '../../UI/navigationToggle';
import { FilterDropdown } from '../../UI/filterDropDown';
import SearchBar from '../../UI/searchBar';
import ThemeToggle from '../../UI/toggleDark';
import MobileMenu from '../../UI/mobileMenu';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
  const session = useSession();
  const {data, status} = useSession();
  console.log("session is ", session);
  const [activeNav, setActiveNav] = useState('Compositions');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isMobile, setIsMobile] = useState(false);
  
  const years = ['2022', '2023', '2024', '2025'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  
  // Check window size for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleNavChange = (option) => {
    setActiveNav(option);
  };
  
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedSubject(null); // Reset subject when year changes
  };
  
  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };
  
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // Apply theme changes to your app here
  };
  return (
    <header
      className={`w-full py-4 px-4 md:px-6 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-200 text-gray-800 border-b border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Logo />
          <div className="hidden lg:block">
            <NavigationToggle
              theme={theme}
              options={["NOTES", "PYPs"]}
              activeIndex={0}
              onChange={handleNavChange}
            />
          </div>
        </div>
  
        {/* Middle - Filters (Desktop only) */}
        <div className="hidden lg:flex items-center space-x-4">
          <FilterDropdown
            theme={theme}
            placeholder="Select Year"
            options={years}
            value={selectedYear}
            onChange={handleYearChange}
          />
          <FilterDropdown
            theme={theme}
            placeholder="Select Subject"
            options={subjects}
            value={selectedSubject}
            onChange={handleSubjectChange}
            disabled={!selectedYear}
          />
        </div>
  
        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Search Bar (Always visible, but smaller on mobile) */}
          <div className="w-36 md:w-full">
            <SearchBar theme={theme} />
          </div>
  
          {/* Desktop Elements (Hidden on mobile) */}
          <div className="hidden lg:block">
            <ThemeToggle initialTheme={theme} onChange={handleThemeChange} />
          </div>
          <div>
            {status!=="authenticated" ? <SignInButton theme={theme} /> : <SignOutButton theme={theme} data={data} />}
          </div>
  
          {/* Mobile Menu (Appears below 1024px) */}
          <div className="lg:hidden">
            <MobileMenu
              years={years}
              subjects={subjects}
              selectedYear={selectedYear}
              selectedSubject={selectedSubject}
              theme={theme}
              onYearChange={handleYearChange}
              onSubjectChange={handleSubjectChange}
              onThemeChange={handleThemeChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
  
  
};

export default Header;