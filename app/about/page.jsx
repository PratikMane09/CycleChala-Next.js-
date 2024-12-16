"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Award, Users, Star } from "lucide-react";

const AboutSection = ({ isAboutPage = false }) => {
  const features = [
    {
      icon: CheckCircle,
      title: "Expert Service",
      description: "Professional bike maintenance and repairs",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Top brands and certified genuine parts",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building cycling community since 1995",
    },
    {
      icon: Star,
      title: "Customer First",
      description: "Dedicated support and satisfaction guarantee",
    },
  ];

  return (
    <section
      className={`relative bg-sky-50 ${
        !isAboutPage ? "mt-[140px]" : "mt-0"
      } py-20 overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full filter blur-[100px] transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full filter blur-[100px] transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full px-4 py-1">
              <span className="text-white text-sm font-semibold">About Us</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                Prakash Cycle Mart
              </span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              Your ultimate destination for all things cycling. We are more than
              just a bike shop; we are a community of passionate cyclists
              dedicated to providing top-notch bikes, gear, and accessories. Our
              curated selection, expert staff, and commitment to customer
              satisfaction make us your go-to resource for all your cycling
              needs.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white shadow-md border border-sky-100 p-6 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/cycleimg/aboutcyclepic.png"
                alt="About Prakash Cycle Mart"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="grid grid-cols-3 gap-4 text-gray-800">
                <div className="text-center p-4 bg-white/80 backdrop-blur-md rounded-lg shadow-md">
                  <div className="text-2xl font-bold text-sky-600">25+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-md rounded-lg shadow-md">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-white/80 backdrop-blur-md rounded-lg shadow-md">
                  <div className="text-2xl font-bold text-cyan-600">50+</div>
                  <div className="text-sm text-gray-600">Premium Brands</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
