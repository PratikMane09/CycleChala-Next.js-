"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  Mail,
  Clock,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ChevronUp,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { path: "/about", display: "About Us" },
    { path: "/shop", display: "Shop" },
    { path: "/services", display: "Bicycle Services" },
    { path: "/refund", display: "Refund Policy" },
    { path: "/shipping", display: "Shipping" },
    { path: "/termscondition", display: "Terms & Conditions" },
    { path: "/privacy", display: "Privacy Policy" },
    { path: "/contact", display: "Contact Us" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/prakashcyclemart",
      icon: Facebook,
      gradient: "from-[#1877F2] to-[#0866E0]",
      hoverGradient: "from-[#0866E0] to-[#0557CC]",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/prakashcyclemart",
      icon: Instagram,
      gradient: "from-[#E4405F] via-[#FD1D1D] to-[#FE5C34]",
      hoverGradient: "from-[#FD1D1D] via-[#E4405F] to-[#FD1D1D]",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/prakashcyclemart",
      icon: Twitter,
      gradient: "from-[#1DA1F2] to-[#0C85D0]",
      hoverGradient: "from-[#0C85D0] to-[#0A77BB]",
    },
    {
      name: "Youtube",
      url: "https://youtube.com/prakashcyclemart",
      icon: Youtube,
      gradient: "from-[#FF0000] to-[#DC0000]",
      hoverGradient: "from-[#DC0000] to-[#B50000]",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/prakashcyclemart",
      icon: Linkedin,
      gradient: "from-[#0A66C2] to-[#0952A5]",
      hoverGradient: "from-[#0952A5] to-[#074182]",
    },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Implement newsletter subscription logic
      console.log("Subscribing email:", email);
      // Show success state
      setSubscribed(true);
      // Reset email after submission
      setEmail("");
      // Reset subscribed state after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-white to-blue-50 pt-20 pb-8 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full filter blur-[150px] transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full filter blur-[150px] transform translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 text-3xl hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
              >
                Cycle Chala
              </Link>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg font-light">
              Your ultimate destination for cycling enthusiasts. We offer
              premium bikes, expert advice, and a passionate community for
              riders of all levels.
            </p>
            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={`Visit our ${social.name} page`}
                >
                  <div
                    className={`
                      w-12 h-12 rounded-full 
                      bg-gradient-to-r ${social.gradient}
                      group-hover:${social.hoverGradient}
                      transition-all duration-300 
                      flex items-center justify-center
                      shadow-lg hover:shadow-xl
                      hover:-translate-y-1
                      relative z-10
                    `}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </div>
                  {/* Glow Effect */}
                  <div
                    className={`
                      absolute inset-0 
                      bg-gradient-to-r ${social.gradient}
                      rounded-full blur-lg opacity-50
                      group-hover:opacity-75
                      transition-opacity duration-300
                    `}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 relative">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 h-1 w-10 absolute -bottom-2 left-0 rounded-full"></span>
              Quick Navigation
            </h3>
            <ul className="space-y-3 grid grid-cols-1">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="group text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mr-2 
                      group-hover:scale-125 transition-transform duration-300"
                    ></span>
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 relative">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 h-1 w-10 absolute -bottom-2 left-0 rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="group flex items-start space-x-3 text-gray-600 hover:text-gray-900 transition-colors">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span>Garkheda Parisar, Chh. Sambhajinagar </span>
              </li>
              <li className="group flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <a href="tel:+917038698440">+91 7038698440</a>
              </li>
              <li className="group flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <a href="mailto:pravinmane111@gmail.com" className="truncate">
                  pravinmane111@gmail.com
                </a>
              </li>
              <li className="group flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span>Open: 6am - 9pm</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 relative">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 h-1 w-10 absolute -bottom-2 left-0 rounded-full"></span>
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for cycling tips, exclusive offers,
              and community updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative group">
              {!subscribed ? (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300
                      border border-transparent hover:border-blue-200"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 
                    w-9 h-9 flex items-center justify-center 
                    bg-gradient-to-r from-blue-500 to-blue-600 rounded-full 
                    hover:from-blue-600 hover:to-blue-500 
                    transition-all duration-300 
                    group-hover:scale-110 shadow-md"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </>
              ) : (
                <div className="w-full px-4 py-3 bg-green-50 text-green-600 rounded-lg border border-green-200 flex items-center justify-center">
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Successfully subscribed!
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Featured Categories Section */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Road Bikes</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Racing Bikes
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Endurance Bikes
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Gravel Bikes
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Mountain Bikes</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Trail Bikes
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Downhill Bikes
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Cross Country
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Urban Cycling</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    City Bikes
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Hybrid Bikes
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Electric Bikes
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Kids Bikes</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Balance Bikes
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Training Wheels
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Youth Bikes
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Accessories</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Helmets
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Lights
                  </a>
                </li>
                <li>
                  <a
                    href="/service"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Locks
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/service"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Bike Fitting
                  </a>
                </li>
                <li>
                  <a
                    href="/service"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Repairs
                  </a>
                </li>
                <li>
                  <a
                    href="/service"
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Maintenance
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 gap-4">
            <div className="flex items-center space-x-4">
              <p>© {year} Prakash Cycle Mart. All Rights Reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/privacy" className="text-gray-600 hover:text-blue-600">
                Privacy Policy
              </a>
              <span className="text-gray-300">|</span>
              <a href="/terms" className="text-gray-600 hover:text-blue-600">
                Terms & Conditions
              </a>
              <span className="text-gray-300">|</span>
              <a href="/sitemap" className="text-gray-600 hover:text-blue-600">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to Top"
        className="fixed bottom-8 right-8 
          w-12 h-12 
          bg-gradient-to-r from-blue-500 to-blue-600 
          hover:from-blue-600 hover:to-blue-500 
          rounded-full 
          flex items-center justify-center 
          shadow-lg hover:shadow-xl 
          hover:-translate-y-1 
          transition-all duration-300
          z-50"
      >
        <ChevronUp className="w-6 h-6 text-white" />
      </button>
    </footer>
  );
};

export default Footer;
