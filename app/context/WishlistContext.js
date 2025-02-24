"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../../config/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({
    items: [],
    count: 0,
    loading: false,
    metadata: null,
    isInitialized: false,
  });

  const isAuthorizedStudent = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token && role === "student";
  };

  const handleApiResponse = async (response) => {
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Operation failed");
    }

    return data.data;
  };

  const fetchWishlist = useCallback(async () => {
    if (!isAuthorizedStudent()) {
      toast.error("Only students can access the wishlist");
      setWishlist((prev) => ({ ...prev, isInitialized: true }));
      return;
    }

    try {
      setWishlist((prev) => ({ ...prev, loading: true }));
      const token = localStorage.getItem("token");

      const data = await handleApiResponse(
        await fetch(`${API_BASE_URL}/api/users/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      );

      console.log("Wishlist Data:", data);

      setWishlist({
        items: data.products || [],
        count: (data.products || []).length,
        loading: false,
        metadata: data.metadata,
        isInitialized: true,
      });
    } catch (error) {
      console.error("Wishlist Fetch Error:", error);
      toast.error(error.message);
      setWishlist((prev) => ({
        ...prev,
        loading: false,
        isInitialized: true,
      }));
    }
  }, []);

  const modifyWishlist = useCallback(async (productId, method) => {
    if (!isAuthorizedStudent()) {
      toast.error(
        `Only students can ${
          method === "POST" ? "add to" : "remove from"
        } the wishlist`
      );
      return;
    }

    try {
      setWishlist((prev) => ({ ...prev, loading: true }));
      const token = localStorage.getItem("token");

      const data = await handleApiResponse(
        await fetch(`${API_BASE_URL}/api/users/products/${productId}`, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      );

      setWishlist({
        items: data.products || [],
        count: (data.products || []).length,
        loading: false,
        metadata: data.metadata,
        isInitialized: true,
      });

      toast.success(
        method === "POST" ? "Added to wishlist" : "Removed from wishlist"
      );
    } catch (error) {
      toast.error(error.message);
      setWishlist((prev) => ({
        ...prev,
        loading: false,
        isInitialized: true,
      }));
    }
  }, []);

  const isInWishlist = (productId) => {
    return wishlist.items.some((item) => item.product._id === productId);
  };

  useEffect(() => {
    if (isAuthorizedStudent() && !wishlist.isInitialized) {
      fetchWishlist();
    }
  }, [fetchWishlist, wishlist.isInitialized]);

  const value = {
    ...wishlist,
    fetchWishlist,
    addToWishlist: (productId) => modifyWishlist(productId, "POST"),
    removeFromWishlist: (productId) => modifyWishlist(productId, "DELETE"),
    isInWishlist,
    isAuthorizedStudent,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    const error = new Error("useWishlist must be used within WishlistProvider");
    error.name = "WishlistContextError";
    error.code = "CONTEXT_NOT_FOUND";
    error.troubleshooting = "Wrap your component with <WishlistProvider>";
    throw error;
  }
  return context;
};

export default WishlistContext;
