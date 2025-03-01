import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { Star, Heart, Eye, ShoppingCart, Clock } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

// Separate component for product image to prevent unnecessary re-renders
const ProductImage = memo(({ images }) => {
  if (!images || !images[0]) {
    return (
      <img
        src="/api/placeholder/400/300"
        alt="Product placeholder"
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <img
      src={`data:${images[0].contentType};base64,${images[0].data}`}
      alt="Product"
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
    />
  );
});

// Add display names for memo components
ProductImage.displayName = "ProductImage";

// Separate component for rating stars to prevent unnecessary re-renders
const RatingStars = memo(({ rating }) => {
  // Generate random rating between 3.5 and 5 if rating is not provided
  const displayRating = rating || Math.random() * 1.5 + 3.5;

  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={10}
          className={
            i < Math.floor(displayRating) ? "fill-yellow-400" : "fill-gray-200"
          }
        />
      ))}
    </div>
  );
});

RatingStars.displayName = "RatingStars";

// Separate component for individual product card
const ProductCard = memo(
  ({
    product,
    isInWishlist,
    isInCart,
    onWishlist,
    onAddToCart,
    onViewDetails,
  }) => {
    const handleWishlistClick = useCallback(
      (e) => {
        e.stopPropagation();
        onWishlist(product._id);
      },
      [product._id, onWishlist]
    );

    const handleCartClick = useCallback(
      (e) => {
        e.stopPropagation();
        onAddToCart(e, product._id);
      },
      [product._id, onAddToCart]
    );

    const handleViewClick = useCallback(
      (e) => {
        e.stopPropagation();
        onViewDetails(product.metadata?.slug);
      },
      [product.metadata?.slug, onViewDetails]
    );

    return (
      <div
        onClick={() => onViewDetails(product.metadata?.slug)}
        className="group bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden">
          <button
            onClick={handleWishlistClick}
            className="absolute z-10 top-2 right-2 p-2 rounded-full bg-white shadow-md"
          >
            <Heart
              className={
                isInWishlist(product._id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
              }
              size={20}
            />
          </button>

          <div className="absolute top-1.5 left-1.5 sm:top-4 sm:left-4 z-10">
            <span
              className={`px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-sm ${
                product.inventory?.inStock
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {product.inventory?.inStock ? "In Stock" : "Out"}
            </span>
          </div>

          <ProductImage images={product.images} />
        </div>

        <div className="p-2 sm:p-4 flex-grow flex flex-col">
          <div className="mb-1 sm:mb-3">
            <p className="text-sky-600 font-medium text-[10px] sm:text-sm">
              {product.brand}
            </p>
            <h3 className="text-xs sm:text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-sky-600 transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center gap-1 mb-1 sm:mb-3">
            <RatingStars rating={product.rating?.average} />
            <span className="text-[10px] sm:text-sm text-gray-500">
              {/* ({product.rating?.count || 0}) */}
            </span>
          </div>

          <div className="mb-2 sm:mb-4">
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-sm sm:text-2xl font-bold text-gray-900">
                ₹{product.price?.base?.toLocaleString()}
              </span>
              {product.price?.discount > 0 && (
                <span className="text-[10px] sm:text-sm text-gray-500 line-through">
                  ₹
                  {(
                    product.price.base *
                    (1 + product.price.discount / 100)
                  ).toLocaleString()}
                </span>
              )}
            </div>
            {product.warranty?.duration && (
              <div className="flex items-center gap-0.5 text-[10px] sm:text-xs text-gray-500 mt-0.5">
                <Clock size={10} />
                <span>{product.warranty.duration}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-auto">
            <button
              onClick={handleViewClick}
              className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-md font-medium text-[10px] sm:text-sm transition-all duration-300 flex items-center justify-center gap-1"
            >
              <Eye size={14} className="sm:hidden" />
              <span className="hidden sm:inline">View Details</span>
              <span className="inline sm:hidden">View</span>
            </button>

            <button
              onClick={handleCartClick}
              className={`flex-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-md font-medium text-[10px] sm:text-sm transition-all duration-300 flex items-center justify-center gap-1 ${
                isInCart(product._id)
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-sky-600 hover:bg-sky-700"
              } text-white`}
            >
              <ShoppingCart size={14} />
              <span className="hidden sm:inline">
                {isInCart(product._id) ? "In Cart" : "Add to Cart"}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

const ProductGrid = ({ products }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const {
    addToWishlist,
    removeFromWishlist,
    items: wishlistItems,
    isInitialized: isWishlistInitialized,
    fetchWishlist,
  } = useWishlist();
  const {
    items: cartItems,
    isInitialized: isCartInitialized,
    fetchCart,
    addToCart,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setToken(authToken);

    if (authToken) {
      if (!isCartInitialized) fetchCart();
      if (!isWishlistInitialized) fetchWishlist();
    }
  }, []);

  const isInWishlist = useCallback(
    (productId) => {
      return (
        wishlistItems?.some(
          (item) =>
            item.product?._id === productId || item.product === productId
        ) ?? false
      );
    },
    [wishlistItems]
  );

  const isInCart = useCallback(
    (productId) => {
      return (
        cartItems?.some(
          (item) =>
            item.product?._id === productId || item.product === productId
        ) ?? false
      );
    },
    [cartItems]
  );

  const handleAddToCart = useCallback(
    (e, productId) => {
      e.stopPropagation();
      if (!token) {
        router.push("/login");
        return;
      }
      isInCart(productId) ? removeFromCart(productId) : addToCart(productId, 1);
    },
    [token, isInCart, removeFromCart, addToCart, router]
  );

  const handleWishlist = useCallback(
    (productId) => {
      if (!token) {
        router.push("/login");
        return;
      }
      isInWishlist(productId)
        ? removeFromWishlist(productId)
        : addToWishlist(productId);
    },
    [token, isInWishlist, removeFromWishlist, addToWishlist, router]
  );

  const handleViewDetails = useCallback(
    (slug) => {
      if (slug) router.push(`/products/${slug}`);
    },
    [router]
  );

  // Show loading state only for a maximum of 2 seconds
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showLoading && (!isCartInitialized || !isWishlistInitialized)) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 px-2 sm:px-4">
        {products.slice(0, 6).map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 animate-pulse h-96 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 px-2 sm:px-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isInWishlist={isInWishlist}
          isInCart={isInCart}
          onWishlist={handleWishlist}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
