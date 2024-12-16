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
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="container  px-4 py-20">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4 mt-5 text-black">
          Find The Perfect Bike For Your Child
        </h2>
        <p className="text-lg text-black max-w-2xl mx-auto">
          Choose from our age-appropriate selection of bikes designed for
          safety, comfort, and fun
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="h-full"
          >
            <Card className="relative h-full overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-sky-100 via-sky-200 to-sky-300">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-75 z-10`}
              />

              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={card.image}
                  alt={`Bikes for ${card.age}`}
                  fill
                  className="object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>

              <CardContent className="relative z-20 text-center p-6">
                <Typography
                  variant="h5"
                  className="font-bold text-black mb-4 text-2xl"
                >
                  {card.age}
                </Typography>

                <Link href={card.path} className="inline-block">
                  <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-900">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/90 px-8 py-1 text-sm font-medium text-gray-900 backdrop-blur-3xl hover:bg-white/75">
                      Shop Now
                    </span>
                  </button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Age Guide Section */}
      <motion.div
        className="mt-16  rounded-2xl p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Age & Size Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {cards.map((card, index) => (
            <div
              key={`guide-${index}`}
              className="bg-white/90  rounded-xl p-6 shadow-md border-black hover:shadow-xl transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-full mb-4 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
              >
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <h4 className="font-semibold text-black text-lg mb-2">
                {card.age}
              </h4>
              <p className="text-gray-600 text-sm">
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
