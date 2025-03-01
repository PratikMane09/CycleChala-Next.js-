"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Star,
  Award,
  Shield,
  Heart,
  ArrowRight,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

const ProductDisplay = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productData, setProductData] = useState({});
  const [activeTab, setActiveTab] = useState("featured");

  // Sections configuration
  const sections = [
    {
      id: "featured",
      label: "Featured Products",
      description: "Our handpicked selection for you",
    },
    {
      id: "bestseller",
      label: "Best Sellers",
      description: "Most popular choices among our customers",
    },
    {
      id: "new",
      label: "New Arrivals",
      description: "Fresh additions to our collection",
    },
    {
      id: "trending",
      label: "Trending Now",
      description: "What's hot in the cycling world",
    },
    {
      id: "special",
      label: "Special Offers",
      description: "Limited time deals you don't want to miss",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(
          `${API_BASE_URL}/api/users/homepage/products`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (data.success) {
          setProductData(data.data);
        } else {
          console.error("API returned error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (slug) => {
    if (slug) {
      router.push(`/products/${slug}`);
    }
  };

  // Placeholder data for skeleton loading
  const skeletonItems = Array(6).fill(null);

  // Color gradient map for different sections
  const gradientMap = {
    featured: "from-blue-600 to-cyan-500",
    bestseller: "from-purple-600 to-pink-500",
    new: "from-green-600 to-emerald-500",
    trending: "from-orange-600 to-red-500",
    special: "from-red-600 to-yellow-500",
  };

  // Function to calculate discounted price
  const calculatePrice = (basePrice, discount) => {
    if (!discount) return basePrice;
    const discountedPrice = basePrice - (basePrice * discount) / 100;
    return discountedPrice.toFixed(2);
  };

  const renderProductCard = (product, index) => {
    const gradient = gradientMap[activeTab] || "from-blue-600 to-cyan-500";

    // Extract necessary product data
    const {
      name,
      price,
      rating,
      images,
      features = [],
      metadata = {},
    } = product;

    // Find primary image or use first image
    const primaryImage = images?.find((img) => img.isPrimary) || images?.[0];
    const imageUrl = primaryImage
      ? `/api/images/${primaryImage.filename}`
      : "/Images/placeholder.jpg";

    // Calculate pricing
    const basePrice = price?.base || 0;
    const discount = price?.discount || 0;
    const finalPrice = calculatePrice(basePrice, discount);
    const currency = price?.currency || "INR";

    return (
      <motion.div
        key={`${product._id || index}`}
        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}
            />
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            <button
              className="absolute top-4 right-4 p-2 bg-gray-100/50 backdrop-blur-md rounded-full 
                hover:bg-gray-200 transition-colors"
            >
              <Heart className="w-4 h-4 text-gray-700" />
            </button>

            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {discount}% OFF
              </div>
            )}
          </div>

          <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold 
                bg-gradient-to-r ${gradient} text-white`}
              >
                {product.brand || "Premium"}
              </span>
              {rating?.average > 0 && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-800 ml-1 text-sm">
                    {rating.average.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {name}
            </h3>

            <div className="mb-4 flex-grow">
              {(product.features || []).slice(0, 3).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center text-xs text-gray-600 mb-1"
                >
                  <Award className="w-3 h-3 mr-2 text-blue-600 flex-shrink-0" />
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4 mt-auto">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-xs text-gray-600">
                  {product.warranty?.duration || "Warranty"}
                </span>
              </div>
              <div className="text-right">
                {discount > 0 && (
                  <span className="text-sm text-gray-500 line-through block">
                    {currency} {basePrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xl font-bold text-gray-900">
                  {currency} {finalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              href={`/products/${metadata.slug || product._id}`}
              className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg 
                bg-gradient-to-r ${gradient} text-white text-sm font-semibold 
                hover:opacity-90 transition-opacity duration-300`}
            >
              Explore Now
              <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSkeleton = (index) => (
    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-full">
        <div className="relative h-48 bg-gray-200 animate-pulse" />
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-12 h-6 bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="w-full h-6 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-2 mb-4">
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-lg text-blue-600 font-semibold mb-2 block">
            Cycle Chala
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Discover Your Perfect Ride
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our premium collection of cycles designed for every
            lifestyle
          </p>
        </motion.div>

        {/* Section tabs */}
        <div className="flex flex-wrap mb-8 justify-center">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`px-5 py-3 mx-2 mb-3 rounded-full text-sm font-semibold transition-all duration-300 
                ${
                  activeTab === section.id
                    ? `bg-gradient-to-r ${
                        gradientMap[section.id]
                      } text-white shadow-md`
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Section description */}
        <div className="text-center mb-10">
          <p className="text-gray-600 italic">
            {sections.find((s) => s.id === activeTab)?.description || ""}
          </p>
        </div>

        {/* Product grid */}
        <div className="flex flex-wrap -mx-3">
          {isLoading ? (
            // Skeleton loading
            skeletonItems.map((_, index) => renderSkeleton(index))
          ) : productData[activeTab] && productData[activeTab].length > 0 ? (
            // Products display
            productData[activeTab].map((product, index) =>
              renderProductCard(product, index)
            )
          ) : (
            // No products found
            <div className="w-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found in this category
              </p>
            </div>
          )}
        </div>

        {/* View all button */}
        {!isLoading &&
          productData[activeTab] &&
          productData[activeTab].length > 0 && (
            <div className="text-center mt-12">
              <Link
                href={`/products?category=${activeTab}`}
                className={`inline-flex items-center px-6 py-3 rounded-lg 
                bg-gradient-to-r ${gradientMap[activeTab]} text-white font-semibold 
                hover:opacity-90 transition-all duration-300 shadow-md`}
              >
                View All {sections.find((s) => s.id === activeTab)?.label}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          )}

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24">
          {["Students", "Professionals", "Adventurers", "Commuters"].map(
            (category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-3 font-serif">
                  For {category}
                </h4>
                <p className="text-gray-600">
                  Specially designed for your lifestyle
                </p>
                <Link
                  href={`/shop`}
                  className="text-blue-600 inline-flex items-center mt-4 font-medium hover:text-blue-800"
                >
                  Explore
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
