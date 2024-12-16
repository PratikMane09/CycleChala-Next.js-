"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  ChevronRight,
} from "lucide-react";

const ContactPage = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  const socialLinks = [
    {
      name: "Facebook",
      url: "#",
      icon: Facebook,
      color: "from-blue-600 to-blue-700",
      ariaLabel: "Visit our Facebook page",
    },
    {
      name: "Instagram",
      url: "#",
      icon: Instagram,
      color: "from-pink-600 to-pink-700",
      ariaLabel: "Follow us on Instagram",
    },
    {
      name: "LinkedIn",
      url: "#",
      icon: Linkedin,
      color: "from-sky-600 to-sky-700",
      ariaLabel: "Connect with us on LinkedIn",
    },
    {
      name: "Twitter",
      url: "#",
      icon: Twitter,
      color: "from-cyan-600 to-cyan-700",
      ariaLabel: "Follow us on Twitter",
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      content: "Garkheda parisar Aurangabad",
      gradient: "from-blue-500 to-sky-600",
      ariaLabel: "Company location",
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+91 7038698440",
      gradient: "from-green-500 to-emerald-600",
      ariaLabel: "Contact phone number",
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "pravinmane111@gmail.com",
      gradient: "from-sky-500 to-blue-600",
      ariaLabel: "Contact email address",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Sun, 7:00 AM - 9:00 PM",
      gradient: "from-indigo-500 to-purple-600",
      ariaLabel: "Business working hours",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Have questions? We would love to hear from you. Send us a message
            and we will respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
              aria-label={info.ariaLabel}
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${info.gradient} 
                flex items-center justify-center mb-4`}
              >
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold mb-2">{info.title}</h3>
              <p className="text-gray-700">{info.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                    text-gray-900 placeholder-gray-500"
                  placeholder="John Doe"
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                    text-gray-900 placeholder-gray-500"
                  placeholder="john@example.com"
                  aria-required="true"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                    text-gray-900 placeholder-gray-500 resize-none"
                  placeholder="Your message..."
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white 
                  py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity
                  flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>

          {/* Social Links & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Follow Us
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.ariaLabel}
                    className="group relative focus:outline-none"
                  >
                    <div
                      className={`
                      p-4 rounded-xl bg-gradient-to-r ${social.color}
                      flex items-center space-x-3
                      hover:opacity-90 transition-opacity
                      focus:ring-2 focus:ring-white focus:ring-offset-2
                    `}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">
                        {social.name}
                      </span>
                      <ChevronRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Store Location
              </h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.238627665032!2d75.33083287497447!3d19.876561881483828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb98d86a28080d%3A0x5c0c90e11f35aeca!2sGarkheda%2C%20Aurangabad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700298416941!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location Map"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
