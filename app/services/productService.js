// services/productService.js
export class ProductService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.controller = null;
  }

  async fetchProducts(filters = {}) {
    try {
      // Cancel previous request if exists
      if (this.controller) {
        this.controller.abort();
      }
      this.controller = new AbortController();

      const queryParams = this.buildQueryParams(filters);
      const response = await fetch(
        `${this.baseUrl}/api/user/products?${queryParams}`,
        {
          signal: this.controller.signal,
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError(
          errorData?.message || "Failed to fetch products",
          response.status,
          errorData
        );
      }

      const data = await response.json();
      return this.transformResponse(data);
    } catch (error) {
      if (error.name === "AbortError") {
        // Ignore abort errors
        return null;
      }
      throw error;
    } finally {
      this.controller = null;
    }
  }

  buildQueryParams(filters) {
    const params = new URLSearchParams();

    // Helper to safely append params
    const appendParam = (key, value) => {
      if (value != null && value !== "") {
        params.append(key, value);
      }
    };

    // Helper for Set conversion
    const setToString = (set) => Array.from(set).join(",");

    // Basic filters
    appendParam("page", filters.page);
    appendParam("limit", filters.limit);
    appendParam("search", filters.search?.trim());

    // Categories
    if (filters.categories?.size) {
      appendParam("categories", setToString(filters.categories));
    }

    // Price Range
    if (filters.price) {
      appendParam("minPrice", filters.price.min);
      appendParam("maxPrice", filters.price.max);
    }

    // Specifications
    const specs = filters.specifications;
    if (specs) {
      // Frame
      if (specs.frame?.material?.size) {
        appendParam("frameMaterial", setToString(specs.frame.material));
      }
      if (specs.frame?.size?.size) {
        appendParam("frameSize", setToString(specs.frame.size));
      }

      // Wheels
      if (specs.wheels?.size?.size) {
        appendParam("wheelSize", setToString(specs.wheels.size));
      }
      if (specs.wheels?.type?.size) {
        appendParam("wheelType", setToString(specs.wheels.type));
      }

      // Other specs
      if (specs.suspension?.size) {
        appendParam("suspension", setToString(specs.suspension));
      }
      if (specs.brakes?.size) {
        appendParam("brakes", setToString(specs.brakes));
      }
    }

    // Rating and Stock
    appendParam("minRating", filters.rating);
    appendParam("inStock", filters.stock === "inStock" ? "true" : undefined);

    // Sorting
    const [field, order] = this.getSortParams(filters.sort);
    appendParam("sort", field);
    appendParam("order", order);

    return params.toString();
  }

  getSortParams(sortOption) {
    const sortMap = {
      featured: ["featured", "desc"],
      priceLowToHigh: ["price", "asc"],
      priceHighToLow: ["price", "desc"],
      newest: ["createdAt", "desc"],
      bestSelling: ["sales", "desc"],
      topRated: ["rating", "desc"],
    };

    return sortMap[sortOption] || sortMap.featured;
  }

  transformResponse(data) {
    return {
      products: data.data.products.map(this.transformProduct),
      pagination: data.data.pagination,
      filters: this.transformFilters(data.data.filters),
    };
  }

  transformProduct(product) {
    return {
      id: product._id,
      name: product.name,
      slug: product.metadata.slug,
      price: product.price,
      brand: product.brand,
      rating: product.rating,
      images: product.images,
      specifications: product.specifications,
      inventory: product.inventory,
    };
  }

  transformFilters(filters) {
    return {
      brands: Array.from(filters.brands || []).sort(),
      frameMaterials: Array.from(filters.frameMaterials || []).sort(),
      wheelSizes: Array.from(filters.wheelSizes || []).sort(),
      priceRange: filters.priceRange?.[0] || { min: 0, max: 0 },
    };
  }
}
