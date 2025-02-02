"use client";

import React from "react";
import {
  Wrench,
  Bike,
  Home,
  CheckCircle,
  Tool,
  Shield,
  Star,
  ServerIcon,
} from "lucide-react";

// Separate Feature component
const Feature = ({ IconComponent, title, description }) => {
  if (!IconComponent) return null;

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
        <IconComponent className="w-8 h-8 text-blue-600" />
      </div>
      <h4 className="text-xl font-semibold text-blue-800 mb-4 text-center">
        {title}
      </h4>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
};

// Separate ServiceCard component
const ServiceCard = ({ service }) => {
  if (!service || !service.icon) return null;

  const IconComponent = service.icon;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 h-64 flex flex-col">
        <div className="flex justify-center mb-4">
          <IconComponent size={48} className="text-white" />
        </div>
        <div className="flex flex-col flex-grow justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 text-center">
              {service.title}
            </h2>
            <p className="text-blue-100 text-center mb-2">{service.subtitle}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white text-center">
              {service.price}
            </p>
            {service.sizes && (
              <p className="text-blue-100 text-center text-sm mt-2">
                {service.sizes}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Rest of the card content remains the same */}
      <div className="p-6">
        <ul className="space-y-4">
          {service.items.map((item, index) => (
            <li
              key={index}
              className="flex items-start space-x-3 group hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
            >
              <CheckCircle className="flex-shrink-0 w-5 h-5 text-blue-500 mt-1" />
              <span className="text-gray-700 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const services = [
  {
    title: "Non-Gear Bicycle Service",
    icon: Wrench,
    price: "₹399",
    subtitle: "For Regular & Kids Cycles",
    sizes: 'Available for sizes 14", 16", 20", 24", 26"',
    items: [
      "Regular cycles kids cycle, size- 14, 16,20 ,24,26Ranger cycle. Regular without gear",
      "Check and adjust fork, Wheels, hubs bottom Bracket, Head set and stem",
      "Degrease all Components, Inspects for wear and tear, Ring spok tight & adjusted proper, Ring out (extra spoke charges)",

      "Bearing checks (chargeable it needs To be replaced)",
      "All threads checked and cleaned",
      "Broke shoe are checked and cleaned (chargeable if needs to be replaced)",
      "Greasing of all the components checking and inflating the tires to accurate pressure",
      "complete cleaning of  bicycle (wash and cleanser)",
      "Any parts changed extra charges ",
    ],
  },
  {
    title: "Gear Bicycle Service",
    icon: Bike,
    price: "₹499",
    subtitle: "For Mountain & Premium Bikes",
    items: [
      "check and adjust fork, Wheels, Hubs bottom Bracket, Head set and stem",
      "Degrease all Components, Inspects for wear and tear, Ring spok tight & adjusted proper, Ring out (extra spoke charges)",
      "Bearing check (chargeable it needs to be replaced)",
      "All threads checked and cleaned",
      "Gear and Disc brake are tuned and adjusted (chargeable if needs to be replaced)",
      "Brake Pads are checked and cleaned",
      "Greasing of all the components",
      "Checking and inflating the tires to accurate Pressure",
      "Complete cleaning of bicycle (Wash and Cleanser)",
      " Any parts changed extra charges ",
    ],
  },
  {
    title: "Home Service",
    icon: Home,
    price: "₹499",
    subtitle: "Expert Service at Your Doorstep",
    items: [
      "All regular/gear service features included",
      "Convenient doorstep service",
      "Professional tools and equipment",
      "Expert technician visit",
      "Complete service report",
      "Post-service testing",
      "Safety inspection",
      "Service warranty",

      "No transportation hassle",
    ],
  },
];

const features = [
  {
    IconComponent: Wrench,
    title: "Professional Tools",
    description: "State-of-the-art equipment for precise servicing",
  },
  {
    IconComponent: Shield,
    title: "Service Warranty",
    description: "Guaranteed satisfaction with our expert service",
  },
  {
    IconComponent: Star,
    title: "Expert Technicians",
    description: "Experienced professionals for quality maintenance",
  },
];

const ServicePage = () => {
  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-blue-50 to-white py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 tracking-tight">
            Professional Bicycle Services
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Comprehensive maintenance and repair services for all types of
            bicycles, from kids cycles to premium gear bikes
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-blue-900 mb-12 text-center tracking-tight">
            Why Choose Our Service?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Feature key={idx} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServicePage;
