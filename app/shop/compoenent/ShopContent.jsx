"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Star,
  Filter,
  Loader,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import { useSearchParams, useRouter } from "next/navigation";
import { apiService } from "../../utils/apiService";
import ProductGrid from "./ProductGrid";

const ShopContent = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    hasMore: false,
  });
  const [currentFilters, setCurrentFilters] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Extract all query parameters
    const initialQuery = searchParams.get("query");
    const initialPage = searchParams.get("page")
      ? parseInt(searchParams.get("page"))
      : 1;

    // Build initial filters object
    const initialFilters = {
      search: initialQuery || "",
      page: initialPage,
    };

    // Add any other filters from URL
    const extractedFilters = {};
    for (const [key, value] of searchParams.entries()) {
      if (key !== "query" && key !== "page") {
        extractedFilters[key] = value;
      }
    }

    const filters = { ...initialFilters, ...extractedFilters };
    setCurrentFilters(filters);

    const fetchInitialData = async () => {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          apiService.fetchCategories(1, 20),
          apiService.fetchProducts(filters),
        ]);

        setCategories(categoriesResponse.categories);
        setProducts(productsResponse.data.products);
        setPagination(productsResponse.data.pagination);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [searchParams]);

  const handleFilterChange = async (filters) => {
    // Preserve page parameter if it's not specifically changed
    const updatedFilters = { ...filters, page: filters.page || 1 };
    setCurrentFilters(updatedFilters);

    // Update URL parameters
    const newParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        if (key === "search") {
          newParams.set("query", value);
        } else {
          newParams.set(key, value);
        }
      }
    });

    // Use router to update URL without reload
    const newUrl = `/shop?${newParams.toString()}`;
    window.history.replaceState(null, "", newUrl);

    try {
      setLoading(true);
      const response = await apiService.fetchProducts(updatedFilters);
      if (response.success) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
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

  const handlePageChange = (newPage) => {
    handleFilterChange({ ...currentFilters, page: newPage });
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
              initialFilters={currentFilters}
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
                <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            </div>
          ) : (
            <>
              <ProductGrid products={products} />

              {/* Pagination Controls */}
              {pagination.pages > 1 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className={`p-2 rounded-md ${
                        pagination.page === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-indigo-600 hover:bg-indigo-50"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Page numbers */}
                    <div className="flex items-center">
                      {Array.from(
                        { length: Math.min(5, pagination.pages) },
                        (_, i) => {
                          // Logic to show current page and nearby pages
                          let pageNum;
                          if (pagination.pages <= 5) {
                            pageNum = i + 1;
                          } else if (pagination.page <= 3) {
                            pageNum = i + 1;
                          } else if (pagination.page >= pagination.pages - 2) {
                            pageNum = pagination.pages - 4 + i;
                          } else {
                            pageNum = pagination.page - 2 + i;
                          }

                          // Only render if pageNum is valid
                          if (pageNum > 0 && pageNum <= pagination.pages) {
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-10 h-10 flex items-center justify-center rounded-md ${
                                  pagination.page === pageNum
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-700 hover:bg-indigo-50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          return null;
                        }
                      )}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={!pagination.hasMore}
                      className={`p-2 rounded-md ${
                        !pagination.hasMore
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-indigo-600 hover:bg-indigo-50"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Products count display */}
              <div className="mt-4 text-center text-sm text-gray-500">
                Showing {products.length} of {pagination.total} products
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fixed Mobile Filter Button at bottom center */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium py-3 px-6 rounded-full shadow-lg w-full max-w-lg transition-all hover:bg-indigo-700"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="font-medium">Advanced Filters</span>
        </button>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl animate-slide-in">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-indigo-50">
                <h2 className="text-lg font-semibold text-indigo-900">
                  Filters
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-md hover:bg-indigo-100 text-indigo-700"
                >
                  <span className="sr-only">Close filters</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterSidebar
                  categories={categories}
                  onFilterChange={handleFilterChange}
                  showMobileFilters={showMobileFilters}
                  setShowMobileFilters={setShowMobileFilters}
                  initialFilters={currentFilters}
                />
              </div>
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all hover:bg-indigo-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopContent;
