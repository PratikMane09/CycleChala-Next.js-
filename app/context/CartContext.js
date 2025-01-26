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

const CartContext = createContext();
class CartError extends Error {
  constructor(message, status, details = {}) {
    super(message);
    this.name = "CartError";
    this.status = status;
    this.details = details;
  }
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    count: 0,
    loading: false,
    metadata: null,
    isInitialized: false,
  });

  const handleApiResponse = async (response) => {
    if (!response.ok) {
      throw new CartError(`API Error: ${response.status}`, response.status, {
        url: response.url,
      });
    }
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Operation failed");
    }

    return data.data;
  };

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view cart");
      setCart((prev) => ({ ...prev, isInitialized: true }));
      return;
    }

    try {
      setCart((prev) => ({ ...prev, loading: true }));

      const data = await handleApiResponse(
        await fetch(`${API_BASE_URL}/api/users/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      );

      setCart({
        items: data.items || [],
        count: (data.items || []).length,
        loading: false,
        metadata: data.metadata,
        isInitialized: true,
      });
    } catch (error) {
      toast.error(error.message);
      setCart((prev) => ({
        ...prev,
        loading: false,
        isInitialized: true,
      }));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !cart.isInitialized) {
      fetchCart();
    }
  }, [fetchCart, cart.isInitialized]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add to cart");
      return;
    }

    try {
      setCart((prev) => ({ ...prev, loading: true }));

      const data = await handleApiResponse(
        await fetch(`${API_BASE_URL}/api/users/cart/add`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity }),
        })
      );

      setCart({
        items: data.items || [],
        count: (data.items || []).length,
        loading: false,
        metadata: data.metadata,
        isInitialized: true,
      });

      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.message);
      setCart((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to remove from cart");
      return;
    }

    try {
      setCart((prev) => ({ ...prev, loading: true }));

      const data = await handleApiResponse(
        await fetch(`${API_BASE_URL}/api/users/cart/items/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      );

      setCart({
        items: data.items || [],
        count: (data.items || []).length,
        loading: false,
        metadata: data.metadata,
        isInitialized: true,
      });

      toast.success("Removed from cart");
    } catch (error) {
      toast.error(error.message);
      setCart((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const updateCartItem = useCallback(async (productId, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to update cart");
      return;
    }

    try {
      setCart((prev) => ({ ...prev, loading: true }));

      const data = await handleApiResponse(
        await fetch(`${API_BASE_URL}/api/users/cart/items/${productId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        })
      );

      setCart({
        items: data.items || [],
        count: (data.items || []).length,
        loading: false,
        metadata: data.metadata,
        isInitialized: true,
      });

      toast.success("Cart updated");
    } catch (error) {
      toast.error(error.message);
      setCart((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const value = {
    ...cart,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    const error = new Error("useCart must be used within CartProvider");
    error.name = "CartContextError";
    error.code = "CONTEXT_NOT_FOUND";
    error.troubleshooting = "Wrap your component with <CartProvider>";
    throw error;
  }
  return context;
};

export default CartContext;
