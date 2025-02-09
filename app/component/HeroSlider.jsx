"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const slides = [
    {
      image: "/Images/banner/slider-1.jpg",
      subtitle: "Premium Cycles",
      title: "Get premium Cyycles at best prices",
    },
    {
      image: "/Images/banner/slider-2.jpg",
      subtitle: "Premium Cycles",
      title: "Get premium Cyyccles at best prices",
    },
    {
      image: "/Images/banner/slider-3.jpg",
      subtitle: "Premium Cycles",
      title: "Get premium Cyclles at best prices",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative h-[650px] w-full overflow-hidden bg-gray-100">
      <div className="relative h-full w-full">
        {/* Current Slide */}
        <div className="absolute inset-0 transition-opacity duration-500 ease-in-out">
          <Image
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 opacity-70" />
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto px-4 z-10">
          <div className="flex flex-col items-center justify-center h-full">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for cycles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 px-6 rounded-full border-2 border-gray-300 
                    focus:outline-none focus:border-black text-xl shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 
                    bg-black text-white p-3 rounded-full hover:bg-gray-800"
                >
                  <Search size={24} />
                </button>
              </div>
            </form>

            {/* Slide Content */}
            <div className="text-center text-black">
              <h4 className="text-2xl md:text-3xl mb-3 font-medium">
                {slides[currentSlide].subtitle}
              </h4>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {slides[currentSlide].title}
              </h1>
              <Link href="/shop">
                <button
                  className="bg-black/90 text-white px-8 py-4 text-lg font-semibold 
                    rounded-full hover:bg-white hover:text-black transition-all"
                >
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                ${index === currentSlide ? "bg-black w-6" : "bg-black/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
