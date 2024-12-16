import BannerSlider from "./component/BannerSlider";
import HeroSlider from "./component/HeroSlider";
import Header from "./component/Header";
import AgeCards from "./component/AgeCards";
import ServicesList from "./component/ServicesList";
import ProductCarousel from "./component/ProductCarousel";
import BrandShowcase from "./component/BrandShowcase";
import Footer from "./component/Footer";

export const metadata = {
  title: "CycleChala - Your Ultimate Cycling Destination",
  description:
    "CycleChala offers premium cycling services, products, and experiences for cyclists of all ages and skill levels.",
  keywords: [
    "cycling",
    "bicycle",
    "bike services",
    "cycling products",
    "cycling community",
  ],
  openGraph: {
    title: "CycleChala - Cycling Services and Products",
    description:
      "Discover top-quality cycling solutions and experiences with CycleChala.",
    type: "website",
    url: "https://www.cyclechala.com", // Replace with your actual website URL
    images: [
      {
        url: "/images/og-image.jpg", // Replace with your Open Graph image path
        width: 1200,
        height: 630,
        alt: "CycleChala - Cycling Services and Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CycleChala - Cycling Services and Products",
    description:
      "Discover top-quality cycling solutions and experiences with CycleChala.",
    images: ["/images/twitter-image.jpg"], // Replace with your Twitter card image path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.cyclechala.com", // Replace with your canonical URL
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <HeroSlider />
      <AgeCards />
      <ServicesList />
      <ProductCarousel />
      <BrandShowcase />
      <Footer />
    </>
  );
}
