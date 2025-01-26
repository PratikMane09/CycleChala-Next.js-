import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const openSearchPopup = () => {
    setIsSearchOpen(true);
  };

  const closeSearchPopup = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* Mobile Search Icon */}
      <div className="md:hidden">
        <Search
          onClick={openSearchPopup}
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300"
          size={22}
        />
      </div>

      {/* Desktop Search */}
      <form
        onSubmit={handleSearchSubmit}
        className="hidden md:flex items-center gap-2 border-r pr-6 border-gray-200"
      >
        <input
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border-none outline-none text-sm text-gray-500 w-16 focus:w-30 transition-all duration-300"
        />
        <Search
          onClick={handleSearchSubmit}
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-300"
          size={22}
        />
      </form>

      {/* Mobile Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center md:hidden">
          <div className="bg-white/90 w-11/12 max-w-md rounded-2xl shadow-xl p-4 relative border border-gray-100">
            <X
              onClick={closeSearchPopup}
              className="absolute top-0 right-0 text-gray-500 hover:text-red-500 cursor-pointer transition-colors"
              size={24}
            />
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                className="flex-grow border border-gray-200 rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors shadow-md"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchSection;
