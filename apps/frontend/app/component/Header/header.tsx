"use client";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { themeAtom } from '../../store/themeAtom';
import { cn } from '../../lib/utils';
import { useRouter } from 'next/navigation';
import MobileMenu from '../../UI/mobileMenu';
import SearchBar from '../../UI/searchBar';
import ThemeToggle from '../../UI/toggleDark';
import { NavigationToggle } from '../../UI/navigationToggle';
import {FilterDropdown} from '../../UI/filterDropDown';
import { Menu, X } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-1 group cursor-pointer">
      <div className="w-8 h-8 flex flex-col">
        <div className="w-4 h-4 bg-blue-600 rounded-sm transition-all duration-300 group-hover:rotate-12"></div>
        <div className="w-4 h-4 bg-indigo-700 rounded-sm ml-4 -mt-1 transition-all duration-300 group-hover:-rotate-12"></div>
      </div>
      <span className="text-lg font-bold hidden sm:block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
        StudyHub
      </span>
    </div>
  );
};

const SignInButton = ({ theme }) => {
  return (
    <button
      onClick={() => signIn()}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all",
        "flex items-center gap-2",
        "hover:shadow-md active:scale-95",
        theme === "dark"
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-900 hover:bg-gray-100 shadow-sm"
      )}
    >
      Sign in
    </button>
  );
};

const UserDropdown = ({ theme, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!data?.user) return null;

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={data.user.image || "/default-avatar.png"}
          alt="User Profile"
          className="w-8 h-8 rounded-full border-2 transition-all"
          style={{
            borderColor: theme === "dark" ? "#374151" : "#e5e7eb"
          }}
        />
      </div>
      
      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-50",
            "transition-all duration-200 origin-top-right",
            theme === "dark" 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          )}
        >
          <div className={cn(
            "p-3 border-b",
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          )}>
            <p className="text-sm font-medium truncate">{data.user.name}</p>
            <p className="text-xs truncate mt-1">
              {data.user.email}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className={cn(
              "block w-full text-left px-4 py-2 text-sm",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            )}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const { data, status } = useSession();
  const [theme, setTheme] = useRecoilState(themeAtom);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  const router = useRouter();
  const navItems = ["NOTES", "PYPs", "Profile"];
  const years = ['2022', '2023', '2024', '2025'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedSubject(null);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full py-3 px-4 sm:px-6 transition-colors duration-200",
        theme === "dark" 
          ? "bg-gray-900 text-white border-b border-gray-800" 
          : "bg-white text-gray-900 border-b border-gray-200 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Logo and Desktop Nav */}
        <div className="flex items-center gap-6">
          <div onClick={() => router.push('/')}>
            <Logo />
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <NavigationToggle 
              theme={theme}
              options={navItems}
              activeIndex={0}
              onChange={(option, index) => router.push(`/${option.toLowerCase()}`)}
            />
          </nav>
        </div>

        {/* Middle - Search and Filters (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-6 gap-4">
          <div className="flex-1">
            <SearchBar theme={theme} />
          </div>
          <div className="flex gap-2">
            <FilterDropdown
              theme={theme}
              placeholder="Year"
              options={years}
              value={selectedYear}
              onChange={handleYearChange}
            />
            <FilterDropdown
              theme={theme}
              placeholder="Subject"
              options={subjects}
              value={selectedSubject}
              onChange={handleSubjectChange}
              disabled={!selectedYear}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle 
            initialTheme={theme} 
            onChange={handleThemeChange} 
          />

          {/* Auth */}
          <div className="hidden md:block">
            {status !== "authenticated" ? (
              <SignInButton theme={theme} />
            ) : (
              <UserDropdown theme={theme} data={data} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-md",
              theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu
          theme={theme}
          years={years}
          subjects={subjects}
          selectedYear={selectedYear}
          selectedSubject={selectedSubject}
          onYearChange={handleYearChange}
          onSubjectChange={handleSubjectChange}
          onThemeChange={handleThemeChange}
        />
      )}
    </header>
  );
};

export default Header;