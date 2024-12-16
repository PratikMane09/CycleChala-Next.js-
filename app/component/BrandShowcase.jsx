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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm font-semibold text-white mb-4">
            SHOP BY BRANDS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premium Brand Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience excellence with our curated selection of world-renowned
            cycling brands
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              {/* Brand Card */}
              <div className="relative bg-white rounded-2xl p-1 overflow-hidden shadow-lg border border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative bg-white rounded-2xl p-8">
                  {/* Logo Container */}
                  <div className="h-40 relative mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-transparent rounded-xl" />
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={200}
                      height={100}
                      className="object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Brand Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{brand.description}</p>

                    <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                      <span>{brand.year}</span>
                      <span>•</span>
                      <span>{brand.specialty}</span>
                    </div>

                    {/* Hover Effect Button */}
                    <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Explore Collection
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Features */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
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
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
