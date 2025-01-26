import React from "react";
import StoreLocator from "./component/StoreLocator";
import Header from "../component/Header";
import Footer from "../component/Footer";

export const metadata = {
  title: "Prakash Cycle Mart - Store Locations",
  description:
    "Find our Prakash Cycle Mart stores. Discover our convenient locations, contact details, and visit us for expert cycling services and premium bike collections.",
  keywords: [
    "Prakash Cycle Mart locations",
    "cycle store near me",
    "bicycle shop locations",
    "bike store addresses",
    "cycling services locations",
  ],
  openGraph: {
    title: "Prakash Cycle Mart - Our Store Locations",
    description:
      "Explore our cycling store locations and find the nearest Prakash Cycle Mart to you.",
    images: [
      {
        url: "/images/store-locations-banner.jpg", // Replace with an actual store location image
        width: 1200,
        height: 630,
        alt: "Prakash Cycle Mart Store Locations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Prakash Cycle Mart Stores",
    description: "Locate our stores and explore our cycling solutions.",
    images: ["/images/store-locations-banner.jpg"], // Replace with an actual store location image
  },
};

export default function StorePage() {
  return (
    <>
      <StoreLocator />
    </>
  );
}
