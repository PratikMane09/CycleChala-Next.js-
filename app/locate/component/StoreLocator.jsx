"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Navigation,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";

const StoreLocator = () => {
  const [modalImage, setModalImage] = useState(null);

  // Store Data (remains the same)
  const stores = [
    {
      id: 1,
      name: "Prakash Cycle Mart - Garkheda",
      images: [
        {
          url: "/images/stores/shop1-1.jpg",
          caption: "Store Front View",
        },
        {
          url: "/images/stores/shop1-2.jpg",
          caption: "Premium Bikes Collection",
        },
        {
          url: "/images/stores/shop1-3.jpg",
          caption: "Service Center",
        },
      ],
      address: "Shop No. 123, Garkheda Parisar",
      city: "Aurangabad",
      state: "Maharashtra",
      pincode: "431009",
      phone: "+91 7038698440",
      email: "pravinmane111@gmail.com",
      timing: "7:00 AM - 9:00 PM",
      rating: 4.8,
      reviews: 156,
    },
    {
      id: 2,
      name: "Prakash Cycle Mart - City Branch",
      images: [
        {
          url: "/images/stores/shop2-1.jpg",
          caption: "Showroom Entrance",
        },
        {
          url: "/images/stores/shop2-2.jpg",
          caption: "Kids Bikes Section",
        },
        {
          url: "/images/stores/shop2-3.jpg",
          caption: "Accessories Display",
        },
      ],
      address: "Plot No. 456, Main Road",
      city: "Aurangabad",
      state: "Maharashtra",
      pincode: "431001",
      phone: "+91 8806582924",
      email: "contact@prakashcycles.com",
      timing: "8:00 AM - 9:00 PM",
      rating: 4.9,
      reviews: 142,
    },
  ];

  // Next Arrow Component
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
        w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
        bg-sky-500/50 hover:bg-sky-500/75 
        rounded-full text-white 
        transition-all duration-300 hover:scale-110
        hidden sm:flex"
    >
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );

  // Prev Arrow Component
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
        w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
        bg-sky-500/50 hover:bg-sky-500/75 
        rounded-full text-white 
        transition-all duration-300 hover:scale-110
        hidden sm:flex"
    >
      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );

  // Slider settings (remains the same)
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  // Image Modal Component
  const ImageModal = ({ image, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-4"
    >
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={onClose}
          className="text-sky-600 hover:text-sky-800 transition-colors"
        >
          <X className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
      <div
        className="relative max-w-4xl w-full max-h-[80vh] aspect-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.url}
          alt={image.caption}
          width={1200}
          height={800}
          className="object-contain w-full h-full rounded-lg"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-sky-500/75 text-white p-3 sm:p-4 text-center rounded-b-lg">
          <p className="text-sm sm:text-lg">{image.caption}</p>
        </div>
      </div>
    </motion.div>
  );

  // Store Card Component
  const StoreCard = ({ store }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-sky-100 transform transition-transform duration-300 hover:-translate-y-1">
      {/* Image Slider */}
      <div className="relative h-[280px] sm:h-[320px] md:h-[380px]">
        <Slider {...sliderSettings} className="h-full">
          {store.images.map((image, index) => (
            <div
              key={index}
              className="relative h-[280px] sm:h-[320px] md:h-[380px]"
            >
              <Image
                src={image.url}
                alt={image.caption}
                fill
                className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setModalImage(image)}
              />
              <button
                onClick={() => setModalImage(image)}
                className="absolute bottom-4 right-4 bg-sky-500/50 hover:bg-sky-500/75 text-white p-2 
                  rounded-full transition-all duration-300 hover:scale-110"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div
                className="absolute bottom-4 left-4 bg-sky-500/50 backdrop-blur-sm 
                text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm"
              >
                {image.caption}
              </div>
            </div>
          ))}
        </Slider>

        {/* Rating Badge */}
        <div
          className="absolute top-4 right-4 z-10 bg-sky-500/50 backdrop-blur-sm rounded-full 
          px-2 py-1 sm:px-3 sm:py-1.5 flex items-center space-x-1 sm:space-x-2"
        >
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
          <span className="text-sky-900 text-xs sm:text-sm">
            {store.rating}
          </span>
          <span className="text-xs text-sky-700">({store.reviews})</span>
        </div>
      </div>

      {/* Store Info */}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-sky-50">
        <h2 className="text-lg sm:text-2xl font-bold text-sky-900">
          {store.name}
        </h2>

        <div className="grid gap-3 sm:gap-4">
          <div className="flex items-start space-x-3 text-sky-800">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-xs sm:text-sm">{store.address}</p>
              <p className="text-xs sm:text-sm">
                {store.city}, {store.state} - {store.pincode}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sky-800">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 flex-shrink-0" />
            <p className="text-xs sm:text-sm">{store.phone}</p>
          </div>

          <div className="flex items-center space-x-3 text-sky-800">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 flex-shrink-0" />
            <p className="text-xs sm:text-sm">{store.email}</p>
          </div>

          <div className="flex items-center space-x-3 text-sky-800">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 flex-shrink-0" />
            <p className="text-xs sm:text-sm">{store.timing}</p>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={`https://maps.google.com/?q=${store.address},${store.city}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white py-2 sm:py-3 px-4 
            rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-all 
            duration-300 hover:-translate-y-0.5 text-xs sm:text-sm"
        >
          <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Get Directions</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-6 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-900 mb-3 sm:mb-4">
            Visit Our Stores
          </h1>
          <p className="text-sm sm:text-base text-sky-700 max-w-2xl mx-auto">
            Experience our premium cycle collection at any of our two locations
            in Aurangabad
          </p>
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {stores.map((store) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <StoreCard store={store} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreLocator;
