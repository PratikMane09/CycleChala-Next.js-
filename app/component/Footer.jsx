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
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const quickLinks = [
    { path: "/about", display: "About Us" },
    { path: "/refund", display: "Refund Policy" },
    { path: "/shipping", display: "Shipping" },
    { path: "/termscondition", display: "Terms" },
    { path: "/privacy", display: "Privacy" },
    { path: "/contact", display: "Contact" },
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
      // Reset email after submission
      setEmail("");
      // Optional: Show success message or toast
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white pt-16 pb-6 overflow-hidden">
      {/* Background Gradients */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full filter blur-[120px] transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full filter blur-[120px] transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-block text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Prakash Cycle Mart
            </Link>
            <p className="text-gray-600 leading-relaxed">
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
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="group text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 
                      group-hover:scale-125 transition-transform duration-300"
                    ></span>
                    {link.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="group flex items-start space-x-3 text-gray-600 hover:text-gray-900 transition-colors">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span>Garkheda Parisar, Aurangabad</span>
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
                <a href="mailto:pravinmane111@gmail.com">
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
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for cycling tips, exclusive offers,
              and community updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 
                w-9 h-9 flex items-center justify-center 
                bg-gradient-to-r from-blue-400 to-blue-600 rounded-full 
                hover:from-blue-500 hover:to-blue-400 
                transition-all duration-300 
                group-hover:scale-110"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
            <p>© {year} Prakash Cycle Mart. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0">
              Crafted with passion for cycling enthusiasts
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to Top"
        className="fixed bottom-8 right-4 
          w-12 h-12 
          bg-gradient-to-r from-blue-400 to-blue-600 
          hover:from-blue-500 hover:to-blue-400 
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
