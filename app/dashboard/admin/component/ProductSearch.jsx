// src/components/products/ProductSearch.jsx
import React from "react";
import { Search } from "lucide-react";

export const ProductSearch = ({
  searchTerm,
  onSearch,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex gap-4">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
          placeholder="Search products..."
          className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <select
        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};
