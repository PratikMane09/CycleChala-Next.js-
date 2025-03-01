import React from "react";
import Image from "next/image";
import { Wrench, Bike, Home, CheckCircle, Shield, Star } from "lucide-react";
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
      "complete cleaning of  bicycle (wash and cleanser)",
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
// Enhanced Bicycle Parts Section Component
const BicyclePartsSection = () => (
  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
    <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center font-serif">
      Bicycle Parts We Service
    </h2>
    <div className="relative aspect-[16/9] w-full mb-8">
      <Image
        src="/Images/bicycle-parts-diagram.jpg"
        alt="Detailed Bicycle Parts Diagram"
        fill
        className="object-cover rounded-lg"
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority
      />
    </div>
    <div className="max-w-2xl mx-auto">
      <p className="text-gray-600 text-center text-lg leading-relaxed">
        Our expert technicians are trained to service and repair all components
        of your bicycle, ensuring optimal performance and longevity of your
        ride.
      </p>
    </div>
  </div>
);

const Feature = ({ IconComponent, title, description }) => {
  if (!IconComponent) return null;

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
        <IconComponent className="w-10 h-10 text-blue-600" />
      </div>
      <h4 className="text-xl font-semibold text-blue-800 mb-4 text-center">
        {title}
      </h4>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
};

const ServiceCard = ({ service }) => {
  if (!service || !service.icon) return null;

  const IconComponent = service.icon;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <IconComponent size={32} className="text-white" />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white text-center">
            {service.title}
          </h2>
          <p className="text-blue-100 text-center">{service.subtitle}</p>
          <div className="pt-4">
            <p className="text-4xl font-bold text-white text-center">
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

      <div className="p-6 flex-grow bg-gradient-to-b from-white to-blue-50">
        <ul className="space-y-4">
          {service.items.map((item, index) => (
            <li
              key={index}
              className="flex items-start space-x-3 group hover:bg-blue-100/50 p-3 rounded-lg transition-all duration-200"
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

const ServicePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 font-serif mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-8 tracking-tight leading-tight">
            Professional Bicycle Services
          </h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto leading-relaxed">
            Comprehensive maintenance and repair services for all types of
            bicycles, from kids cycles to premium gear bikes
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>

        {/* Bicycle Parts Section */}
        <div className="mb-20">
          <BicyclePartsSection />
        </div>

        {/* Features Section */}
        <div>
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
