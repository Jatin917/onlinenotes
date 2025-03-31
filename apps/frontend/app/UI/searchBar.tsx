"use client";
import { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({theme}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement your search functionality here
  };

  return (
    <div className="relative flex items-center w-full">
  <form onSubmit={handleSearch} className="w-full flex">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={`w-full text-sm py-2 px-4 rounded-l-full focus:outline-none border ${
        theme === "dark"
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-300"
      }`}
      autoFocus
    />
    <button
      type="submit"
      className={`p-2 flex items-center justify-center border border-l-0 rounded-r-full hover:text-white ${
        theme === "dark"
          ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
          : "bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300"
      }`}
    >
      <Search size={18} />
    </button>
  </form>
</div>

  );
  
};

export default SearchBar;