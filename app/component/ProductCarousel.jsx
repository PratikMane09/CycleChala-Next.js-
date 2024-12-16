"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Star, Award, Shield, Heart } from "lucide-react";

const ProductCarousel = () => {
  const [isClient, setIsClient] = useState(false);
  const scrollerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const products = [
    {
      id: 1,
      title: "Student Commuter Pro",
      price: "$599.99",
      category: "Student Bikes",
      image: "/Images/product/p1.jpg",
      features: ["Lightweight Frame", "Built-in Lock", "USB Charging"],
      rating: 4.8,
      reviews: 156,
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      id: 2,
      title: "Urban Professional",
      price: "$899.99",
      category: "Adult Bikes",
      image: "/Images/product/p2.jpg",
      features: ["Premium Gears", "Weather Resistant", "Smart Connect"],
      rating: 4.9,
      reviews: 203,
      gradient: "from-purple-600 to-pink-500",
    },
    {
      id: 3,
      title: "Adventure Seeker X1",
      price: "$1,299.99",
      category: "Sport Bikes",
      image: "/Images/product/p3.jpg",
      features: ["All-Terrain", "Shock Absorber", "Durable"],
      rating: 4.7,
      reviews: 189,
      gradient: "from-orange-600 to-red-500",
    },
    {
      id: 4,
      title: "City Explorer Elite",
      price: "$799.99",
      category: "City Bikes",
      image: "/Images/product/p4.jpg",
      features: ["Easy Fold", "Night Lights", "Ergonomic"],
      rating: 4.6,
      reviews: 167,
      gradient: "from-green-600 to-emerald-500",
    },
  ];

  const allProducts = [...products, ...products];

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scrollerElement = scrollerRef.current;
    const scrollerContent = Array.from(scrollerElement.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerElement.appendChild(duplicatedItem);
    });

    const scrollWidth = scrollerElement.offsetWidth / 2;
    let scrollPos = 0;
    let localIsHovered = false;
    let animationFrameId = null;

    const scroll = () => {
      if (!localIsHovered) {
        scrollPos += 0.5;
        if (scrollPos >= scrollWidth) {
          scrollPos = 0;
        }
        scrollerElement.style.transform = `translateX(-${scrollPos}px)`;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleHover = () => {
      localIsHovered = true;
    };

    const handleLeave = () => {
      localIsHovered = false;
    };

    scrollerElement.addEventListener("mouseenter", handleHover);
    scrollerElement.addEventListener("mouseleave", handleLeave);
    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      scrollerElement.removeEventListener("mouseenter", handleHover);
      scrollerElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let animationFrameId;
    let currentPosition = scrollPosition;

    const scroll = () => {
      if (!isHovered && scrollerRef.current) {
        currentPosition += 0.5;
        const maxScroll = scrollerRef.current.scrollWidth / 2;

        if (currentPosition >= maxScroll) {
          currentPosition = 0;
        }

        setScrollPosition(currentPosition);
        scrollerRef.current.style.transform = `translateX(-${currentPosition}px)`;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isClient, isHovered, scrollPosition]);

  if (!isClient) {
    return null;
  }

  return (
    <section className=" bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-lg text-blue-600 font-semibold mb-2 block">
            Prakash Cycle Mart
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Best Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your perfect ride from our premium collection
          </p>
        </motion.div>
      </div>

      <div
        className="relative w-full overflow-hidden py-4"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollerRef}
          className="flex w-max transition-transform duration-100"
        >
          {allProducts.map((product, idx) => (
            <motion.div
              key={`${product.id}-${idx}`}
              className="w-[300px] flex-shrink-0 mx-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-10`}
                  />
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <button
                    className="absolute top-4 right-4 p-2 bg-gray-100/50 backdrop-blur-md rounded-full 
                      hover:bg-gray-200 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-gray-700" />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
                      bg-gradient-to-r ${product.gradient} text-white`}
                    >
                      {product.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-800 ml-1 text-sm">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>

                  <ul className="space-y-1 mb-4">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <Award className="w-3 h-3 mr-2 text-blue-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-xs text-gray-600">Warranty</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      {product.price}
                    </span>
                  </div>

                  <Link
                    href={`/shop/${product.id}`}
                    className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg 
                      bg-gradient-to-r ${product.gradient} text-white text-sm font-semibold 
                      hover:opacity-90 transition-opacity duration-300`}
                  >
                    Explore Now
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Students", "Professionals", "Adventurers", "Commuters"].map(
            (category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-md"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  For {category}
                </h4>
                <p className="text-sm text-gray-600">
                  Specially designed for your lifestyle
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
