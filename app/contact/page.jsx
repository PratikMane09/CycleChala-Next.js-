import React from "react";
import ContactPage from "./component/ContactPage";

export const metadata = {
  title: "Prakash Cycle Mart - Contact Us",
  description:
    "Get in touch with Prakash Cycle Mart. Reach out for bike sales, services, inquiries, and support. We're here to help you with all your cycling needs.",
  keywords: [
    "Prakash Cycle Mart contact",
    "bicycle shop contact",
    "cycle store support",
    "bike service inquiry",
    "cycling shop helpline",
  ],
  openGraph: {
    title: "Contact Prakash Cycle Mart",
    description:
      "Connect with our expert cycling team for personalized assistance.",
    images: [
      {
        url: "/images/contact-banner.jpg", // Replace with an actual contact page or shop image
        width: 1200,
        height: 630,
        alt: "Prakash Cycle Mart - Contact Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Prakash Cycle Mart",
    description: "Quick and easy ways to reach our cycling experts.",
    images: ["/images/contact-banner.jpg"], // Replace with an actual contact page or shop image
  },
};

export default function Page() {
  return (
    <>
      <ContactPage />
    </>
  );
}
