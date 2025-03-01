"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, UserCheck, Server, Bell } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const PrivacyPolicy = () => {
  const policies = [
    {
      icon: Shield,
      title: "Information Collection",
      content:
        "We only collect information directly from you, such as through email or direct contact. We do not gather data from any other source.",
      gradient: "from-blue-600 to-sky-400",
    },
    {
      icon: Lock,
      title: "Use and Sharing",
      content:
        "We use your information solely to respond to your inquiries or requests. We do not share your information with third parties, except when necessary to fulfill your requests (e.g., shipping orders).",
      gradient: "from-blue-600 to-sky-400",
    },
    {
      icon: Mail,
      title: "Communication",
      content:
        "We may contact you via email for promotions, new products/services, or changes to our privacy policy. You can opt-out at any time.",
      gradient: "from-blue-600 to-sky-400",
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content:
        "You have the right to access, update, delete your data, and express concerns about our data usage.",
      gradient: "from-blue-600 to-sky-400",
    },
    {
      icon: Server,
      title: "Data Security",
      content:
        "We protect your information both online and offline, including encryption of sensitive data and limiting access to authorized personnel only.",
      gradient: "from-blue-600 to-sky-400",
    },
    {
      icon: Bell,
      title: "Updates to Policy",
      content:
        "We may update this policy periodically. We will notify you of any significant changes via email.",
      gradient: "from-blue-600 to-sky-400",
    },
  ];

  const userRights = [
    "Access and view your personal data",
    "Update or correct any information",
    "Request deletion of your data",
    "Opt-out of marketing communications",
    "Express concerns about data usage",
    "Request data portability",
  ];

  return (
    <>
      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header with Background Element */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-100 rounded-full filter blur-3xl opacity-60 -z-10"></div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16 relative z-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif">
                Privacy Policy
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-sky-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg font-normal">
                At Prakash Cycle Mart, we value your privacy and are committed
                to protecting your personal information. This policy explains
                how we collect, use, and safeguard your data.
              </p>
            </motion.div>
          </div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-sky-50 text-blue-600 text-sm font-medium border border-sky-100">
              Last Updated: November 17, 2024
            </span>
          </motion.div>

          {/* Policy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${policy.gradient} 
                flex items-center justify-center mb-4`}
                >
                  <policy.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {policy.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {policy.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Your Rights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sky-50 rounded-2xl p-8 mb-16 relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-100 rounded-full opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full opacity-60"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Rights & Controls
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {userRights.map((right, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700">{right}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-blue-100 rounded-full opacity-30 blur-2xl transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-sky-100 rounded-full opacity-30 blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>

            <div className="text-center relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Questions About Our Privacy Policy?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you have any questions about our privacy practices, please do
                not hesitate to contact us.
              </p>
              <a
                href="mailto:pravinmane111@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r 
                from-blue-600 to-sky-400 rounded-lg text-white font-semibold
                hover:shadow-lg transition-shadow"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
