"use client";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { themeAtom } from '../../store/themeAtom';
import { Menu, X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useRouter } from 'next/navigation';

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
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

const SignOutButton = ({ theme, data }) => {
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
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-50",
            "transition-all duration-200 origin-top-right",
            theme === "dark" ? "bg-gray-800" : "bg-white"
          )}
        >
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium truncate">{data.user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
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
          <div className="group cursor-pointer">
            <Logo />
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                onClick={()=>router.push(`/${item.toLowerCase()}`)}
                key={item}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  theme === "dark"
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
                )}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Middle - Search and Filters (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search 
              size={18} 
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )} 
            />
            <input
              type="text"
              placeholder="Search notes..."
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-full text-sm",
                "focus:outline-none focus:ring-2",
                theme === "dark"
                  ? "bg-gray-800 placeholder-gray-400 focus:ring-blue-500"
                  : "bg-gray-100 placeholder-gray-500 focus:ring-blue-400"
              )}
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "p-2 rounded-full transition-colors",
              theme === "dark" 
                ? "hover:bg-gray-800 text-yellow-300" 
                : "hover:bg-gray-100 text-gray-700"
            )}
          >
            {theme === "dark" ? (
              <span className="text-lg">☀️</span>
            ) : (
              <span className="text-lg">🌙</span>
            )}
          </button>

          {/* Auth */}
          <div className="hidden md:block">
            {status !== "authenticated" ? (
              <SignInButton theme={theme} />
            ) : (
              <SignOutButton theme={theme} data={data} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md"
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
        <div className={cn(
          "md:hidden mt-3 pt-3 border-t",
          theme === "dark" ? "border-gray-800" : "border-gray-200"
        )}>
          <div className="flex flex-col gap-3">
            <div className="px-2">
              <input
                type="text"
                placeholder="Search notes..."
                className={cn(
                  "w-full px-4 py-2 rounded-full text-sm",
                  "focus:outline-none focus:ring-2",
                  theme === "dark"
                    ? "bg-gray-800 placeholder-gray-400 focus:ring-blue-500"
                    : "bg-gray-100 placeholder-gray-500 focus:ring-blue-400"
                )}
              />
            </div>
            
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  className={cn(
                    "px-4 py-3 rounded-md text-left font-medium",
                    theme === "dark"
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  )}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="px-2 py-2">
              {status !== "authenticated" ? (
                <SignInButton theme={theme} />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {data?.user?.name || "Account"}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;