"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Truck,
  ShoppingBag,
  CreditCard,
  Shield,
  Clock,
  CheckCircle2,
} from "lucide-react";

const ServicesList = () => {
  const serviceData = [
    {
      id: 1,
      title: "Complete Checkup",
      mainIcon: Wrench,
      subIcons: [Shield, Clock, CheckCircle2],
      desc: "21-Point Quality Inspection by Expert Technicians",
      gradient: "from-blue-500 to-cyan-400",
      features: ["Safety Check", "Parts Inspection", "Performance Test"],
    },
    {
      id: 2,
      title: "Safe Delivery",
      mainIcon: Truck,
      subIcons: [Shield, Clock, CheckCircle2],
      desc: "Secure Doorstep Delivery with Real-time Tracking",
      gradient: "from-purple-500 to-pink-500",
      features: ["GPS Tracking", "Insured Transit", "Time-Slot Booking"],
    },
    {
      id: 3,
      title: "Premium Accessories",
      mainIcon: ShoppingBag,
      subIcons: [Shield, Clock, CheckCircle2],
      desc: "High-Quality Cycling Gear and Accessories",
      gradient: "from-green-400 to-teal-500",
      features: ["Quality Gear", "Brand Warranty", "Expert Advice"],
    },
    {
      id: 4,
      title: "Secured Payment",
      mainIcon: CreditCard,
      subIcons: [Shield, Clock, CheckCircle2],
      desc: "100% Secure Payment Gateway Protection",
      gradient: "from-orange-500 to-yellow-400",
      features: ["SSL Security", "Multiple Options", "Instant Confirmation"],
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Ambient Background */}
      {/* <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-300 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Premium Cycling Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience excellence in every aspect of your cycling journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceData.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              className="group"
            >
              <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-sky-200 to-sky-300 hover:from-sky-300 hover:to-sky-400 transition-colors duration-300">
                <div className="bg-white rounded-2xl p-6 h-full backdrop-blur-3xl border border-sky-100 shadow-lg">
                  {/* Hover Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300 blur-xl`}
                  />

                  {/* Main Icon */}
                  <div className="relative mb-8">
                    <div
                      className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${service.gradient} p-[1px]`}
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative group-hover:bg-gradient-to-r group-hover:from-sky-100/50 group-hover:to-sky-200/30 transition-all duration-300">
                        {React.createElement(service.mainIcon, {
                          className: "w-12 h-12 text-sky-600",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Sub Icons */}
                  <div className="flex justify-center gap-4 mb-6">
                    {service.subIcons.map((SubIcon, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-200 transition-colors duration-300"
                      >
                        {React.createElement(SubIcon, {
                          className:
                            "w-4 h-4 text-sky-600 group-hover:text-sky-800 transition-colors duration-300",
                        })}
                      </div>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="text-center relative z-10">
                    <h3 className="text-xl font-semibold mb-3 text-black">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 mb-4">
                      {service.desc}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-500 flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sky-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Highlight */}
                  <div
                    className={`absolute bottom-0 left-[5%] right-[5%] h-[2px] bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 opacity-50`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 flex justify-center opacity-30">
          <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
