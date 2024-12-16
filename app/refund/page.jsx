"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  RefreshCcw,
  Package,
  Clock,
  CheckSquare,
  AlertTriangle,
  Truck,
  Mail,
  Phone,
} from "lucide-react";

const RefundPolicy = () => {
  const returnConditions = [
    {
      icon: Package,
      title: "Physical Damage",
      description: "Item was delivered in a physically damaged condition",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: RefreshCcw,
      title: "Wrong Item",
      description: "Item received is different from what was ordered",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "Return Window",
      description:
        "Returns must be initiated within the applicable return window",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: CheckSquare,
      title: "Original Condition",
      description:
        "Items must be returned in their original condition with tags and packaging",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const requirements = [
    "Original price tags must be intact",
    "Invoice/receipt must be provided",
    "Original manufacturer's box/packaging",
    "All accessories and free items included",
    "Product should be unused",
    "No physical damage caused by customer",
  ];

  const process = [
    {
      step: 1,
      title: "Initiate Return",
      description:
        "Contact our customer service team to initiate the return process",
    },
    {
      step: 2,
      title: "Verification",
      description: "Our team will verify your return request and eligibility",
    },
    {
      step: 3,
      title: "Return Pickup",
      description: "Schedule a pickup or drop off the item at our store",
    },
    {
      step: 4,
      title: "Quality Check",
      description: "Our team will inspect the returned item",
    },
    {
      step: 5,
      title: "Replacement/Refund",
      description: "Process replacement or refund within 2-3 business days",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Returns & Replacement Policy
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            At Prakash Cycle Mart, we want you to be completely satisfied with
            your purchase. Here is everything you need to know about our returns
            and replacement process.
          </p>
        </motion.div>

        {/* Return Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {returnConditions.map((condition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${condition.gradient} 
                flex items-center justify-center mb-4`}
              >
                <condition.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {condition.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {condition.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Requirements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-2xl p-8 border border-gray-800 mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl font-bold text-white">
              Return Requirements
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {requirements.map((req, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 text-gray-300"
              >
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Return Process
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                      flex items-center justify-center mb-4 text-white font-bold"
                    >
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-gray-800 transform translate-x-1/2">
                    <div className="absolute right-0 w-3 h-3 bg-blue-500 rounded-full transform translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-gray-800 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Help with a Return?
          </h2>
          <p className="text-gray-400 mb-6">
            Our customer service team is here to help you with the return
            process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:prakashcyclesecom@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r 
                from-blue-500 to-purple-500 rounded-lg text-white font-semibold
                hover:opacity-90 transition-opacity gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Support
            </a>
            <a
              href="tel:+917038698440"
              className="inline-flex items-center justify-center px-6 py-3 
                bg-gray-800 rounded-lg text-white font-semibold
                hover:bg-gray-700 transition-colors gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;
