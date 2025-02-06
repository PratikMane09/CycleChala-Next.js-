"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Star, Filter, Loader } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import { useSearchParams } from "next/navigation";
import { apiService } from "../../utils/apiService";
import ProductGrid from "./ProductGrid";

// Separate component for the content that uses useSearchParams
const ShopContent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract initial query from URL
    const initialQuery = searchParams.get("query");

    const fetchInitialData = async () => {
      try {
        const filters = initialQuery ? { search: initialQuery } : {};
        const [categoriesResponse, productsResponse] = await Promise.all([
          apiService.fetchCategories(1, 20),
          apiService.fetchProducts(filters),
        ]);
        console.log("productsResponse", productsResponse);
        setCategories(categoriesResponse.categories);
        setProducts(productsResponse.data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [searchParams]);

  const handleFilterChange = async (filters) => {
    const newParams = new URLSearchParams();
    if (filters.search) {
      newParams.set("query", filters.search);
    }
    window.history.replaceState(
      null,
      "",
      filters.search ? `/shop?${newParams.toString()}` : "/shop"
    );
    try {
      setLoading(true);
      const response = await apiService.fetchProducts(filters);
      if (response.success) {
        setProducts(response.data.products);
      } else {
        setError(response.error || "Failed to fetch products");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid mt-3 grid-cols-1 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block w-70 flex-shrink-0 sticky top-8 max-h-screen overflow-y-auto">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            <FilterSidebar
              categories={categories}
              onFilterChange={handleFilterChange}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
            />
          </div>
        </div>

        <div className="p-8">
          <div className="mt-10 text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight">
              Our Products
            </h1>
            <p className="text-gray-600 mt-2 font-normal leading-relaxed max-w-2xl mx-auto">
              Discover our collection of high-quality cycles
            </p>
          </div>

          {loading ? (
            <div className="flex mt-2 justify-center items-center h-64">
              <div className="flex flex-col items-center gap-4">
                <Loader className="w-8 h-8 text-sky-600 animate-spin" />
              </div>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>

      <button
        className="lg:hidden fixed bottom-20 right-4 bg-sky-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center gap-2"
        onClick={() => setShowMobileFilters(true)}
      >
        <Filter className="w-5 h-5" />
      </button>

      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl animate-slide-in">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <span className="sr-only">Close filters</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterSidebar
                  categories={categories}
                  onFilterChange={handleFilterChange}
                  showMobileFilters={showMobileFilters}
                  setShowMobileFilters={setShowMobileFilters}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShopContent;
