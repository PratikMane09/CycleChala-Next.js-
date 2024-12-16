import Image from "next/image";
import BannerSlider from "./component/BannerSlider";
import HeroSlider from "./component/HeroSlider";
import Header from "./component/Header";
import AgeCards from "./component/AgeCards";
import ServicesList from "./component/ServicesList";
import ProductShowcase from "./component/ProductCarousel";
import ProductCarousel from "./component/ProductCarousel";
import BrandShowcase from "./component/BrandShowcase";
import Footer from "./component/Footer";
export default function Home() {
  return (
    <>
      <HeroSlider />
      <AgeCards />
      <ServicesList />
      <ProductCarousel />
      <BrandShowcase />
    </>
  );
}
