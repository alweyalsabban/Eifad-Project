import Header from "../homePage/components/Header";
import Footer from "../homePage/components/Footer";
import HeroSection from "./components/HeroSection";
import WhoWe from "./components/WhoWe";
import Team from "./components/Team";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "معلمات عنا",
};

function AboutUs() {
  return (
    <>
      <Header />
      <HeroSection />
      <WhoWe />
      <Team />
      <Footer />
    </>
  );
}

export default AboutUs;
