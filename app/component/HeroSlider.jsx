"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]); // Added slides.length as a dependency

  return (
    <div className="relative h-[650px] w-full overflow-hidden mt-[140px]">
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
            <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 z-10">
            <div className="pt-[150px] text-black">
              <h4 className="text-2xl md:text-[1.5rem] mb-3 font-medium">
                {slide.subtitle}
              </h4>
              <h1 className="text-4xl md:text-[3.2rem] font-bold mb-4">
                {slide.title}
              </h1>
              <Link href="/shop" className="inline-block mt-4">
                <button
                  className="bg-black/90 text-white hover:bg-white hover:text-black
                      px-6 py-3 font-semibold rounded transition-all duration-300
                      hover:-translate-y-1 hover:shadow-lg"
                >
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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
