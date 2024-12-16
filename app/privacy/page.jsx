"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, UserCheck, Server, Bell } from "lucide-react";

const PrivacyPolicy = () => {
  const policies = [
    {
      icon: Shield,
      title: "Information Collection",
      content:
        "We only collect information directly from you, such as through email or direct contact. We do not gather data from any other source.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lock,
      title: "Use and Sharing",
      content:
        "We use your information solely to respond to your inquiries or requests. We do not share your information with third parties, except when necessary to fulfill your requests (e.g., shipping orders).",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Mail,
      title: "Communication",
      content:
        "We may contact you via email for promotions, new products/services, or changes to our privacy policy. You can opt-out at any time.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content:
        "You have the right to access, update, delete your data, and express concerns about our data usage.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Server,
      title: "Data Security",
      content:
        "We protect your information both online and offline, including encryption of sensitive data and limiting access to authorized personnel only.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: Bell,
      title: "Updates to Policy",
      content:
        "We may update this policy periodically. We will notify you of any significant changes via email.",
      gradient: "from-pink-500 to-rose-500",
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
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            At Prakash Cycle Mart, we value your privacy and are committed to
            protecting your personal information. This policy explains how we
            collect, use, and safeguard your data.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gray-900 text-gray-400 text-sm">
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
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${policy.gradient} 
                flex items-center justify-center mb-4`}
              >
                <policy.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {policy.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{policy.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Your Rights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-2xl p-8 border border-gray-800 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Your Rights & Controls
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {userRights.map((right, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="text-gray-300">{right}</span>
              </div>
            ))}
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
              Questions About Our Privacy Policy?
            </h2>
            <p className="text-gray-400 mb-6">
              If you have any questions about our privacy practices, please do
              not hesitate to contact us.
            </p>
            <a
              href="mailto:pravinmane111@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r 
                from-blue-500 to-purple-500 rounded-lg text-white font-semibold
                hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
