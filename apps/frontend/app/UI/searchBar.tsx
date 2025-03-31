"use client";
import { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
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
          className="w-full bg-gray-700 text-white text-sm py-2 px-4 rounded-l-full focus:outline-none border border-gray-600"
          autoFocus
        />
        <button 
          type="submit" 
          className="bg-gray-700 p-2 flex items-center justify-center border border-gray-600 border-l-0 rounded-r-full text-gray-300 hover:text-white"
        >
          <Search size={18} />
        </button>
      </form>
    </div>
  );
  
};

export default SearchBar;