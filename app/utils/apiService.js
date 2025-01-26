import { API_BASE_URL } from "../../config/api";

class ApiService {
  constructor() {
    this.token = this.getStoredToken();
  }

  getStoredToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  getHeaders() {
    const token = this.getStoredToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  getFileHeaders() {
    const token = this.getStoredToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
      throw new Error(data.message || "API request failed");
    }
    return data;
  }

  // Existing Category Methods
  async fetchCategories(page = 1, limit = 10) {
    const response = await fetch(
      `${API_BASE_URL}/api/admin/categories?page=${page}&limit=${limit}`,
      {
        headers: this.getHeaders(),
      }
    );
    return this.handleResponse(response);
  }

  async createCategory(formData) {
    const response = await fetch(`${API_BASE_URL}/api/admin/categories`, {
      method: "POST",
      headers: this.getFileHeaders(),
      body: formData,
    });
    return this.handleResponse(response);
  }

  async updateCategory(id, formData) {
    const response = await fetch(`${API_BASE_URL}/api/admin/categories/${id}`, {
      method: "PUT",
      headers: this.getFileHeaders(),
      body: formData,
    });
    return this.handleResponse(response);
  }

  async deleteCategory(id) {
    const response = await fetch(`${API_BASE_URL}/api/admin/categories/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // New Product Methods
  async fetchProducts(filters = {}) {
    try {
      const params = new URLSearchParams();

      // Only add parameters that have values
      if (filters.search) {
        params.append("search", filters.search);
      }

      if (filters.categories && filters.categories.length > 0) {
        params.append("category", filters.categories.join(","));
      }

      if (filters.priceRange?.min) {
        params.append("minPrice", filters.priceRange.min);
      }

      if (filters.priceRange?.max) {
        params.append("maxPrice", filters.priceRange.max);
      }

      if (filters.rating) {
        params.append("rating", filters.rating);
      }

      // Only append inStock if it's true
      if (filters.inStock === true) {
        params.append("inStock", "true");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/admin/products?${params.toString()}`
      );
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  async fetchProductById(slug) {
    const response = await fetch(`${API_BASE_URL}/api/admin/products/${slug}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async createProduct(formData) {
    const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
      method: "POST",
      headers: this.getFileHeaders(),
      body: formData,
    });
    return this.handleResponse(response);
  }

  async updateProduct(id, formData) {
    const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
      method: "PUT",
      headers: this.getFileHeaders(),
      body: formData,
    });
    return this.handleResponse(response);
  }

  async deleteProduct(id) {
    const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }
}

// Create the instance only on the client side
let apiService;
if (typeof window !== "undefined") {
  apiService = new ApiService();
} else {
  // Provide a dummy instance for SSR
  apiService = {
    // Existing category methods
    fetchCategories: () =>
      Promise.resolve({ categories: [], pagination: { pages: 0 } }),
    createCategory: () => Promise.resolve({}),
    updateCategory: () => Promise.resolve({}),
    deleteCategory: () => Promise.resolve({}),
    // New product methods
    fetchProducts: () =>
      Promise.resolve({ products: [], pagination: { pages: 0 } }),
    fetchProductById: () => Promise.resolve({}),
    createProduct: () => Promise.resolve({}),
    updateProduct: () => Promise.resolve({}),
    deleteProduct: () => Promise.resolve({}),
  };
}

export { apiService };
