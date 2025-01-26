"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  ShoppingCart as CartIcon,
  Trash2 as TrashIcon,
  Heart as HeartIcon,
} from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

import WishlistItem from "./component/WishlistItem";
const Page = () => {
  const router = useRouter();
  const { items = [], count, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addToCart(item.product._id);
      removeFromWishlist(item.product._id);
    });
    toast.success(`Added ${count} items to cart`);
  };
  const handleViewDetails = (slug) => {
    if (slug) {
      router.push(`/products/${slug}`);
    }
  };
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 text-center">
      <HeartIcon className="w-24 h-24 text-gray-400" />
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-600 mb-6">
          Explore our products and add some items you love
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Products
        </button>
      </div>
    </div>
  );

  const WishlistContent = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between max-w-5xl mx-auto px-4 py-2">
          <h1 className="text-xl font-bold text-gray-800">
            My Wishlist
            <span className="text-blue-600 ml-3">({count} items)</span>
          </h1>
          {count > 0 && (
            <button
              onClick={handleAddAllToCart}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <CartIcon className="w-5 h-5" />
              <span>Add All to Cart</span>
            </button>
          )}
        </div>

        {items.map((item) => (
          <WishlistItem
            key={item.product._id}
            item={item}
            onAddToCart={addToCart}
            onRemoveFromWishlist={removeFromWishlist}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-14 bg-gray-50">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : count === 0 ? (
        <EmptyState />
      ) : (
        <WishlistContent />
      )}
    </div>
  );
};

export default Page;
