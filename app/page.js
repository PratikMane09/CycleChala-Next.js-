"use client";
import BannerSlider from "./component/BannerSlider";
import HeroSlider from "./component/HeroSlider";
import AgeCards from "./component/AgeCards";
import ServicesList from "./component/ServicesList";
import ProductCarousel from "./component/ProductCarousel";
import BrandShowcase from "./component/BrandShowcase";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { WishlistProvider } from "./context/WishlistContext";

export default function Home() {
  return (
    <WishlistProvider>
      <HeroSlider />
      <AgeCards />
      <ServicesList />
      <ProductCarousel />
      <BrandShowcase />
    </WishlistProvider>
  );
}
