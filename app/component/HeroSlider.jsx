"use client";
import React, { useState } from "react";
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
      title: "Get premium Cycles at best prices",
    },
    {
      image: "/Images/banner/slider-2.jpg",
      subtitle: "Premium Cycles",
      title: "Get premium Cycles at best prices",
    },
    {
      image: "/Images/banner/slider-3.jpg",
      subtitle: "Premium Cycles",
      title: "Get premium Cycles at best prices",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative h-[650px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transform transition-all duration-1000 ease-in-out
            ${
              index === currentSlide
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Sky Blue Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 opacity-70" />
          </div>

          {/* Content Container */}
          <div className="relative container mx-auto px-4 z-10 flex flex-col items-center justify-center h-full">
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-2xl mb-8 relative"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for cycles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 px-6 rounded-full border-2 border-gray-300 
                    focus:outline-none focus:border-black 
                    text-xl transition-all duration-300 
                    shadow-lg hover:shadow-xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 
                    bg-black text-white p-3 rounded-full 
                    hover:bg-gray-800 transition-colors duration-300"
                >
                  <Search size={24} />
                </button>
              </div>
            </form>

            {/* Slide Content */}
            <div className="text-center text-black">
              <h4 className="text-2xl md:text-3xl mb-3 font-medium">
                {slide.subtitle}
              </h4>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {slide.title}
              </h1>
              <Link href="/shop" className="inline-block">
                <button
                  className="bg-black/90 text-white hover:bg-white hover:text-black
                    px-8 py-4 text-lg font-semibold rounded-full 
                    transition-all duration-300 
                    hover:-translate-y-1 hover:shadow-lg"
                >
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all
              ${index === currentSlide ? "bg-black" : "bg-black/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
