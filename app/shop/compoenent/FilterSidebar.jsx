"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Bike,
  CircleDot,
  X,
  Star,
  Package,
  Gauge,
  Users,
  Ruler,
  SlidersHorizontal,
} from "lucide-react";
import debounce from "lodash/debounce";
import { Tune } from "@mui/icons-material";

const FilterSidebar = ({
  categories,
  onFilterChange,
  initialFilters = {},
  showMobileFilters,
  setShowMobileFilters,
}) => {
  // State Management
  const searchInputRef = useRef(null);

  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    specifications: true,
    price: true,
    rating: true,
    availability: true,
    ageGroup: true,
    professionalLevel: true,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: new Set(initialFilters.categories || []),
    specifications: {
      frameMaterial: initialFilters.frameMaterial || null,
      wheelSize: initialFilters.wheelSize || null,
      suspension: initialFilters.suspension || null,
    },
    priceRange: {
      min: initialFilters.priceRange?.min || "",
      max: initialFilters.priceRange?.max || "",
    },
    rating: initialFilters.rating || null,
    inStock: initialFilters.inStock || false,
    ageGroup: initialFilters.ageGroup || null,
    professionalLevel: initialFilters.professionalLevel || null,
  });

  const [hasChanges, setHasChanges] = useState(false);

  // Improved search functionality with focus retention
  const filteredCategories = useMemo(() => {
    if (!searchInputValue.trim()) return categories || [];
    return (
      categories?.filter((cat) =>
        cat.name.toLowerCase().includes(searchInputValue.toLowerCase())
      ) || []
    );
  }, [categories, searchInputValue]);

  // Optimized debounced search that maintains focus
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchQuery(value);
        setHasChanges(true);
        // Ensure input maintains focus after debounce
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300),
    []
  );

  // Handle search input changes while maintaining focus
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);
    debouncedSearch(value);
    // Ensure cursor position is maintained
    const cursorPosition = e.target.selectionStart;
    requestAnimationFrame(() => {
      if (searchInputRef.current) {
        searchInputRef.current.selectionStart = cursorPosition;
        searchInputRef.current.selectionEnd = cursorPosition;
      }
    });
  };

  // Clear search while maintaining focus
  const handleClearSearch = () => {
    setSearchInputValue("");
    setSearchQuery("");
    debouncedSearch("");
    // Maintain focus after clearing
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Focus handling for better UX
  const handleSearchFocus = (e) => {
    e.target.select(); // Select all text on focus
  };

  // Mobile body scroll lock effect
  useEffect(() => {
    document.body.style.overflow = showMobileFilters ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileFilters]);

  // Filter management functions
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: new Set(),
      specifications: {
        frameMaterial: null,
        wheelSize: null,
        suspension: null,
      },
      priceRange: { min: "", max: "" },
      rating: null,
      inStock: false,
      ageGroup: null,
      professionalLevel: null,
    });
    setSearchQuery("");
    setHasChanges(false);
    onFilterChange({});
  };

  const applyFilters = () => {
    const filters = {
      ...(selectedFilters.categories.size > 0 && {
        categories: Array.from(selectedFilters.categories),
      }),
      ...(selectedFilters.specifications.frameMaterial && {
        frameMaterial: selectedFilters.specifications.frameMaterial,
      }),
      ...(selectedFilters.specifications.wheelSize && {
        wheelSize: selectedFilters.specifications.wheelSize,
      }),
      ...(selectedFilters.specifications.suspension && {
        suspension: selectedFilters.specifications.suspension,
      }),
      ...(selectedFilters.priceRange.min && {
        priceRange: {
          min: Number(selectedFilters.priceRange.min),
          ...(selectedFilters.priceRange.max && {
            max: Number(selectedFilters.priceRange.max),
          }),
        },
      }),
      ...(selectedFilters.rating && { rating: selectedFilters.rating }),
      ...(selectedFilters.inStock && { inStock: true }),
      ...(selectedFilters.ageGroup && { ageGroup: selectedFilters.ageGroup }),
      ...(selectedFilters.professionalLevel && {
        professionalLevel: selectedFilters.professionalLevel,
      }),
      ...(searchQuery && { search: searchQuery }),
    };

    onFilterChange(filters);
    setHasChanges(false);
    setShowMobileFilters(false);
  };
  const MobileFilterButton = () => (
    <button
      onClick={() => setShowMobileFilters(true)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-gradient-to-r from-sky-600 to-sky-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <SlidersHorizontal className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
      <span className="font-medium">Advanced Filters</span>
    </button>
  );
  const FilterSection = ({
    title,
    isExpanded,
    onToggle,
    icon: Icon,
    children,
  }) => (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3.5 px-3 hover:bg-sky-50/60 rounded-xl transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-100 rounded-lg group-hover:bg-sky-200 transition-colors duration-300">
            <Icon className="w-5 h-5 text-sky-700" />
          </div>
          <span className="font-semibold text-gray-800 group-hover:text-sky-800">
            {title}
          </span>
        </div>
        <div className="p-1.5 bg-gray-100/80 rounded-md group-hover:bg-sky-100 transition-colors duration-300">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="mt-4 px-3 space-y-2.5 animate-fade-in">{children}</div>
      )}
    </div>
  );

  // Enhanced search input styling
  const SearchInput = () => (
    <div className="relative group">
      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-sky-600 transition-colors duration-300" />
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search filters..."
        value={searchInputValue}
        onChange={handleSearchChange}
        className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all duration-300 placeholder:text-gray-400"
        autoComplete="off"
      />
      {searchInputValue && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-gray-100 rounded-md hover:bg-sky-100 transition-colors duration-300"
        >
          <X className="w-4 h-4 text-gray-500 hover:text-sky-600" />
        </button>
      )}
    </div>
  );

  // Enhanced mobile view styling
  const MobileView = () =>
    showMobileFilters && (
      <div className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-all duration-300">
        <div
          className="fixed inset-y-0 left-0 w-[340px] bg-white shadow-2xl overflow-hidden flex flex-col animate-slide-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-100 rounded-lg">
                <Tune className="w-5 h-5 text-sky-700" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <FilterContent />
          </div>
        </div>
      </div>
    );

  // Main filter content component
  const FilterContent = () => (
    <div className="space-y-4">
      <div className="sticky top-0 bg-white pt-2 pb-4 z-10">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search filters..."
            value={searchInputValue}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow duration-200"
            autoComplete="off" // Prevent browser autocomplete from interfering
          />
          {searchInputValue && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <FilterSection
          title="Categories"
          icon={Bike}
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection("categories")}
        >
          <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
            {filteredCategories.map((category) => (
              <label
                key={category._id}
                className="flex items-center gap-2 py-2 px-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.has(category._id)}
                  onChange={(e) => {
                    const newCategories = new Set(selectedFilters.categories);
                    if (e.target.checked) {
                      newCategories.add(category._id);
                    } else {
                      newCategories.delete(category._id);
                    }
                    setSelectedFilters((prev) => ({
                      ...prev,
                      categories: newCategories,
                    }));
                    setHasChanges(true);
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Specifications Section
        <FilterSection
          title="Specifications"
          icon={Ruler}
          isExpanded={expandedSections.specifications}
          onToggle={() => toggleSection("specifications")}
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Frame Material
              </label>
              <select
                value={selectedFilters.specifications.frameMaterial || ""}
                onChange={(e) => {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    specifications: {
                      ...prev.specifications,
                      frameMaterial: e.target.value || null,
                    },
                  }));
                  setHasChanges(true);
                }}
                className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">All Materials</option>
                <option value="aluminum">Aluminum</option>
                <option value="carbon">Carbon</option>
                <option value="steel">Steel</option>
              </select>
            </div>
          </div>
        </FilterSection> */}

        {/* Price Range Section */}
        <FilterSection
          title="Price Range"
          icon={CircleDot}
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection("price")}
        >
          <div className="flex gap-2">
            <div className="w-1/2">
              <input
                type="number"
                placeholder="Min"
                value={selectedFilters.priceRange.min}
                onChange={(e) => {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: e.target.value },
                  }));
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="w-1/2">
              <input
                type="number"
                placeholder="Max"
                value={selectedFilters.priceRange.max}
                onChange={(e) => {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: e.target.value },
                  }));
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </FilterSection>

        {/* Rating Section */}
        <FilterSection
          title="Rating"
          icon={Star}
          isExpanded={expandedSections.rating}
          onToggle={() => toggleSection("rating")}
        >
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 py-2 px-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={selectedFilters.rating === rating}
                  onChange={() => {
                    setSelectedFilters((prev) => ({ ...prev, rating }));
                    setHasChanges(true);
                  }}
                  className="w-4 h-4 border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <div className="flex items-center gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-700">& up</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Professional Level Section */}
        {/* <FilterSection
          title="Professional Level"
          icon={Gauge}
          isExpanded={expandedSections.professionalLevel}
          onToggle={() => toggleSection("professionalLevel")}
        >
          <div className="space-y-2">
            {["beginner", "intermediate", "professional", "expert"].map(
              (level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 py-2 px-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200"
                >
                  <input
                    type="radio"
                    name="professionalLevel"
                    checked={selectedFilters.professionalLevel === level}
                    onChange={() => {
                      setSelectedFilters((prev) => ({
                        ...prev,
                        professionalLevel: level,
                      }));
                      setHasChanges(true);
                    }}
                    className="w-4 h-4 border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {level}
                  </span>
                </label>
              )
            )}
          </div>
        </FilterSection> */}

        {/* Age Group Section */}
        {/* <FilterSection
          title="Age Group"
          icon={Users}
          isExpanded={expandedSections.ageGroup}
          onToggle={() => toggleSection("ageGroup")}
        >
          <div className="space-y-2">
            {["3-6", "7-12", "13-17", "18+"].map((group) => (
              <label
                key={group}
                className="flex items-center gap-2 py-2 px-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200"
              >
                <input
                  type="radio"
                  name="ageGroup"
                  checked={selectedFilters.ageGroup === group}
                  onChange={() => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      ageGroup: group,
                    }));
                    setHasChanges(true);
                  }}
                  className="w-4 h-4 border-gray-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm text-gray-700">
                  {group === "18+" ? "Adult" : `${group} years`}
                </span>
              </label>
            ))}
          </div>
        </FilterSection> */}

        {/* Availability Section */}
        <FilterSection
          title="Availability"
          icon={Package}
          isExpanded={expandedSections.availability}
          onToggle={() => toggleSection("availability")}
        >
          <label className="flex items-center gap-2 py-2 px-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors duration-200">
            <input
              type="checkbox"
              checked={selectedFilters.inStock}
              onChange={(e) => {
                setSelectedFilters((prev) => ({
                  ...prev,
                  inStock: e.target.checked,
                }));
                setHasChanges(true);
              }}
              className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
            />
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
        </FilterSection>
      </div>

      {/* Apply Filters Button */}
      {hasChanges && (
        <div className="sticky bottom-0 mb-6 bg-white  pb-6">
          <button
            onClick={applyFilters}
            className="w-full bg-sky-600 text-white py-2.5 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="w-full p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-100 rounded-lg">
                <Tune className="w-5 h-5 text-sky-700" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>
            <button
              onClick={clearAllFilters}
              className="px-3 py-1.5 text-sm text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all duration-300"
            >
              Clear all
            </button>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile View */}
      <MobileView />

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <MobileFilterButton />
      </div>
    </>
  );
};

export default FilterSidebar;
