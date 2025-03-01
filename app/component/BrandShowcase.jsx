"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BrandShowcase = () => {
  const brands = [
    {
      id: 1,
      name: "GIANT",
      image: "/images/brand/GIANT-PNG.png",
      description: "World's Leading Bicycle Manufacturer",
      year: "Est. 1972",
      specialty: "Premium Road & Mountain Bikes",
    },
    {
      id: 2,
      name: "Polygon",
      image: "/images/brand/Polygon-PNG.png",
      description: "Innovation in Cycling Technology",
      year: "Est. 1989",
      specialty: "Performance & Adventure Bikes",
    },
    {
      id: 3,
      name: "Firefox",
      image: "/images/brand/firefox-PNG.png",
      description: "Urban Mobility Solutions",
      year: "Est. 2005",
      specialty: "Urban & Kids Bikes",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 rounded-full filter blur-[80px] md:blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-500/5 rounded-full filter blur-[80px] md:blur-[100px]" />
      </div>

      <div className="container mx-auto px-2 md:px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-xs md:text-sm font-semibold text-white mb-3 md:mb-4">
            SHOP BY BRANDS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Premium Brand Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience excellence with our curated selection of world-renowned
            cycling brands
          </p>
        </motion.div>

        {/* Brands Grid - Changed to flex layout for mobile horizontal scrolling */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 gap-4 md:gap-8 md:grid md:grid-cols-3 snap-x snap-mandatory hide-scrollbar">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="group flex-shrink-0 w-[85%] sm:w-[40%] md:w-full snap-center"
            >
              {/* Brand Card */}
              <div className="relative bg-white rounded-2xl p-1 overflow-hidden shadow-lg border border-gray-200 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-white rounded-2xl p-4 md:p-8 h-full flex flex-col">
                  {/* Logo Container */}
                  <div className="h-24 md:h-40 relative mb-4 md:mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-transparent rounded-xl" />
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={150}
                      height={80}
                      className="object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 max-w-[80%] md:max-w-full"
                    />
                  </div>

                  {/* Brand Info */}
                  <div className="text-center flex-grow flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                      {brand.description}
                    </p>

                    <div className="hidden md:flex justify-between items-center text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                      <span>{brand.year}</span>
                      <span>•</span>
                      <span>{brand.specialty}</span>
                    </div>

                    {/* Mobile version - simplified */}
                    <div className="flex md:hidden justify-center items-center text-xs text-gray-500 mb-3">
                      <span>{brand.year}</span>
                    </div>

                    {/* Hover Effect Button */}
                    <div className="mt-auto">
                      <button className="w-full py-2 md:py-3 px-4 md:px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs md:text-sm font-semibold opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                        Explore Collection
                      </button>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-2 right-2 md:top-4 md:right-4">
                    <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  </div>
                  <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                    <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Features */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { title: "Global Brands", value: "3+" },
            { title: "Years of Trust", value: "25+" },
            { title: "Bike Categories", value: "10+" },
            { title: "Happy Customers", value: "1000+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS for hiding scrollbar but allowing scroll functionality */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default BrandShowcase;
