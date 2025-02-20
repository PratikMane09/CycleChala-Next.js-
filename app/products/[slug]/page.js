"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Star,
  Heart,
  ShoppingCart,
  Shield,
  ChevronLeft,
  Truck,
  Package,
  Check,
  ChevronRight,
} from "lucide-react";

import { API_BASE_URL } from "../../../config/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductDetail = () => {
  const router = useRouter();
  const {
    addToCart,
    fetchCart,
    items: cartItems,
    loading: cartLoading,
  } = useCart();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loading: wishlistLoading,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  // Get current color's images or fallback to primary product images
  const getCurrentImages = useCallback(() => {
    if (!selectedColor) return [];
    if (selectedColor.images?.length > 0) return selectedColor.images;
    return product?.images || [];
  }, [selectedColor, product]);

  // Fetch product details
  const fetchProductDetails = useCallback(async () => {
    try {
      const slug = window.location.pathname.split("/").pop();
      const response = await fetch(
        `${API_BASE_URL}/api/admin/products/${slug}`
      );
      if (!response.ok) throw new Error("Product not found");

      const result = await response.json();
      setProduct(result.data);

      // Set initial color if available
      if (result.data.colors && result.data.colors.length > 0) {
        setSelectedColor(result.data.colors[0]);
      }

      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  useEffect(() => {
    if (product) {
      setIsWishlisted(isInWishlist(product._id));
    }
  }, [product, isInWishlist]);

  const getImageUrl = (image) => {
    if (!image?.data) return "/placeholder-image.jpg";
    const base64 = Buffer.from(image.data).toString("base64");
    return `data:${image.contentType};base64,${base64}`;
  };

  const handleAddToCart = async () => {
    if (!product?.inventory?.inStock) {
      toast.error("Product is currently unavailable");
      return;
    }

    try {
      await addToCart(product._id, quantity, selectedColor?.name);
      await fetchCart();
      toast.success(
        `Added ${quantity} ${selectedColor?.name || ""} item(s) to cart`
      );
    } catch (error) {
      toast.error(error.message || "Failed to add to cart");
    }
  };

  const toggleWishlist = async () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to manage wishlist");
      return;
    }

    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update wishlist");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-8 animate-pulse">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-2xl" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-xl"
                />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded w-3/4" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  const processAvailableColors = (product) => {
    if (!product) return [];

    // Get colors from specifications
    const specColors = product.specifications?.colors?.available || [];

    // Get colors from images
    const imageColors = product.colors || [];

    // Merge and deduplicate colors
    const mergedColors = [...specColors, ...imageColors].reduce(
      (unique, color) => {
        if (!color?.name) return unique;

        const existingColor = unique.find(
          (c) => c.name.toLowerCase() === color.name.toLowerCase()
        );
        if (!existingColor) {
          unique.push({
            name: color.name,
            hexCode: color.hexCode || "#CCCCCC",
            images: color.images || [],
          });
        } else if (color.images) {
          existingColor.images = [
            ...(existingColor.images || []),
            ...color.images,
          ];
        }

        return unique;
      },
      []
    );

    return mergedColors.filter(
      (color) => color.name && (color.images?.length > 0 || color.hexCode)
    );
  };

  const handleColorSelect = (color) => {
    if (!color) return;
    setSelectedColor(color);
    // Reset image selection only if the new color has images
    if (color.images?.length > 0) {
      setSelectedImage(0);
    }
  };

  // Render color options section
  const renderColorOptions = () => {
    const availableColors = processAvailableColors(product);

    if (!availableColors?.length) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Select Color</h3>
        <div className="flex flex-wrap gap-4">
          {availableColors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorSelect(color)}
              className={`group relative p-1.5 rounded-full transition-all duration-200
                ${
                  selectedColor?.name === color.name
                    ? "ring-2 ring-sky-500 shadow-md"
                    : "hover:ring-2 hover:ring-sky-300"
                }`}
            >
              <div
                className="w-8 h-8 rounded-full border border-gray-200 shadow-sm"
                style={{
                  backgroundColor: color.hexCode,
                  cursor: "pointer",
                }}
              />
              <span
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                bg-gray-900 text-white text-xs font-medium py-1 px-2 rounded 
                opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Image gallery with color context
  const renderImageGallery = () => {
    const currentImages = getCurrentImages();

    return (
      <div className="space-y-8">
        <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-white shadow-lg">
          {currentImages[selectedImage] && (
            <img
              src={getImageUrl(currentImages[selectedImage])}
              alt={`${product.name}${
                selectedColor ? ` in ${selectedColor.name}` : ""
              }`}
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        {currentImages.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {currentImages.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-w-1 aspect-h-1 rounded-xl overflow-hidden
                  transition-all duration-200
                  ${
                    selectedImage === idx
                      ? "ring-2 ring-sky-500 shadow-md"
                      : "hover:ring-2 hover:ring-sky-300"
                  }`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${product.name} view ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };
  const renderSpecifications = () => {
    if (!product?.specifications) return null;

    // Function to format specification key
    const formatKey = (key) => {
      return key
        .split(/(?=[A-Z])/)
        .join(" ")
        .toLowerCase()
        .replace(/^[a-z]/, (char) => char.toUpperCase());
    };

    // Function to check if a value is valid for display
    const isValidValue = (value) => {
      return (
        value &&
        value !== "null" &&
        value !== "undefined" &&
        value !== "" &&
        !Array.isArray(value)
      );
    };

    // Process specifications
    const processedSpecs = Object.entries(product.specifications)
      .filter(([key]) => key !== "colors") // Exclude colors section
      .reduce((acc, [key, section]) => {
        if (typeof section === "object" && section !== null) {
          Object.entries(section).forEach(([subKey, value]) => {
            if (isValidValue(value)) {
              acc.push({
                key: `${formatKey(key)} ${formatKey(subKey)}`,
                value: value,
              });
            }
          });
        }
        return acc;
      }, []);

    if (processedSpecs.length === 0) return null;

    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          {processedSpecs.map(({ key, value }, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Check className="w-5 h-5 text-sky-600 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{key}</span>
                <span className="font-medium text-gray-900">
                  {typeof value === "number" ? value.toString() : value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  if (!product) return null;

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm font-medium text-gray-600 mb-8">
          {product.breadcrumb?.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
              <button className="hover:text-sky-600 transition-colors">
                {item.name}
              </button>
            </div>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-8">
            <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-white shadow-lg">
              {getCurrentImages()[selectedImage] && (
                <img
                  src={getImageUrl(getCurrentImages()[selectedImage])}
                  alt={`${product.name} in ${selectedColor?.name}`}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform"
                />
              )}
            </div>

            {getCurrentImages().length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {getCurrentImages().map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-w-1 aspect-h-1 rounded-xl overflow-hidden
                      ${
                        selectedImage === idx
                          ? "ring-2 ring-sky-500"
                          : "hover:ring-2 hover:ring-sky-300"
                      }`}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`Product view ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-xl font-medium text-sky-600 mt-2">
                {product.brand}
              </p>
            </div>

            {/* Color Selection */}
            {renderColorOptions()}

            {/* Pricing and Cart Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-4">
                <p className="text-3xl font-bold text-gray-900">
                  ₹{product.price?.base?.toLocaleString()}
                </p>
                {product.price?.discount > 0 && (
                  <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    {product.price.discount}% OFF
                  </span>
                )}
              </div>

              {/* Stock and Quantity */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package
                    className={`w-5 h-5 ${
                      product.inventory?.inStock
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  />
                  <span
                    className={
                      product.inventory?.inStock
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product.inventory?.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  disabled={!product.inventory?.inStock}
                  className="rounded-lg border-gray-300 py-2 px-3 text-sm"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={
                    !product.inventory?.inStock || cartLoading || !selectedColor
                  }
                  className={`flex items-center justify-center py-3 rounded-xl 
                    ${
                      product.inventory?.inStock && selectedColor
                        ? "bg-sky-600 text-white hover:bg-sky-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  <ShoppingCart className="mr-2" />
                  {cartLoading ? "Adding..." : "Add to Cart"}
                </button>
                <button
                  onClick={toggleWishlist}
                  disabled={wishlistLoading}
                  className={`flex items-center justify-center py-3 rounded-xl 
                    ${
                      isWishlisted
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-700"
                    }`}
                >
                  <Heart
                    className={`mr-2 ${isWishlisted ? "fill-current" : ""}`}
                  />
                  {wishlistLoading
                    ? "Updating..."
                    : isWishlisted
                    ? "Wishlisted"
                    : "Add to Wishlist"}
                </button>
              </div>
            </div>

            {/* Rest of the component remains the same */}
            {/* Description */}
            <div className="prose prose-sky max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {renderSpecifications()}

            {/* Shipping Information */}
            <div className="bg-sky-50 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <Truck className="w-6 h-6 text-sky-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Free Delivery
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Enter your postal code for delivery availability
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
