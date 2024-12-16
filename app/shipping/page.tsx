"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Package,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const ShippingPolicy = () => {
  const shippingFeatures = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "We offer complimentary shipping on all orders across India",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "Delivery Time",
      description: "Standard delivery within 3-5 business days",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Coverage Area",
      description: "We deliver to all major cities and locations across India",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Package,
      title: "Order Tracking",
      description: "Real-time tracking available for all shipments",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  const shippingSteps = [
    {
      title: "Order Confirmation",
      description:
        "You'll receive an email confirmation once your order is placed",
    },
    {
      title: "Processing",
      description: "Orders are processed within 24 hours of placement",
    },
    {
      title: "Dispatch",
      description:
        "Products are carefully packed and handed over to our shipping partners",
    },
    {
      title: "In Transit",
      description: "Track your order with the provided tracking number",
    },
    {
      title: "Delivery",
      description: "Your order will be delivered to your specified address",
    },
  ];

  const deliveryNotes = [
    "Delivery times may vary based on your location",
    "Someone must be available to receive the delivery",
    "Additional documentation may be required for high-value items",
    "We'll notify you of any delivery delays",
    "Special handling for fragile items",
    "Contact us for specific delivery requirements",
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
            Shipping & Delivery Policy
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            We want to ensure your order reaches you safely and on time. Please
            review our shipping policy for all the details about delivery.
          </p>
        </motion.div>

        {/* Shipping Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {shippingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} 
                flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Shipping Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-2xl p-8 border border-gray-800 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8">
            Shipping Process
          </h2>
          <div className="space-y-6">
            {shippingSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                  flex-shrink-0 flex items-center justify-center text-white font-bold`}
                >
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < shippingSteps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-600 flex-shrink-0 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Delivery Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">
              Important Delivery Notes
            </h2>
            <div className="space-y-4">
              {deliveryNotes.map((note, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">
              Delayed Deliveries
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">
                  If your delivery is delayed for any reason, we will:
                </p>
              </div>
              <ul className="space-y-3 pl-8">
                <li className="text-gray-300 list-disc">
                  Notify you immediately via email or phone
                </li>
                <li className="text-gray-300 list-disc">
                  Provide a revised delivery estimate
                </li>
                <li className="text-gray-300 list-disc">
                  Offer alternative delivery options if available
                </li>
                <li className="text-gray-300 list-disc">
                  Compensate for significant delays
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-gray-800"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Questions About Shipping?
            </h2>
            <p className="text-gray-400 mb-8">
              Our customer service team is ready to assist you with any
              shipping-related queries.
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
