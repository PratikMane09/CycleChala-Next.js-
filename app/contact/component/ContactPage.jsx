"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Clock,
  Bike,
  ChevronRight,
  Wrench,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const contactInfo = [
    {
      icon: Bike,
      title: "Test Ride Hours",
      content: "Mon - Sat: 9 AM - 6 PM",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: Wrench,
      title: "Service Center",
      content: "Available 7 Days a Week",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: Phone,
      title: "Emergency Service",
      content: "+1 (555) 123-4567",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      content: "support@cycleshop.com",
      gradient: "from-blue-500 to-sky-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Whether you need a bike fitting, service appointment, or just want
            to talk about bikes, we are here to help you get rolling.
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
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-r ${info.gradient} 
                flex items-center justify-center mb-4 transform hover:scale-105 transition-transform`}
              >
                <info.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {info.title}
              </h3>
              <p className="text-gray-600">{info.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-700 font-medium mb-2 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium mb-2 block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  Subject
                </label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select a subject</option>
                  <option value="service">Bike Service</option>
                  <option value="purchase">New Purchase</option>
                  <option value="test-ride">Test Ride</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700 font-medium mb-2 block">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us what you need..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>

          {/* Map and Hours */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Store Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Store Hours
              </h2>
              <div className="space-y-4">
                {[
                  { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM" },
                  { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
                  { day: "Sunday", hours: "11:00 AM - 5:00 PM" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-200"
                  >
                    <span className="text-gray-600 font-medium">
                      {schedule.day}
                    </span>
                    <span className="text-gray-800 font-bold">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Visit Our Store
              </h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.238627665032!2d75.33083287497447!3d19.876561881483828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb98d86a28080d%3A0x5c0c90e11f35aeca!2sGarkheda%2C%20Aurangabad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700298416941!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cycle Shop Location"
                />
              </div>
              <div className="mt-4 flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-gray-600">
                  123 Bike Street, Garkheda, Aurangabad, Maharashtra, India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
