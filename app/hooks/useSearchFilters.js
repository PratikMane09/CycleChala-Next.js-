// hooks/useSearchFilters.js
import { useState, useCallback, useEffect, useMemo } from "react";
import { debounce } from "lodash";

export const useSearchFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState(() => ({
    search: "",
    categories: new Set(),
    price: {
      min: "",
      max: "",
    },
    specifications: {
      frame: {
        material: new Set(),
        size: new Set(),
      },
      wheels: {
        size: new Set(),
        type: new Set(),
      },
      suspension: new Set(),
      brakes: new Set(),
    },
    rating: null,
    stock: "all",
    sort: "featured",
    page: 1,
    limit: 12,
    ...initialFilters,
  }));

  // Memoized filter change handler with debounce
  const debouncedFilterChange = useMemo(
    () =>
      debounce((newFilters) => {
        onFilterChange(newFilters);
      }, 300),
    [onFilterChange]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [debouncedFilterChange]);

  const updateFilters = useCallback(
    (updates) => {
      setFilters((prev) => {
        const newFilters = {
          ...prev,
          ...updates,
          page: updates.page || 1,
        };
        debouncedFilterChange(newFilters);
        return newFilters;
      });
    },
    [debouncedFilterChange]
  );

  const toggleCategory = useCallback(
    (categoryId) => {
      setFilters((prev) => {
        const newCategories = new Set(prev.categories);
        if (newCategories.has(categoryId)) {
          newCategories.delete(categoryId);
        } else {
          newCategories.add(categoryId);
        }
        const newFilters = { ...prev, categories: newCategories, page: 1 };
        debouncedFilterChange(newFilters);
        return newFilters;
      });
    },
    [debouncedFilterChange]
  );

  const updateSpecification = useCallback(
    (type, subType, value) => {
      setFilters((prev) => {
        const newSpecs = { ...prev.specifications };

        if (subType) {
          const valueSet = new Set(newSpecs[type]?.[subType] || []);
          valueSet.has(value) ? valueSet.delete(value) : valueSet.add(value);
          newSpecs[type] = { ...newSpecs[type], [subType]: valueSet };
        } else {
          const valueSet = new Set(newSpecs[type] || []);
          valueSet.has(value) ? valueSet.delete(value) : valueSet.add(value);
          newSpecs[type] = valueSet;
        }

        const newFilters = { ...prev, specifications: newSpecs, page: 1 };
        debouncedFilterChange(newFilters);
        return newFilters;
      });
    },
    [debouncedFilterChange]
  );

  const resetFilters = useCallback(() => {
    const resetState = {
      search: "",
      categories: new Set(),
      price: { min: "", max: "" },
      specifications: {
        frame: { material: new Set(), size: new Set() },
        wheels: { size: new Set(), type: new Set() },
        suspension: new Set(),
        brakes: new Set(),
      },
      rating: null,
      stock: "all",
      sort: "featured",
      page: 1,
      limit: 12,
    };
    setFilters(resetState);
    onFilterChange(resetState);
  }, [onFilterChange]);

  return {
    filters,
    updateFilters,
    toggleCategory,
    updateSpecification,
    resetFilters,
  };
};
