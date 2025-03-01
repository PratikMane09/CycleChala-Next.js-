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

  // Store Data
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
  ];

  // Image Slider Components (same as before)
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

  // Image Modal Component (same as before)
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

  // Two-Column Store Card Component
  const StoreCard = ({ store }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-xl border border-sky-100">
      {/* Information Column */}
      <div className="p-6 sm:p-8 bg-sky-50 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-6">
            {store.name}
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 text-sky-800">
              <MapPin className="w-5 h-5 text-sky-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm">{store.address}</p>
                <p className="text-sm">
                  {store.city}, {store.state} - {store.pincode}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sky-800">
              <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
              <p className="text-sm">{store.phone}</p>
            </div>

            <div className="flex items-center space-x-3 text-sky-800">
              <Mail className="w-5 h-5 text-sky-500 flex-shrink-0" />
              <p className="text-sm">{store.email}</p>
            </div>

            <div className="flex items-center space-x-3 text-sky-800">
              <Clock className="w-5 h-5 text-sky-500 flex-shrink-0" />
              <p className="text-sm">{store.timing}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-4">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-sky-900 text-sm font-semibold">
                {store.rating}
              </span>
              <span className="text-xs text-sky-700">
                ({store.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={`https://maps.google.com/?q=${store.address},${store.city}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white py-3 px-4 
            rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition-all 
            duration-300 hover:-translate-y-0.5 text-sm"
        >
          <Navigation className="w-5 h-5" />
          <span>Get Directions</span>
        </a>
      </div>

      {/* Image Column */}
      <div className="relative h-[400px] lg:h-auto">
        <div className="relative h-full">
          <Slider {...sliderSettings} className="h-full">
            {store.images.map((image, index) => (
              <div key={index} className="relative h-[400px] lg:h-full">
                <Image
                  src={image.url}
                  alt={image.caption}
                  fill
                  className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => setModalImage(image)}
                />
                <div
                  className="absolute bottom-4 left-4 bg-sky-500/50 backdrop-blur-sm 
                  text-white px-3 py-1.5 rounded-full text-sm"
                >
                  {image.caption}
                </div>
                <button
                  onClick={() => setModalImage(image)}
                  className="absolute bottom-4 right-4 bg-sky-500/50 hover:bg-sky-500/75 
                  text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-6 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4 font-serif">
            Our Store Locations
          </h1>
          <p className="text-base text-sky-700 max-w-2xl mx-auto">
            Discover our premium cycle collection at our carefully curated
            stores in Aurangabad
          </p>
        </div>

        {/* Store Cards Grid */}
        <div className="space-y-8">
          {stores.map((store) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
