import Header from "../homePage/components/Header";
import Footer from "../homePage/components/Footer";
import HeroSection from "./components/HeroSection";
import Advantage from "./components/Advantage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدماتنا",
};

function ServicePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <Advantage />
      <Footer />
    </>
  );
}

export default ServicePage;
