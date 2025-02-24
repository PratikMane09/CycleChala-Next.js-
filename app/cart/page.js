"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@mui/material";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const router = useRouter();
  const {
    items,
    metadata,
    loading,
    removeFromCart,
    addToCart,
    updateCartItem,
  } = useCart();

  const handleCheckout = () => {
    // Validate cart before proceeding to checkout
    if (!items || items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Check if any item exceeds available stock
    const invalidItems = items.filter(
      (item) => item.quantity > item.product.inventory.quantity
    );

    if (invalidItems.length > 0) {
      toast.error("Some items exceed available stock");
      return;
    }

    // Check if total exceeds COD limit (₹50,000)
    if (metadata.total > 50000) {
      toast.error(
        "Order total exceeds maximum limit for Cash on Delivery (₹50,000)"
      );
      return;
    }

    // Proceed to checkout
    router.push("/checkout");
  };

  const handleQuantityIncrease = (product, currentQuantity) => {
    if (currentQuantity < product.inventory.quantity) {
      addToCart(product._id, 1);
    } else {
      toast.error(
        `Maximum available quantity is ${product.inventory.quantity}`
      );
    }
  };

  const handleQuantityDecrease = (product, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartItem(product._id, currentQuantity - 1);
    } else {
      removeFromCart(product._id);
    }
  };

  const renderProductImage = (product) => {
    const imageUrl =
      product.images && product.images.length > 0
        ? `data:${product.images[0].contentType};base64,${Buffer.from(
            product.images[0].data
          ).toString("base64")}`
        : "/placeholder-bike.png";

    return (
      <div className="bg-sky-50 w-24 h-24 flex items-center justify-center rounded-xl shadow-sm">
        <Image
          src={imageUrl}
          alt={product.name || "Cycle"}
          width={80}
          height={80}
          className="object-contain transition-transform hover:scale-105"
        />
      </div>
    );
  };

  const renderCartItems = () => {
    if (loading)
      return (
        <div className="text-center py-8 text-gray-500">Loading cart...</div>
      );

    if (items.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-2xl font-light text-gray-600">
            Your cart is empty
          </p>
          <p className="text-sm text-gray-500 mt-2 mb-6">
            Explore our cycles and add some to your cart!
          </p>
          <Button
            variant="contained"
            onClick={() => router.push("/products")}
            className="bg-sky-600 hover:bg-sky-700"
          >
            Browse Products
          </Button>
        </div>
      );
    }

    return items.map((item) => (
      <div
        key={`${item.product._id}-${
          item.selectedSpecs?.frameSize || "default"
        }`}
        className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm mb-4 hover:shadow-md transition-all"
      >
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          {renderProductImage(item.product)}
          <div className="flex-grow">
            <h3 className="font-semibold text-lg text-gray-800">
              {item.product.name}
            </h3>
            <p className="text-sm text-gray-600">
              {item.selectedSpecs?.frameSize || "Standard"} Size
            </p>
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-sky-700">
                ₹{item.price.finalPrice.toFixed(2)}
              </p>
              {item.price.discount > 0 && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{item.price.basePrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <div className="flex items-center border rounded-full">
            <button
              onClick={() =>
                handleQuantityDecrease(item.product, item.quantity)
              }
              className="p-2 text-sky-600 hover:bg-sky-100 rounded-l-full transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={18} />
            </button>
            <span className="px-4 text-gray-800">{item.quantity}</span>
            <button
              onClick={() =>
                handleQuantityIncrease(item.product, item.quantity)
              }
              className="p-2 text-sky-600 hover:bg-sky-100 rounded-r-full transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={18} />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.product._id)}
            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
            aria-label="Remove item"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    ));
  };

  const renderCartSummary = () => {
    if (!metadata) return null;

    return (
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4 sticky top-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal ({items.length} items)</span>
            <span>₹{metadata.subtotal?.toFixed(2) || "0.00"}</span>
          </div>

          {metadata.discount > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Discount</span>
              <span className="text-green-600">
                -₹{metadata.discount?.toFixed(2) || "0.00"}
              </span>
            </div>
          )}

          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span>₹{metadata.shipping?.toFixed(2) || "0.00"}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Tax</span>
            <span>₹{metadata.tax?.toFixed(2) || "0.00"}</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-xl text-sky-800">
            <span>Total</span>
            <span>₹{metadata.total?.toFixed(2) || "0.00"}</span>
          </div>

          {metadata.total > 50000 && (
            <p className="text-red-500 text-sm">
              * Order total exceeds Cash on Delivery limit (₹50,000)
            </p>
          )}
        </div>

        <Button
          variant="contained"
          onClick={handleCheckout}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-full mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={items.length === 0 || metadata.total > 50000}
        >
          Proceed to Checkout
        </Button>

        <p className="text-sm text-gray-500 text-center mt-2">
          * Only Cash on Delivery available
        </p>
      </div>
    );
  };

  return (
    <div className="container mt-14 mx-auto px-4 py-8 bg-sky-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
          {renderCartItems()}
        </div>

        <div className="md:col-span-1">{renderCartSummary()}</div>
      </div>
    </div>
  );
};

export default CartPage;
