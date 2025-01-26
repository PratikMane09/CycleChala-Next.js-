import { Metadata } from "next";
import AboutSection from "./component/AboutSection";
export const metadata = {
  title: "About Prakash Cycle Mart - Your Cycling Journey Starts Here",
  description:
    "Discover Prakash Cycle Mart, a 25+ year cycling community dedicated to providing expert services, premium bikes, and top-quality cycling gear. Learn about our passion for cycling and commitment to customer satisfaction.",
  keywords: [
    "Prakash Cycle Mart",
    "bicycle shop",
    "cycling community",
    "bike services",
    "cycling expertise",
    "bike maintenance",
    "premium cycling brands",
  ],
  openGraph: {
    title: "Prakash Cycle Mart - Your Cycling Destination",
    description:
      "25+ years of cycling expertise, 1000+ happy customers, and 50+ premium brands.",
    images: [
      {
        url: "/images/cycleimg/aboutcyclepic.png",
        width: 1200,
        height: 630,
        alt: "Prakash Cycle Mart - About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Prakash Cycle Mart",
    description:
      "Your trusted cycling partner since 1995 - Expert services, premium brands, community-focused.",
    images: ["/images/cycleimg/aboutcyclepic.png"],
  },
};

export default function AboutPage() {
  return <AboutSection isAboutPage={true} />;
}
