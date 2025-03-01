"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, Typography } from "@mui/material";

const AgeCards = () => {
  const cards = [
    {
      image: "/Images/cycleimg/mountain.webp",
      age: "1 to 2 years",
      path: "/mountain-bikes",
      gradient: "from-pink-400 to-purple-500",
      delay: 0.1,
    },
    {
      image: "/Images/cycleimg/kids.jpeg",
      age: "3 to 5 years",
      path: "/kids-bikes",
      gradient: "from-orange-400 to-pink-500",
      delay: 0.2,
    },
    {
      image: "/Images/cycleimg/hybrid.jpeg",
      age: "5 to 10 years",
      path: "/hybrid-bikes",
      gradient: "from-blue-400 to-purple-500",
      delay: 0.3,
    },
    {
      image: "/Images/cycleimg/road.jpeg",
      age: "10 years onwards",
      path: "/road-bikes",
      gradient: "from-green-400 to-blue-500",
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-lg text-blue-600 font-semibold mb-2 block">
          Cycle Chala
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
          Find The Perfect Bike For Your Child
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Choose from our age-appropriate selection of bikes designed for
          safety, comfort, and fun
        </p>
      </motion.div>

      {/* Changed grid-cols-1 to grid-cols-2 for small screens, kept the rest the same */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Card className="h-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="relative aspect-square w-full">
                <Image
                  src={card.image}
                  alt={`Bikes for ${card.age}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-30 mix-blend-multiply`}
                />
              </div>
              <CardContent className="text-center p-2 sm:p-4 bg-white">
                <Typography
                  variant="h5"
                  className="font-bold text-gray-800 mb-2 sm:mb-3 text-base sm:text-xl"
                >
                  {card.age}
                </Typography>
                <Link href={card.path} className="block">
                  <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors">
                    Shop Now
                  </button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Age Guide Section - Also updated to show 2 items per row on mobile */}
      <motion.div
        className="mt-16 rounded-2xl p-4 sm:p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 text-center">
          Age & Size Guide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {cards.map((card, index) => (
            <div
              key={`guide-${index}`}
              className="bg-white/90 rounded-xl p-3 sm:p-6 shadow-xl border-black hover:shadow-xl transition-shadow"
            >
              <div
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full mb-2 sm:mb-4 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
              >
                <span className="text-white font-bold text-sm sm:text-base">
                  {index + 1}
                </span>
              </div>
              <h4 className="font-semibold text-black text-base sm:text-lg mb-1 sm:mb-2">
                {card.age}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Perfect for children aged {card.age.toLowerCase()}, designed
                with appropriate size and safety features
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AgeCards;
