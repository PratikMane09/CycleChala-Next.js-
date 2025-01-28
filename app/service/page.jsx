"use client";
import React, { useState } from "react";
import {
  Wrench,
  Bike,
  Home,
  CheckCircle,
  Settings,
  Star,
  Clock,
  ArrowRight,
  Phone,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@mui/material";

const ServicePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Non-Gear Bicycle Service",
      icon: Wrench,
      type: "regular",
      subtitle: "Perfect for Kids & Regular Cycles",
      sizes: 'Available for sizes 14", 16", 20"',
      price: "Starting from $49",
      items: [
        "Complete fork, wheels, hubs, bottom bracket, and headset adjustment",
        "Full component degreasing and inspection",
        "Professional spoke tensioning and wheel truing",
        "Comprehensive bearing inspection and maintenance",
        "Thorough brake pad inspection and cleaning",
        "Deep cleaning and precise pressure adjustment",
      ],
    },
    {
      title: "Gear Bicycle Service",
      icon: Bike,
      type: "gear",
      subtitle: "Specialized Care for Gear Bikes",
      price: "Starting from $79",
      items: [
        "All regular service features included",
        "Advanced gear system tuning and calibration",
        "Professional disc brake inspection and adjustment",
        "Detailed component wear analysis",
        "Premium cleaning and maintenance",
        "Complete safety and performance check",
      ],
    },
    {
      title: "Home Assembly Service",
      icon: Home,
      type: "home",
      subtitle: "Expert Assembly at Your Doorstep",
      price: "Starting from $99",
      items: [
        "Professional bicycle assembly at your location",
        "Comprehensive safety inspection",
        "Precision component adjustment",
        "Performance test ride",
        "Expert setup guidance",
        "Convenient home service experience",
      ],
    },
  ];

  const features = [
    {
      icon: Settings,
      title: "Expert Technicians",
      description:
        "Our skilled professionals bring years of experience to every service",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "We use only the finest tools and genuine spare parts",
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Fast and efficient service without compromising on quality",
    },
  ];

  return (
    <div className="min-h-screen mt-5 bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-sky-900 mb-4">
              Professional Bicycle Services
            </h1>
            <p className="text-xl text-sky-700">
              Expert care for all types of bicycles - From kids cycles to
              premium gear bikes
            </p>
          </div>

          {/* Services Section */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={service.type}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100 hover:border-sky-300 transition-all duration-300 hover:scale-105"
              >
                <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-6">
                  <div className="flex justify-center mb-4">
                    <service.icon size={48} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 text-center">
                    {service.title}
                  </h2>
                  <p className="text-sky-100 text-center text-sm">
                    {service.subtitle}
                  </p>
                  {service.sizes && (
                    <p className="text-sky-100 text-center text-sm mt-2">
                      {service.sizes}
                    </p>
                  )}
                </div>

                <div className="p-6">
                  <ul className="space-y-4">
                    {service.items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-200"
                      >
                        <CheckCircle className="flex-shrink-0 w-5 h-5 text-sky-500 mt-1 group-hover:text-sky-600 transition-colors duration-200" />
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-sky-900 mb-12 text-center">
              Why Choose Our Service?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-8 text-center group hover:bg-white rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative w-16 h-16 mx-auto mb-6">
                    <div className="absolute inset-0 bg-sky-100 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-sky-200 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12" />
                    <div className="relative flex items-center justify-center w-full h-full bg-white rounded-xl">
                      <feature.icon className="w-8 h-8 text-sky-600" />
                    </div>
                  </div>
                  <h4 className="font-bold text-sky-800 text-xl mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
